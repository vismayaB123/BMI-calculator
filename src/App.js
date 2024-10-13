import React, { useState } from 'react';
import { Container, Title, TextInput, Button, Text, Group } from '@mantine/core';
import { Check, InfoCircle, AlertTriangle, AlertCircle, Trash } from 'tabler-icons-react'; // Import Trash icon
import './App.css';
import './animations.css'; // Import your CSS file for animations

function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState('');

  const calculateBMI = (e) => {
    e.preventDefault();

    if (weight && height) {
      const heightInMeters = height / 100; 
      const calculatedBmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(calculatedBmi);
      
      let bmiMessage = '';
      let icon;
      let alertType = '';
      let alertBgColor = '';

      if (calculatedBmi < 18.5) {
        bmiMessage = 'Underweight';
        icon = <AlertTriangle size={24} color="blue" className="icon-animation" />;
        alertType = 'alert alert-info';
        alertBgColor = 'rgba(173, 216, 230, 0.8)'; // Light blue
      } else if (calculatedBmi >= 18.5 && calculatedBmi <= 24.9) {
        bmiMessage = 'Normal weight';
        icon = <Check size={24} color="green" className="icon-animation" />;
        alertType = 'alert alert-success';
        alertBgColor = 'rgba(144, 238, 144, 0.8)'; // Light green
      } else if (calculatedBmi >= 25 && calculatedBmi <= 29.9) {
        bmiMessage = 'Overweight';
        icon = <InfoCircle size={24} color="orange" className="icon-animation" />;
        alertType = 'alert alert-warning';
        alertBgColor = 'rgba(255, 218, 185, 0.8)'; // Light orange
      } else {
        bmiMessage = 'Obesity';
        icon = <AlertCircle size={24} color="red" className="icon-animation" />;
        alertType = 'alert alert-danger';
        alertBgColor = 'rgba(255, 182, 193, 0.8)'; // Light red
      }

      setMessage({ bmiMessage, icon, alertType, alertBgColor });
    }
  };

  const clearData = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setMessage('');
  };

  return (
    <div 
      style={{ 
        backgroundImage: 'url(https://i.pinimg.com/originals/10/20/4e/10204e2cf94ed01b71805a97cdf1047b.jpg)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        height: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}
    >
      <Container className="container" size="sm" style={{ textAlign: 'center' }}>
        <Title order={1}>BMI Calculator</Title>
        <form onSubmit={calculateBMI}>
          <TextInput
            label="Weight (kg)"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
            mt="md"
          />
          <TextInput
            label="Height (cm)"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
            mt="md"
          />

          {/* Group for the buttons */}
          <Group mt="md" position="center" spacing="xs">
            <Button 
              type="submit" 
              disabled={!weight || !height}
            >
              Calculate BMI
            </Button>

            {/* Show Clear Button if either weight or height has a value */}
            {(weight || height) && (
              <Button 
                type="button" 
                onClick={clearData} 
                color="red" 
                variant="outline"
                style={{ padding: '0.4rem' }}
              >
                <Trash size={20} />
              </Button>
            )}
          </Group>
        </form>

        {bmi && (
          <div 
            className={message.alertType} 
            role="alert" 
            style={{ 
              borderRadius: '8px', 
              backgroundColor: message.alertBgColor,
              marginTop: '2rem', // Add margin to separate from form
              padding: '1rem'
            }}
          >
            <div className="d-flex" style={{ alignItems: 'center', padding: '3px' }}>
                <h4 className="alert-title">{message.bmiMessage}</h4>
                <Text size="lg" className="text-secondary">
                  Your BMI: <strong> {bmi}</strong>
                </Text>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default App;
