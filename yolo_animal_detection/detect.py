from ultralytics import YOLO
import torch

class Detector:
    def __init__(self, model="modelos/YOLOv5-32.pt", frame_stride=1, batch_size=1):
        self.__model = YOLO(model)
        self.__frame_stride = frame_stride
        self.__batch_size = batch_size

    def __detect(self, video_path):
        b = []
        m = []
        p = []

        results = self.__model.predict(video_path, stream=True, 
                                verbose=False, 
                                batch=self.__batch_size, 
                                vid_stride=self.__frame_stride)
        
        for r in results:
            boxes, masks, probs = r.boxes, r.masks, r.probs
            b.append(boxes)
            m.append(masks)
            p.append(probs)

        del results
        torch.cuda.empty_cache()
        return b, m, p
    
    def detect(self, video_path):
        b, m, p =  self.__detect(video_path)
        confidences = [it.conf.cpu().numpy().tolist() if len(it.conf) > 0 else [] for it in b ]
        has_animal = False
        bboxes = []
        for it in b:
            if len(it.conf) > 0:
                has_animal = True
                xyxyn = it[0][0].xyxyn.cpu().numpy()
                for animal in xyxyn:
                    animal = animal.tolist()
                    bboxes.append([])
                    bboxes[-1].append({
                        "x0" : animal[0],
                        "y0" : animal[1],
                        "x1" : animal[2],
                        "y1" : animal[3]
                    })
            else:
                bboxes.append([{}])

        return has_animal, bboxes, confidences