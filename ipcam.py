import cv2
import urllib2
import numpy as np
import sys

def rotateImage(image, angle):
  image_center = tuple(np.array(image.shape[1::-1]) / 2)
  rot_mat = cv2.getRotationMatrix2D(image_center, angle, 1.0)
  result = cv2.warpAffine(image, rot_mat, image.shape[1::-1], flags=cv2.INTER_LINEAR)
  return result

host = "10.42.0.13:8080";

label = ""
# initialize the list of class labels MobileNet SSD was trained to
# detect, then generate a set of bounding box colors for each class
CLASSES = ["background", "aeroplane", "bicycle", "bird", "boat",
	"bottle", "bus", "car", "cat", "chair", "cow", "diningtable",
	"dog", "horse", "motorbike", "person", "pottedplant", "sheep",
	"sofa", "train", "tvmonitor"]

COLORS = np.random.uniform(0, 255, size=(len(CLASSES), 3))
counter = 0
(h,w) = (0,0)
output = None
# load our serialized model from disk
net = cv2.dnn.readNetFromCaffe("MobileNetSSD_deploy.prototxt.txt", "MobileNetSSD_deploy.caffemodel");

if len(sys.argv) > 1:
	host = sys.argv[1];

hoststr = "http://" + host + "/video"
print "streaming " + hoststr

stream = urllib2.urlopen(hoststr);
bytes='';
while True:
	bytes+=stream.read(1024);
	a = bytes.find("\xff\xd8");
	b = bytes.find("\xff\xd9");
	if a != -1 and b != -1:
		jpg = bytes[a:b+2];
		bytes = bytes[b+2 :];
		frame = cv2.imdecode(np.fromstring(jpg, dtype=np.uint8), cv2.IMREAD_COLOR);
		
		frame = rotateImage(frame, 270);

		# grab the frame dimensions and convert it to a blob
		(h, w) = frame.shape[:2]

		# grab the frame from the threaded video stream and resize it
		# to have a maximum width of 300 pixels 
		blob = cv2.dnn.blobFromImage(cv2.resize(frame, (300, 300)),
			0.007843, (300, 300), 127.5)

		# pass the blob through the network and obtain the detections and
		# predictions
		net.setInput(blob)
		detections = net.forward()
		# loop over the detections
		for i in np.arange(0, detections.shape[2]):
			# extract the confidence (i.e., probability) associated with
			# the prediction
			confidence = detections[0, 0, i, 2]

			# filter out weak detections by ensuring the `confidence` is
			# greater than the minimum confidence
			if confidence > .4:
				# extract the index of the class label from the
				# `detections`, then compute the (x, y)-coordinates of
				# the bounding box for the object
				idx = int(detections[0, 0, i, 1])
				box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
				(startX, startY, endX, endY) = box.astype("int")
	 
				# draw the prediction on the frame
				label = "{}: {:.2f}%".format(CLASSES[idx],
					confidence * 100)
				detectionFrame = cv2.rectangle(frame, (startX, startY), (endX, endY),
					COLORS[idx], 2)
				y = startY - 15 if startY - 15 > 15 else startY + 15
				cv2.putText(frame, label, (startX, y),
					cv2.FONT_HERSHEY_SIMPLEX, 0.5, COLORS[idx], 2)
		
		frame = cv2.resize(frame, (w,h),interpolation = cv2.INTER_CUBIC)

		cv2.imshow(hoststr,frame);
		if cv2.waitKey(1) == 27:
			exit(0);

