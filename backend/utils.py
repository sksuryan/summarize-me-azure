import hashlib

def hash_file(file):
    # BLOCKSIZE = 65536
    # file.seek(0)
    # hash_key = hashlib.md5()
    
    hash_val = hashlib.md5(file.read()).hexdigest()
    file.seek(0)

    return hash_val

def build_video_object(video):
    data = {
        'keywords': video['keywords'],
        'summary': video['summary'],
        'transcript': video['transcript'],
        'hash': video['hash']
    }
    return data