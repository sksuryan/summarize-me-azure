import os
import json
import time
from pydub import AudioSegment
from process import generate_summary, keyword_processing
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
  
  wordStamps = {}

  for result in results:
    text = processedResults['transcript']
    processedResults['transcript'] = f'{text} {result.text}'
    
    stt = json.loads(result.json)

    confidences_in_nbest = [item['Confidence'] for item in stt['NBest']]
    best_index = confidences_in_nbest.index(max(confidences_in_nbest))
    words = stt['NBest'][best_index]['Words']

    for word in words:
      value = word['Word']
      if value not in wordStamps.keys():
        wordStamps[value] = []
        seconds = word['Offset']/10000000
        wordStamps[value].append(seconds)
      else:
        wordStamps[value].append(seconds)

  keywords = []
  keywordsWithStamps = {}

  #keywords
  returnedKeywords = keyword_processing(processedResults['transcript'])
  for keyword in returnedKeywords:
    splitWords = keyword.split()
    keywords.extend(splitWords)

  for keyword in keywords:
    if keyword not in keywordsWithStamps.keys():
      if keyword in wordStamps.keys():
        keywordsWithStamps[keyword] = []
        keywordsWithStamps[keyword].extend(wordStamps[keyword])

  processedResults['keywords'] = keywordsWithStamps

  #get summary
  processedResults['summary'] = generate_summary(processedResults['transcript'])

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

  