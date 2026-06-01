from flask import Flask, render_template
import threading
import webview
import os
import base64

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

        if isinstance(file_path, (list, tuple)):
            path = file_path[0]
        else:
            path = file_path

        print("Guardando en:", path)

        with open(path, "w", encoding="utf-8") as f:
            f.write(xml_text)

        return {"status": "ok", "path": path}
    
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

        if isinstance(file_path, (list, tuple)):
            path = file_path[0]
        else:
            path = file_path

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

        if isinstance(file_path, (list, tuple)):
            path = file_path[0]
        else:
            path = file_path

        try:
            import base64

            with open(path, "wb") as f:
                f.write(base64.b64decode(base64_data))

            return {"status": "ok", "path": path}

        except Exception as e:
            return {"status": "error", "message": str(e)}

@app.route("/")
def index():
    return render_template("index.html")

def start_flask():
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=False
    )

if __name__ == "__main__":
    threading.Thread(target=start_flask, daemon=True).start()
    api = Api()
    webview.create_window(
        "3DPit Blocks",
        "http://127.0.0.1:5000/",
        min_size=(900, 600),
        resizable=True,
        js_api=api,
        text_select=True,   # permite seleccionar texto con el mouse
        easy_drag=False,    # evita conflicto entre drag de ventana y selección
    )
    webview.start(debug=False)