
import React, { useState, useRef } from 'react';

interface AudioPlayerProps {
  title: string;
  src: string;
  duration?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ title, src, duration = "08:24" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] card-shadow border border-slate-50">
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-turquesa relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
          {isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center gap-1">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-1 bg-turquesa rounded-full animate-bounce" style={{ height: `${20 + i*10}%`, animationDelay: `${i*0.1}s` }}></div>
              ))}
            </div>
          )}
        </div>
        <div className="flex-1">
          <p className="label-caps !text-[8px] text-turquesa mb-1">Audio {title.includes('1') ? '1' : '2'}</p>
          <h4 className="text-lg font-bold text-[#2F2F2F]">{title}</h4>
        </div>
        <button 
          onClick={togglePlay}
          className="w-14 h-14 flex items-center justify-center rounded-full bg-turquesa text-white shadow-lg fab-glow"
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
      </div>
      
      <div className="mt-8 space-y-2">
         <div className="relative h-1 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`absolute top-0 left-0 h-full bg-turquesa transition-all duration-300 ${isPlaying ? 'w-2/3' : 'w-0'}`}
            ></div>
         </div>
         <div className="flex justify-between items-center text-[10px] font-bold text-slate-300">
           <span>0:00</span>
           <span>{duration}</span>
         </div>
      </div>

      <audio 
        ref={audioRef} 
        src={src} 
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />
    </div>
  );
};

export default AudioPlayer;
