import os
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo, ObjectId

app = Flask(__name__)
app.secret_key = 'mysecret-summarize'

dir_path = os.path.dirname(os.path.realpath(__file__))
UPLOAD_FOLDER = str(os.path.join(dir_path, 'static/uploads'))
ALLOWED_EXTENSIONS = set(['mp4', 'mov', 'wmv', 'flv', 'avi', 'mkv'])

# app.config['MONGO_DBNAME'] = 'hacker'
# app.config['MONGO_URI'] = 'mongodb+srv://adi:w7yzWc4SYGCVmYG@cluster0.sgghn.mongodb.net/hacker?retryWrites=true&w=majority'
app.config['MONGO_DBNAME'] = 'summarize'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/summarize'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_PATH'] = 8192

mongo = PyMongo(app)


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


@app.route('/videos/<video_id>', methods=['GET'])
def get_video(video_id):
    video = mongo.db.videos.find_one({ '_id': ObjectId(video_id) })
    
    if video is None:
        return jsonify({ 'title': 'NOT_FOUND', 'message': 'Video not found' }), 404
    
    res = {
        'id': str(video['_id']),
        'title': video['title'],
        'url': video['url'],
        'keywords': video['keywords'],
        'summary': video['summary'],
        'transcript': video['transcript']
    }

    return jsonify(res), 200


@app.route('/videos/create', methods=['POST'])
def post_videos():
    if not request.is_json:
        return jsonify({ 'title': 'BAD_REQUEST', 'message': 'Invalid request format' }), 400
    
    try:
        request_data = request.get_json()
        title = request_data['title']
    except KeyError as err:
        return jsonify({ 'title': 'BAD_REQUEST', 'message': f'Missing key {err}'}), 400
    except Exception:
        return jsonify({ 'title': 'BAD_REQUEST', 'message': 'Could not parse request data.'}), 400

    # Do processing, get url, keywords, summary and transcript and then save
    return jsonify({}), 200



if __name__ == '__main__':
    app.run(debug=True)