import cv2
import numpy as np

def get_caps_video(video_path, frame_stride):
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    duration = total_frames / fps
    times = np.linspace(0, duration, total_frames, endpoint=False)[::frame_stride]
    cap.release()
    return fps, total_frames, duration, times, width, height

if __name__ == "__main__":
    video_path = "video.avi"
    frame_stride = 4
    fps, total_frames, duration, times, width, height = get_caps_video(video_path, frame_stride)
    print(f"FPS: {fps}")
    print(f"Total frames: {total_frames}")
    print(f"Duration: {duration}")
    print(f"Times: {times} ({len(times)})")
    print(f"Frame stride: {frame_stride}")
    print(f"Total frames: {len(times)}")
    print(f"Duration (s): {times[-1]}")
    print(f"Width: {width}")
    print(f"Height: {height}")
