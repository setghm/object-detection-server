import os
from charset_normalizer import detect
import cv2
import numpy as np
from imageai.Detection import ObjectDetection

# Defining the paths.
PATH_MODEL='./object_detect/models/yolov3.pt'
PATH_MODEL_TINY='./object_detect/models/tiny-yolov3.pt'

recognizer = ObjectDetection()
recognizer.setModelTypeAsTinyYOLOv3()

# Loading the model.
recognizer.setModelPath(PATH_MODEL_TINY)
recognizer.loadModel()

print('Done, started the object detection module')

fnum: int = 0

# Detect objects in an image.
def from_image_bytes(data: bytes):
    global fnum

    frame_encoded = np.frombuffer(data, dtype=np.uint8)
    frame = cv2.imdecode(frame_encoded, cv2.IMREAD_COLOR)

    _, detected_objects = recognizer.detectObjectsFromImage(
        frame,
        output_type='array',
        minimum_percentage_probability=20
    )

    print(detected_objects)

    return detected_objects

