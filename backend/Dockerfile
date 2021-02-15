FROM python:3.8-slim-buster
RUN apt-get update
RUN apt-get -y install ffmpeg libavcodec-extra
COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt
RUN python -m nltk.downloader -d /usr/local/share/nltk_data all
CMD gunicorn -b 0.0.0.0:$PORT --timeout 60 app:app