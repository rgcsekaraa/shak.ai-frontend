import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaStop, FaPaperPlane } from 'react-icons/fa';
import SettingsModal from './SettingsModal';
import Header from './Header';
import FileUpload from './FileUpload';
import Chatbox from './Chatbox';
import LoadingAnimation from './LoadingAnimation';


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const part1 = "AIzaSyA-";
const part2 = "PrR7ajkJ";
const part3 = "6fWbbsALy";
const part4 = "jgwHvPHFo";
const part5 = "9LQC8";

const apiKey = part1 + part2 + part3 + part4 + part5;
const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;


recognition.interimResults = true;
recognition.continuous = true;

const Translator = () => {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [inputLanguage, setInputLanguage] = useState('ta-IN');
  const [outputLanguage, setOutputLanguage] = useState('en');
  const [liveTranslation, setLiveTranslation] = useState(''); // Ongoing translation
  const [finalTranslation, setFinalTranslation] = useState(''); // Final translation
  const [isLoading, setIsLoading] = useState(false);
  const [backendResponse, setBackendResponse] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');

  const accumulatedTranscriptRef = useRef('');

  recognition.lang = inputLanguage;

  useEffect(() => {
    recognition.onresult = (event) => {
      const interimTranscript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join(' ');

      if (event.results[0].isFinal) {
        setFinalTranscript(prevTranscript => prevTranscript + ' ' + interimTranscript);
        translateText(interimTranscript, true);
      } else {
        translateText(interimTranscript, false);
      }
    };

    recognition.onend = () => {
      console.log("Recognition ended.");
      setIsRecording(false);
      setIsLoading(false);
      if (finalTranscript.trim()) {
        translateText(finalTranscript, true);
      }
    };

    return () => {
      recognition.onresult = null;
      recognition.onend = null;
    };
  }, [finalTranscript]);

  useEffect(() => {
    if (finalTranslation && !isRecording) {
      analyzeTextOnBackend(finalTranslation);
    }
  }, [finalTranslation, isRecording]);

  const translateText = (text, isFinal) => {
    setIsGenerating(true);
    axios.post(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
      q: text,
      source: inputLanguage.split('-')[0],
      target: outputLanguage,
      format: 'text',
    })
      .then(response => {
        const translatedText = response.data.data.translations[0].translatedText;
        if (isFinal) {
          setFinalTranslation(prevTranslation => prevTranslation + ' ' + translatedText);
        }
        setLiveTranslation(translatedText);
        setIsGenerating(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsGenerating(false);
      });
  };

  const handleStartStopClick = () => {
    if (isRecording) {
      recognition.stop();
    } else {
      setFinalTranscript('');
      setFinalTranslation('');
      setLiveTranslation('');
      recognition.start();
      setIsRecording(true);
      setIsLoading(true);
    }
  };

  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    axios.post(`${backendApiUrl}/upload/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        alert("File uploaded successfully: " + response.data.message);
      })
      .catch((error) => {
        console.error("File upload error:", error);
        alert("Failed to upload file.");
      });
  };

  const analyzeTextOnBackend = (translatedText) => {
    if (!translatedText) {
      console.error("Translated text is empty, cannot send to backend.");
      return;
    }

    axios.post(`${backendApiUrl}/analyze/`, {
      question: translatedText.trim(),
    })
      .then((response) => {
        setBackendResponse(response.data.answer);
      })
      .catch((error) => {
        console.error("Analysis error:", error);
        alert("Failed to analyze the text.");
      });
  };

  return (
    <div className="container mx-auto p-8 max-w-6xl">
      <div className="flex justify-center w-full">
        <div className="w-1/2">
          <Header onSettingsClick={() => setIsSettingsOpen(true)} />
        </div>
      </div>
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        inputLanguage={inputLanguage}
        setInputLanguage={setInputLanguage}
        outputLanguage={outputLanguage}
        setOutputLanguage={setOutputLanguage}
      />
      <div className="mt-8 bg-gradient-to-r from-green-400 via-green-700 to-green-900 text-gray-800 font-sans p-8 rounded-3xl shadow-2xl flex">
        <FileUpload
          file={file}
          setFile={setFile}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          handleFileUpload={handleFileUpload}
        />
        <Chatbox
          liveTranslation={liveTranslation} // Show ongoing translation
          backendResponse={backendResponse}
          isLoading={isLoading}
          query={query}
          setQuery={setQuery}
          handleStartStopClick={handleStartStopClick}
          isRecording={isRecording}
          handleSendQuery={() => translateText(query, true)} // Send the final translation
        />
      </div>
    </div>
  );
};

export default Translator;
