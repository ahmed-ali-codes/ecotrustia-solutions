'use client';

import { useState, useEffect } from 'react';

export const useMilesToKilometerConverter = () => {
  const [miles, setMiles] = useState('');
  const [kilometers, setKilometers] = useState('');

  const handleMilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMiles(value);
    if (value === '') {
      setKilometers('');
    } else {
      const milesFloat = parseFloat(value);
      if (!isNaN(milesFloat)) {
        setKilometers((milesFloat * 1.60934).toFixed(2));
      }
    }
  };

  const handleKilometersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKilometers(value);
    if (value === '') {
      setMiles('');
    } else {
      const kilometersFloat = parseFloat(value);
      if (!isNaN(kilometersFloat)) {
        setMiles((kilometersFloat / 1.60934).toFixed(2));
      }
    }
  };

  const resetFields = () => {
    setMiles('');
    setKilometers('');
  };

  const switchUnits = () => {
    setMiles(kilometers);
    setKilometers(miles);
  };

  return {
    miles,
    kilometers,
    handleMilesChange,
    handleKilometersChange,
    resetFields,
    switchUnits,
  };
};