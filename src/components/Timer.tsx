import React, { useState, useEffect } from 'react';
import { Timer as TimerIcon, Pause, Play, RotateCcw } from 'lucide-react';

interface TimerProps {
  defaultTime?: number;
  onComplete?: () => void;
}

export function Timer({ defaultTime = 60, onComplete }: TimerProps) {
  const [time, setTime] = useState(defaultTime);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: number;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((current) => {
          if (current <= 1) {
            clearInterval(interval);
            setIsActive(false);
            onComplete?.();
            return 0;
          }
          return current - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, time, onComplete]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTime(defaultTime);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md">
      <TimerIcon className="w-6 h-6 text-blue-600" />
      <span className="text-2xl font-mono">{formatTime(time)}</span>
      <button
        onClick={toggleTimer}
        className="p-2 rounded-full hover:bg-gray-100"
      >
        {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </button>
      <button
        onClick={resetTimer}
        className="p-2 rounded-full hover:bg-gray-100"
      >
        <RotateCcw className="w-5 h-5" />
      </button>
    </div>
  );
}