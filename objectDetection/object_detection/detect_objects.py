import cv2

Conf_threshold = 0.4
NMS_threshold = 0.4
COLORS = [(0, 255, 0), (0, 0, 255), (255, 0, 0),
          (255, 255, 0), (255, 0, 255), (0, 255, 255)]

class_name = []

with open('../obj.names', 'r') as f:
    class_name = [cname.strip() for cname in f.readlines()]

net = cv2.dnn.readNet('../custom-yolov4-tiny-detector_best.weights', '../custom-yolov4-tiny-detector.cfg')

net.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
net.setPreferableTarget(cv2.dnn.DNN_TARGET_CUDA_FP16)

model = cv2.dnn_DetectionModel(net)
model.setInputParams(size=(512, 512), scale=1 / 255, swapRB=True)


def detect_objects(image_path):
    detected_image = cv2.imread(image_path)
    classes, scores, boxes = model.detect(detected_image, Conf_threshold, NMS_threshold)
    for (classid, score, box) in zip(classes, scores, boxes):
        color = COLORS[int(classid) % len(COLORS)]
        label = "%s : %f" % (class_name[classid], score)
        cv2.rectangle(detected_image, box, color, 1)
        cv2.putText(detected_image, label, (box[0], box[1] - 10),
                    cv2.FONT_HERSHEY_COMPLEX, 0.3, color, 1)
        print(label)

    return detected_image
