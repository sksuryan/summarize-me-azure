import hashlib

def hash_file(file):
    BLOCKSIZE = 65536
    file.seek(0)
    # hash_key = hashlib.md5()
    
    hash_key = hashlib.md5(file.read()).hexdigest()

    return hash_key