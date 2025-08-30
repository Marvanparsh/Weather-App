import React, { useState } from "react";
import { UilMicrophone, UilMicrophoneSlash } from "@iconscout/react-unicons";

function VoiceSearch({ setQuery }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startListening = async () => {
    // Check browser support
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice search not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    // Check microphone permissions
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (error) {
      alert('Microphone access denied. Please allow microphone access and try again.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
    };

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript.toLowerCase().trim();
      setTranscript(speechResult);
      
      // Extract city name from various speech patterns
      let cityName = speechResult;
      
      // Remove common weather-related phrases
      cityName = cityName.replace(/^(weather|temperature|forecast)\s+(in|for|of)\s+/i, '');
      cityName = cityName.replace(/\s+(weather|temperature|forecast)$/i, '');
      cityName = cityName.replace(/^(show me|get|find)\s+/i, '');
      cityName = cityName.replace(/\s+(please)$/i, '');
      
      if (cityName && cityName.length > 0) {
        setQuery({ q: cityName });
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      
      if (event.error === 'no-speech') {
        alert('No speech detected. Please try again.');
      } else if (event.error === 'network') {
        alert('Network error. Please check your connection.');
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (error) {
      console.error('Failed to start recognition:', error);
      setIsListening(false);
    }
  };

  return (
    <button
      onClick={startListening}
      disabled={isListening}
      className={`p-2 sm:p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
        isListening 
          ? 'bg-red-500 animate-pulse' 
          : 'bg-white bg-opacity-30 hover:bg-opacity-50'
      }`}
      title={isListening ? 'Listening...' : 'Voice search - Say a city name'}
    >
      {isListening ? (
        <UilMicrophoneSlash size={20} className="text-white" />
      ) : (
        <UilMicrophone size={20} className="text-white" />
      )}
    </button>
  );
}

export default VoiceSearch;