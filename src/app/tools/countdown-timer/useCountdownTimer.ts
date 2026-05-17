import { useState, useEffect, useRef } from 'react';

export const useCountdownTimer = () => {
  const [totalSeconds, setTotalSeconds] = useState(600);
  const [remainingSeconds, setRemainingSeconds] = useState(600);
  const [isRunning, setIsRunning] = useState(false);
  const countdown = useRef<any>(null);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const startTimer = () => {
    if (isRunning) return;

    if (remainingSeconds <= 0) {
      alert('Please set a valid time duration');
      return;
    }

    setIsRunning(true);
    countdown.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(countdown.current!);
          setIsRunning(false);
          // Play sound
          const audio = new Audio(
            'https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3'
          );
          audio.play();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    if (countdown.current) {
      clearInterval(countdown.current);
    }
    setIsRunning(false);
  };

  const resetTimer = () => {
    if (countdown.current) {
      clearInterval(countdown.current);
    }
    setIsRunning(false);
    setRemainingSeconds(totalSeconds);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    let numValue = parseInt(value, 10);

    if (isNaN(numValue) || numValue < 0) {
      numValue = 0;
    }
    if ((id === 'minutes' || id === 'seconds') && numValue > 59) {
      numValue = 59;
    }

    const hoursInput = document.getElementById('hours') as HTMLInputElement;
    const minutesInput = document.getElementById('minutes') as HTMLInputElement;
    const secondsInput = document.getElementById('seconds') as HTMLInputElement;

    const hours = id === 'hours' ? numValue : parseInt(hoursInput.value) || 0;
    const minutes = id === 'minutes' ? numValue : parseInt(minutesInput.value) || 0;
    const seconds = id === 'seconds' ? numValue : parseInt(secondsInput.value) || 0;

    const newTotalSeconds = hours * 3600 + minutes * 60 + seconds;
    setTotalSeconds(newTotalSeconds);
    setRemainingSeconds(newTotalSeconds);
  };

  useEffect(() => {
    return () => {
      if (countdown.current) {
        clearInterval(countdown.current);
      }
    };
  }, []);

  return {
    remainingSeconds,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    formatTime,
    handleInputChange,
  };
};