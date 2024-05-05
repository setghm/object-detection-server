import json
from flask import Flask, Response, render_template, request
from object_detect import detector

# Certificate and key file paths
CERT_FILE='certs/development.test.crt'
KEY_FILE='certs/development.test.key'

app = Flask(__name__)

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/object-detect', methods=['POST'])
def object_detect():
	# Detect all the objects in the current frame.
	detected_objects = detector.from_image_bytes(request.data)
	
	# Return the result as json.
	return Response(
		json.dumps(detected_objects),
		status=200,
		mimetype='application/json'
	)

if __name__ == '__main__':
	app.run(host="0.0.0.0", debug=True, ssl_context=(CERT_FILE, KEY_FILE))
