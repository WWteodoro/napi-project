import os
import sys
import shutil
import tempfile
from flask import Flask, request, jsonify
from get_caps_video import get_caps_video
from detect import Detector

# =====================
# CONFIGURAÇÕES
# =====================
LOCAL_SERVICE = True
PORT = 5000
FORCE_CPU = False
FRAME_STRIDE = 4
BATCH_SIZE = 8

# =====================
# DETECTA SE ESTÁ EMPACOTADO
# =====================
if getattr(sys, 'frozen', False):
    BASE_PATH = sys._MEIPASS
else:
    BASE_PATH = os.path.dirname(os.path.abspath(__file__))

# Caminho do modelo dentro da pasta 'modelos'
MODEL_SRC = os.path.join(BASE_PATH, "modelos", "YOLOv5-32.pt")

# =====================
# COPIA MODELO PARA DIRETÓRIO TEMPORÁRIO SEGURO
# =====================
try:
    # Cria um diretório temporário exclusivo para o modelo
    temp_model_dir = tempfile.mkdtemp(prefix="yolo_model_")
    MODEL_PATH = os.path.join(temp_model_dir, "YOLOv5-32.pt")

    # Copia o modelo para lá
    shutil.copy2(MODEL_SRC, MODEL_PATH)
    print(f"[IA] Modelo copiado para: {MODEL_PATH}")
except Exception as e:
    print(f"[ERRO] Falha ao copiar modelo: {e}")
    MODEL_PATH = MODEL_SRC  # fallback, pode falhar no PyInstaller

# =====================
# FORÇA CPU SE PEDIDO
# =====================
if FORCE_CPU:
    os.environ["CUDA_VISIBLE_DEVICES"] = ""

# =====================
# INICIALIZA DETECTOR
# =====================
detector = Detector(
    model=MODEL_PATH,
    batch_size=BATCH_SIZE,
    frame_stride=FRAME_STRIDE
)

app = Flask(__name__)

# =====================
# ROTA DE DETECÇÃO
# =====================
@app.route('/detect', methods=['POST'])
def detect():
    data = request.get_json()
    video_uri = data.get('video_uri')

    if not os.path.exists(video_uri):
        return jsonify({
            'error': 'File not found',
            'has_animal': False,
            'bboxes': [{}],
            'confidences': [[]],
            'frame_stride': FRAME_STRIDE,
            'fps': 0,
            'total_frames': 0,
            'n_frames': 0,
            'times': [],
            'width': 0,
            'height': 0,
            'duration': 0
        })

    detections = detector.detect(video_uri)
    fps, total_frames, duration, times, width, height = get_caps_video(video_uri, FRAME_STRIDE)

    return jsonify({
        'error': "OK",
        'has_animal': detections[0],
        'bboxes': detections[1],
        'confidences': detections[2],
        'frame_stride': FRAME_STRIDE,
        'fps': int(fps),
        'total_frames': total_frames,
        'n_frames': len(times),
        'times': times.tolist(),
        'width': width,
        'height': height,
        'duration': duration
    })


# =====================
# EXECUÇÃO
# =====================
if __name__ == '__main__':
    host = '127.0.0.1' if LOCAL_SERVICE else '0.0.0.0'
    print(f"[IA] Usando modelo final: {MODEL_PATH}")
    app.run(port=PORT, host=host)
