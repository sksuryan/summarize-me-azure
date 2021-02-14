from rake_nltk import Rake
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize, sent_tokenize

def keyword_processing(transcript) -> list:
    r = Rake(min_length=2, max_length=4)
    r.extract_keywords_from_text(transcript)
    ranked_keywords= r.get_ranked_phrases()
    return ranked_keywords

def frequency_table(text_string) -> dict:
    stopWords = set(stopwords.words("english"))
    words = word_tokenize(text_string)
    ps = PorterStemmer()
    freqTable = dict()
    for word in words:
        word = ps.stem(word)
        if word in stopWords:
            continue
        if word in freqTable:
            freqTable[word] += 1
        else:
            freqTable[word] = 1
    return freqTable

def sentence_score(sentences, freqTable) -> dict:
    sentenceValue = dict()
    for sentence in sentences:
        word_count_in_sentence = (len(word_tokenize(sentence)))
        word_count_in_sentence_except_stop_words = 0
        for wordValue in freqTable:
            if wordValue in sentence.lower():
                word_count_in_sentence_except_stop_words += 1
                if sentence[:10] in sentenceValue:
                    sentenceValue[sentence[:10]] += freqTable[wordValue]
                else:
                    sentenceValue[sentence[:10]] = freqTable[wordValue]
        if sentence[:10] in sentenceValue:
            sentenceValue[sentence[:10]] = sentenceValue[sentence[:10]] / word_count_in_sentence_except_stop_words
    return sentenceValue

def avg_score(sentenceValue) -> int:   
    sumValues = 0
    for entry in sentenceValue:
        sumValues += sentenceValue[entry]
    average = (sumValues / len(sentenceValue))
    return average

def find_summary(sentences, sentenceValue, threshold) -> str:
    sentence_count = 0
    summary = ''
    for sentence in sentences:
        if sentence[:10] in sentenceValue and sentenceValue[sentence[:10]] >= (threshold):
            summary += " " + sentence
            sentence_count += 1
    return summary

def generate_summary(transcript) -> str:
    freq_table = frequency_table(transcript)
    sentences = sent_tokenize(transcript)
    sentence_scores = sentence_score(sentences, freq_table)
    threshold = avg_score(sentence_scores)
    summary = find_summary(sentences, sentence_scores, 0.8 * threshold)
    return summary
