from flask import Flask, render_template, send_from_directory
import threading
import webview
import os
import base64
import socket

app = Flask(__name__)

AUTOSAVE_PATH = os.path.join(
    os.path.expanduser("~"),
    "blockly_autosave.xml"
)

# ── Clipboard helper usando win32 (Windows) con fallback a tkinter ──


def _clipboard_get():
    """Lee el portapapeles sin bloquear el hilo."""
    try:
        # Windows: PowerShell es el método más confiable y no bloquea
        import subprocess
        result = subprocess.run(
            ['powershell', '-NoProfile', '-Command', 'Get-Clipboard -Raw'],
            capture_output=True, text=True, timeout=3, encoding='utf-8'
        )
        return result.stdout.rstrip('\r\n')
    except Exception:
        pass
    try:
        # Fallback: tkinter sin mainloop
        import tkinter as tk
        root = tk.Tk()
        root.withdraw()
        root.update()
        text = root.clipboard_get()
        root.destroy()
        return text
    except Exception:
        return ""


def _clipboard_set(text):
    """Escribe al portapapeles sin bloquear el hilo."""
    try:
        import subprocess
        # Pasar el texto por stdin evita problemas de escaping con saltos de línea
        proc = subprocess.run(
            ['powershell', '-NoProfile', '-Command',
             '$input | Set-Clipboard'],
            input=text, capture_output=True,
            text=True, encoding='utf-8', timeout=3
        )
        return proc.returncode == 0
    except Exception:
        pass
    try:
        import tkinter as tk
        root = tk.Tk()
        root.withdraw()
        root.update()
        root.clipboard_clear()
        root.clipboard_append(text)
        root.update()
        # Mantener vivo 1 s para que Windows no vacíe el clipboard
        root.after(1000, root.destroy)
        root.mainloop()
        return True
    except Exception:
        return False


class Api:
    def get_clipboard(self):
        try:
            return _clipboard_get()
        except Exception:
            return ""

    def set_clipboard(self, text):
        try:
            ok = _clipboard_set(text)
            return {"status": "ok" if ok else "error"}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    def save_xml(self, xml_text):
        file_path = webview.windows[0].create_file_dialog(
            webview.SAVE_DIALOG,
            save_filename="workspace.xml",
            file_types=("Blockly XML (*.xml)",)
        )

        if not file_path:
            return {"status": "cancel"}

        path = str(file_path[0]) if isinstance(
            file_path, (list, tuple)) else str(file_path)

        print("Guardando en:", path)

        with open(path, "w", encoding="utf-8") as f:
            f.write(xml_text)

        return {"status": "ok", "path": path}

    def open_xml(self):
        """Diálogo nativo para abrir un .xml. A diferencia del <input type="file">
        del navegador, esto sí devuelve la ruta real, así que el frontend puede
        recordarla y usarla luego con save_xml_to_path (Ctrl+S estilo Word)."""
        file_path = webview.windows[0].create_file_dialog(
            webview.OPEN_DIALOG,
            file_types=("Blockly XML (*.xml)", "Todos los archivos (*.*)")
        )

        if not file_path:
            return {"status": "cancel"}

        path = str(file_path[0]) if isinstance(
            file_path, (list, tuple)) else str(file_path)

        try:
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()
            return {"status": "ok", "path": path, "content": content}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    def save_xml_to_path(self, path, xml_text):
        """Sobrescribe directamente un archivo ya guardado antes (Ctrl+S
        estilo Word/Excel), sin volver a mostrar el diálogo de guardar."""
        try:
            with open(path, "w", encoding="utf-8") as f:
                f.write(xml_text)
            return {"status": "ok", "path": path}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    def autosave_xml(self, xml_text):
        with open(AUTOSAVE_PATH, "w", encoding="utf-8") as f:
            f.write(xml_text)

    def save_py(self, code, default_name="test.py"):
        file_path = webview.windows[0].create_file_dialog(
            webview.SAVE_DIALOG,
            save_filename=default_name,
            file_types=('Python Files (*.py)',)
        )

        if not file_path:
            return {"status": "cancel"}

        path = str(file_path[0]) if isinstance(
            file_path, (list, tuple)) else str(file_path)

        print("Guardando en:", path)

        with open(path, "w", encoding="utf-8") as f:
            f.write(code)

        return {"status": "ok", "path": path}

    def load_autosave(self):
        if not os.path.exists(AUTOSAVE_PATH):
            return ""
        with open(AUTOSAVE_PATH, "r", encoding="utf-8") as f:
            return f.read()

    def clear_autosave(self):
        if os.path.exists(AUTOSAVE_PATH):
            os.remove(AUTOSAVE_PATH)
        return {"status": "ok"}

    def save_png(self, base64_data, default_name="mis_bloques.png"):
        file_path = webview.windows[0].create_file_dialog(
            webview.SAVE_DIALOG,
            save_filename=default_name,
            file_types=('PNG Files (*.png)',)
        )

        if not file_path:
            return {"status": "cancel"}

        path = str(file_path[0]) if isinstance(
            file_path, (list, tuple)) else str(file_path)

        try:
            with open(path, "wb") as f:
                f.write(base64.b64decode(base64_data))

            return {"status": "ok", "path": path}

        except Exception as e:
            return {"status": "error", "message": str(e)}


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/service-worker.js")
def service_worker():
    # Debe servirse desde la raíz (no /static) para que su scope cubra
    # toda la app — si no, el navegador lo pide en "/" y Flask no tenía
    # ninguna ruta para eso (404), así que el Service Worker nunca se
    # activaba en la app de escritorio.
    root = os.path.dirname(os.path.abspath(__file__))
    return send_from_directory(root, "service-worker.js")


def _find_free_port(preferred=5000, host="127.0.0.1"):
    """Usa 'preferred' si está libre; si no (otra app ya lo tiene),
    le pide uno libre al sistema operativo. Evita que la app deje de
    abrir solo porque el 5000 está ocupado por otra cosa."""
    for port in (preferred, 0):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind((host, port))
                return s.getsockname()[1]
            except OSError:
                continue
    raise RuntimeError("No se encontró un puerto libre para el servidor local.")


def start_flask(port):
    app.run(
        host="127.0.0.1",
        port=port,
        debug=False
    )


if __name__ == "__main__":
    port = _find_free_port(5000)
    threading.Thread(target=start_flask, args=(port,), daemon=True).start()
    api = Api()
    webview.create_window(
        "3DPit Blocks",
        f"http://127.0.0.1:{port}/",
        min_size=(950, 600),
        resizable=True,
        js_api=api,
        text_select=True,
        easy_drag=False,
    )
webview.start(debug=False, storage_path=os.path.join(
    os.path.expanduser("~"), ".3dpit_blocks"))
