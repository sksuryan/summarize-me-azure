import os
import json
import time
from pydub import AudioSegment
from werkzeug.utils import secure_filename
import azure.cognitiveservices.speech as speechsdk

def saveVideo(file, uploadFolderPath):
  filename = secure_filename(file.filename)

  path = os.path.join(uploadFolderPath, filename)
  file.save(path)

  return path

def convertToWav(videoPath,ext):
  dst = "converted.wav"

  sound = AudioSegment.from_file(videoPath,ext)
  sound.export(dst, format="wav")

def processAudio():
  API_KEY = os.getenv('API_KEY')
  REGION = os.getenv('REGION')

  speech_config = speechsdk.SpeechConfig(subscription=API_KEY,region=REGION)
  speech_config.request_word_level_timestamps()
  
  audio_input = speechsdk.AudioConfig(filename="converted.wav")
  speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_input)

  done = False
  results = []

  def stopCallBack(evt):
    nonlocal done
    done = True

  def getResults(evt):
    nonlocal results
    
    results.append(evt.result)

  # Connect callbacks to the events fired by the speech recognizer
  speech_recognizer.recognized.connect(getResults)

  speech_recognizer.session_stopped.connect(stopCallBack)
  speech_recognizer.canceled.connect(stopCallBack)
  
  speech_recognizer.start_continuous_recognition()

  while not done:
    time.sleep(.5)

  speech_recognizer.stop_continuous_recognition()
  
  return results

def processResults(results):
  processedResults = {}
  processedResults['transcript'] = ''
  processedResults['words'] = []

  for result in results:
    text = processedResults['transcript']
    processedResults['transcript'] = f'{text} {result.text}'
    
    stt = json.loads(result.json)

    confidences_in_nbest = [item['Confidence'] for item in stt['NBest']]
    best_index = confidences_in_nbest.index(max(confidences_in_nbest))
    words = stt['NBest'][best_index]['Words']

    for word in words:
      wordData = {}
      wordData['word'] = word['Word']
      wordData['offset'] = word['Offset']/10000000
      
      processedResults['words'].append(wordData)

  return processedResults


def startProcessing(file, uploadFolderPath):
  _, ext = os.path.splitext(file.filename)
  ext = ext[1:]

  #saves the file locally
  path = saveVideo(file, uploadFolderPath)

  #converting the file
  convertToWav(path,ext)

  #processing the audio
  results = processAudio()

  #extract details
  processedResults = processResults(results)

  return(processedResults)

  