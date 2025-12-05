import React, { useState } from 'react';
import './App.css';
import NutritionForm from './components/NutritionForm';
import ResultsDisplay from './components/ResultsDisplay';

function App() {
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePrediction = async (nutritionData) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/predict', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nutritionData)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      setPredictions(data);
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error('Prediction error:', error);
    }
    setLoading(false);
  };

  const handleReset = () => {
    setPredictions(null);
  };

  return (
    <div className="App">
      <header>
        <h1>Nutrition-Obesity Predictor</h1>
        <p>Based on analysis of 141 countries' nutrition data</p>
      </header>
      
      <div className="container">
        {!predictions ? (
          <NutritionForm 
            onPredict={handlePrediction} 
            loading={loading} 
          />
        ) : (
          <div className="results-container">
            <button onClick={handleReset} className="back-button">
              ← Back to Input
            </button>
            
            <ResultsDisplay predictions={predictions} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;