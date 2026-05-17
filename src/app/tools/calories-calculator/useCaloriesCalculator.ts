import { useState, useEffect } from 'react';

const useCaloriesCalculator = () => {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(30);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [activityLevel, setActivityLevel] = useState(1.2);
  const [goal, setGoal] = useState('maintain');
  const [results, setResults] = useState({
    bmi: 0,
    bmiCategory: '',
    bmr: 0,
    maintenanceCalories: 0,
    goalCalories: 0,
  });
  const [showResults, setShowResults] = useState(false);

  const calculateCalories = () => {
    if (!age || !height || !weight) {
      alert('Please fill in all fields');
      return;
    }

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const roundedBMI = Math.round(bmi * 10) / 10;

    let bmiCategory;
    if (bmi < 18.5) {
      bmiCategory = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
      bmiCategory = 'Normal weight';
    } else if (bmi >= 25 && bmi < 30) {
      bmiCategory = 'Overweight';
    } else {
      bmiCategory = 'Obese';
    }

    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const maintenanceCalories = Math.round(bmr * activityLevel);

    let goalCalories;
    if (goal === 'lose') {
      goalCalories = maintenanceCalories - 500;
    } else if (goal === 'gain') {
      goalCalories = maintenanceCalories + 500;
    } else {
      goalCalories = maintenanceCalories;
    }

    setResults({
      bmi: roundedBMI,
      bmiCategory,
      bmr: Math.round(bmr),
      maintenanceCalories,
      goalCalories,
    });

    setShowResults(true);
  };

  const resetCalculator = () => {
    setGender('male');
    setAge(30);
    setHeight(170);
    setWeight(70);
    setActivityLevel(1.2);
    setGoal('maintain');
    setShowResults(false);
  };

  useEffect(() => {
    if (showResults) {
      const bmiMarker = document.getElementById('bmi-marker');
      if (bmiMarker) {
        const { bmi } = results;
        let markerPosition;
        if (bmi < 18.5) {
          markerPosition = (bmi / 18.5) * 25;
        } else if (bmi < 25) {
          markerPosition = 25 + ((bmi - 18.5) / (25 - 18.5)) * 25;
        } else if (bmi < 30) {
          markerPosition = 50 + ((bmi - 25) / (30 - 25)) * 25;
        } else {
          markerPosition = 75 + Math.min(((bmi - 30) / 10) * 25, 25);
        }
        bmiMarker.style.left = `${markerPosition}%`;
      }
    }
  }, [results, showResults]);

  return {
    gender,
    setGender,
    age,
    setAge,
    height,
    setHeight,
    weight,
    setWeight,
    activityLevel,
    setActivityLevel,
    goal,
    setGoal,
    results,
    showResults,
    calculateCalories,
    resetCalculator,
  };
};

export default useCaloriesCalculator;