import { useState, useEffect } from 'react';

export const useBmiCalculator = () => {
  const [heightCm, setHeightCm] = useState('170');
  const [weightKg, setWeightKg] = useState('70');
  
  const [heightFt, setHeightFt] = useState('5');
  const [heightIn, setHeightIn] = useState('6.9');
  const [weightLb, setWeightLb] = useState('154.3');
  
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [bmiMessage, setBmiMessage] = useState('');
  const [bmiColor, setBmiColor] = useState('');
  const [indicatorPosition, setIndicatorPosition] = useState(0);

  // Handlers to sync values
  const handleHeightCmChange = (val: string) => {
    setHeightCm(val);
    const cm = parseFloat(val);
    if (!isNaN(cm)) {
      const totalInches = cm / 2.54;
      const ft = Math.floor(totalInches / 12);
      const inches = totalInches % 12;
      setHeightFt(ft.toString());
      setHeightIn(inches.toFixed(1).replace(/\.0$/, ''));
    } else {
      setHeightFt('');
      setHeightIn('');
    }
  };

  const handleHeightImperialChange = (ftStr: string, inStr: string) => {
    setHeightFt(ftStr);
    setHeightIn(inStr);
    const ft = parseFloat(ftStr) || 0;
    const inches = parseFloat(inStr) || 0;
    if (ftStr !== '' || inStr !== '') {
      const cm = (ft * 12 + inches) * 2.54;
      setHeightCm(cm.toFixed(1).replace(/\.0$/, ''));
    } else {
      setHeightCm('');
    }
  };

  const handleWeightKgChange = (val: string) => {
    setWeightKg(val);
    const kg = parseFloat(val);
    if (!isNaN(kg)) {
      const lb = kg * 2.20462;
      setWeightLb(lb.toFixed(1).replace(/\.0$/, ''));
    } else {
      setWeightLb('');
    }
  };

  const handleWeightLbChange = (val: string) => {
    setWeightLb(val);
    const lb = parseFloat(val);
    if (!isNaN(lb)) {
      const kg = lb / 2.20462;
      setWeightKg(kg.toFixed(1).replace(/\.0$/, ''));
    } else {
      setWeightKg('');
    }
  };

  const calculateBmi = () => {
    // We can just use the metric values for the core calculation since they are synced
    const height = parseFloat(heightCm) / 100;
    const weight = parseFloat(weightKg);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
      setBmi(null);
      return;
    }

    const bmiValue = weight / (height * height);
    setBmi(bmiValue);
  };

  useEffect(() => {
    if (bmi === null) {
      return;
    }

    let category = '';
    let message = '';
    let color = '';

    if (bmi < 18.5) {
      category = 'Underweight';
      message =
        'Your BMI suggests you are underweight. Consider consulting with a healthcare provider about healthy ways to gain weight.';
      color = '#60a5fa'; // blue-400
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Healthy weight';
      message =
        'Your BMI suggests you have a healthy weight for your height. Maintaining a healthy weight reduces your risk of developing serious health problems.';
      color = '#4ade80'; // green-400
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
      message =
        'Your BMI suggests you are overweight. You may want to talk with a healthcare provider about healthy lifestyle changes.';
      color = '#facc15'; // yellow-400
    } else {
      category = 'Obese';
      message =
        'Your BMI suggests you are obese. Obesity increases risk for serious health conditions. Consider consulting with a healthcare provider.';
      color = '#f87171'; // red-400
    }

    setBmiCategory(category);
    setBmiMessage(message);
    setBmiColor(color);

    let position = (bmi / 40) * 100;
    if (position > 100) position = 100;
    setIndicatorPosition(position);
  }, [bmi]);

  // Live auto-calculation when values change
  useEffect(() => {
    calculateBmi();
  }, [heightCm, weightKg]);

  return {
    heightCm,
    handleHeightCmChange,
    weightKg,
    handleWeightKgChange,
    heightFt,
    heightIn,
    handleHeightImperialChange,
    weightLb,
    handleWeightLbChange,
    bmi,
    bmiCategory,
    bmiMessage,
    bmiColor,
    indicatorPosition,
    calculateBmi,
  };
};