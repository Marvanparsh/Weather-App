import React, { useState } from "react";
import { UilShare, UilTwitter, UilFacebook, UilWhatsapp, UilCopy, UilCheck } from "@iconscout/react-unicons";

function ShareWeather({ weather }) {
  const [copied, setCopied] = useState(false);
  
  if (!weather) return null;

  const shareText = `🌤️ Weather in ${weather.name}: ${Math.round(weather.temp)}°, ${weather.details}. Feels like ${Math.round(weather.feels_like)}°`;
  const shareUrl = window.location.href;

  const shareOptions = [
    {
      name: 'Twitter',
      icon: UilTwitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'bg-blue-400'
    },
    {
      name: 'Facebook',
      icon: UilFacebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
      color: 'bg-blue-600'
    },
    {
      name: 'WhatsApp',
      icon: UilWhatsapp,
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      color: 'bg-green-500'
    }
  ];

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Weather Update',
          text: shareText,
          url: shareUrl
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      handleCopy();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} - ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6">
      <div className="flex items-center mb-4">
        <UilShare size={24} className="text-white mr-3" />
        <h3 className="text-white text-lg font-medium">Share Weather</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-4">
        {shareOptions.map((option) => (
          <a
            key={option.name}
            href={option.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 ${option.color} rounded-xl hover:opacity-80 transition-all duration-300 flex items-center justify-center gap-2 text-sm text-white`}
            title={`Share on ${option.name}`}
          >
            <option.icon size={16} className="text-white" />
            {option.name}
          </a>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={handleNativeShare}
          className="p-2 bg-white bg-opacity-20 rounded-xl text-white text-sm hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <UilShare size={16} />
          Share
        </button>
        
        <button
          onClick={handleCopy}
          className="p-2 bg-white bg-opacity-20 rounded-xl text-white text-sm hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center gap-2"
        >
          {copied ? <UilCheck size={16} /> : <UilCopy size={16} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}

export default ShareWeather;