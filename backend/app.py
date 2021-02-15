import os

from dotenv import load_dotenv
load_dotenv()

from flask_cors import CORS
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo

from utils import hash_file, build_video_object

from transcript import startProcessing

app = Flask(__name__)
CORS(app)
app.secret_key = 'mysecret-summarize'

dir_path = os.path.dirname(os.path.realpath(__file__))
UPLOAD_FOLDER = str(os.path.join(dir_path, 'static/uploads'))
ALLOWED_EXTENSIONS = set(['mp4', 'mov', 'wmv', 'flv', 'avi', 'mkv'])

app.config['MONGO_DBNAME'] = 'summarize'
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_PATH'] = 8192

mongo = PyMongo(app)


if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/videos', methods=['GET'])
def get_videos():
    videos = mongo.db.videos.find()
    res = []

    for video in videos:
        data = {
            'id': str(video['_id']),
            'title': video['title'],
            'url': video['url'],
            'keywords': video['keywords']
        }
        res.append(data)
    return jsonify(res), 200


@app.route('/videos/<video_hash>', methods=['GET'])
def get_video(video_hash):
    video = mongo.db.videos.find_one({ 'hash': video_hash })
    
    if video is None:
        return jsonify({ 'title': 'NOT_FOUND', 'message': 'Video not found' }), 404
    
    res = build_video_object(video)

    return jsonify(res), 200


@app.route('/videos/create', methods=['POST'])
def post_videos():
    try:
        video = request.files['video']

        video_hash = hash_file(video)
        video_data = mongo.db.videos.find_one({ 'hash': video_hash })
        if video_data is not None:
            res = build_video_object(video_data)
            return jsonify(res), 200

        _, ext = os.path.splitext(video.filename)
        ext = ext[1:]
        if ext in ALLOWED_EXTENSIONS:
            results = startProcessing(file=video, uploadFolderPath=app.config['UPLOAD_FOLDER'])
        else:
            results = {'message': 'File format not allowed'}
            return jsonify(results), 400
    except KeyError as err:
        return jsonify({ 'title': 'BAD_REQUEST', 'message': f'Missing key: {str(err)}'}), 400
    except Exception as e:
        return jsonify({ 'title': 'ERROR', 'message': (str(e))}), 400

    results['hash'] = video_hash
    mongo.db.videos.insert_one(build_video_object(results))

    return jsonify(results), 200



if __name__ == '__main__':
    app.run(host='0.0.0.0',port=os.getenv('PORT'))