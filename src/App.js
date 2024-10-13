import React, { useState } from 'react';
import './App.css';

function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState('');

  const calculateBMI = (e) => {
    e.preventDefault();
    
    if (weight && height) {
      const heightInMeters = height / 100; // convert height from cm to meters
      const calculatedBmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(calculatedBmi);
      
      // Determine BMI status
      let bmiMessage = '';
      if (calculatedBmi < 18.5) {
        bmiMessage = 'Underweight';
      } else if (calculatedBmi >= 18.5 && calculatedBmi <= 24.9) {
        bmiMessage = 'Normal weight';
      } else if (calculatedBmi >= 25 && calculatedBmi <= 29.9) {
        bmiMessage = 'Overweight';
      } else {
        bmiMessage = 'Obesity';
      }
      setMessage(bmiMessage);
    }
  };

  return (
    <div className="App">
      <h1>BMI Calculator</h1>
      <form onSubmit={calculateBMI}>
        <div>
          <label>Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Height (cm):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={!weight || !height}>Calculate BMI</button>
      </form>

      {bmi && (
        <div>
          <h2>Your BMI: {bmi}</h2>
          <h3>{message}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
