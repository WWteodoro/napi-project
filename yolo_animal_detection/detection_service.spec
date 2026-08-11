# -*- mode: python ; coding: utf-8 -*-

from PyInstaller.utils.hooks import collect_submodules
import os

# ==========================================
# 🔧 Caminho base seguro (funciona com ou sem __file__)
# ==========================================
try:
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
except NameError:
    BASE_DIR = os.getcwd()

# ==========================================
# 📦 Inclui apenas o modelo que a main usa
# ==========================================
datas = [
    (os.path.join(BASE_DIR, 'modelos', 'YOLOv5-32.pt'), 'modelos')
]

# ==========================================
# 🔍 Inclui módulos que o PyInstaller não detecta sozinho
# ==========================================
hiddenimports = (
    collect_submodules('flask')
    + collect_submodules('ultralytics')
    + collect_submodules('torch')
    + collect_submodules('cv2')
)

# ==========================================
# 🧩 Configuração principal da análise
# ==========================================
a = Analysis(
    ['detection_service.py'],
    pathex=[BASE_DIR],
    binaries=[],
    datas=datas,
    hiddenimports=hiddenimports,
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)

pyz = PYZ(a.pure)

# ==========================================
# 🚀 Geração do executável
# ==========================================
exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='detection_service',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=True,  # mude para False se quiser esconder o terminal
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)
