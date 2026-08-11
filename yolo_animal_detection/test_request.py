BASE_URL = "http://127.0.0.1:5000"
VIDEO_PATH = "file:///home/juliano/Pesquisa/NAPI/yolo_animal_detection/video.avi"

import requests
from urllib.parse import urlparse
from pprint import pprint


video_path = VIDEO_PATH

json_data = {
    "video_uri": urlparse(video_path).path
}

response = requests.post(f"{BASE_URL}/detect", json=json_data)

pprint(response.json())