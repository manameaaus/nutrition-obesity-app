import React, { useState } from 'react';
import MacronutrientChart from './MacronutrientChart';

function NutritionForm({ onPredict, loading }) {
  const ranges = {
    fat: { 
      min: 10, 
      max: 44,      
      typicalMin: 15, 
      typicalMax: 40  
    },
    carbs: { 
      min: 44,   
      max: 82,    
      typicalMin: 46, 
      typicalMax: 75 
    },
    protein: { 
      min: 8,     
      max: 18,     
      typicalMin: 9,   
      typicalMax: 15  
    },
    calories: {
      min: 1500,
      max: 4000
    }
  };

  const [nutrition, setNutrition] = useState({
    fat: 25,    
    carbs: 60,    
    protein: 15,   
    calories: 2500
  });

  const totalPercentage = nutrition.fat + nutrition.carbs + nutrition.protein;
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = parseFloat(e.target.value);
    
    let clampedValue = value;
    if (name === 'fat') clampedValue = Math.max(ranges.fat.min, Math.min(ranges.fat.max, value));
    if (name === 'carbs') clampedValue = Math.max(ranges.carbs.min, Math.min(ranges.carbs.max, value));
    if (name === 'protein') clampedValue = Math.max(ranges.protein.min, Math.min(ranges.protein.max, value));
    
    const otherTwoTotal = 100 - clampedValue;
    const otherSliders = ['fat', 'carbs', 'protein'].filter(n => n !== name);
    
    const oldValues = otherSliders.map(n => nutrition[n]);
    const oldTotal = oldValues.reduce((a, b) => a + b, 0);
    
    const newNutrition = { ...nutrition, [name]: clampedValue };
    
    if (oldTotal > 0) {
      otherSliders.forEach((n, i) => {
        newNutrition[n] = Math.round((oldValues[i] / oldTotal) * otherTwoTotal);
      });
    } else {
      otherSliders.forEach(n => {
        newNutrition[n] = Math.round(otherTwoTotal / 2);
      });
    }
    
    otherSliders.forEach(n => {
      if (n === 'fat') newNutrition[n] = Math.max(ranges.fat.min, Math.min(ranges.fat.max, newNutrition[n]));
      if (n === 'carbs') newNutrition[n] = Math.max(ranges.carbs.min, Math.min(ranges.carbs.max, newNutrition[n]));
      if (n === 'protein') newNutrition[n] = Math.max(ranges.protein.min, Math.min(ranges.protein.max, newNutrition[n]));
    });
    
    const finalTotal = newNutrition.fat + newNutrition.carbs + newNutrition.protein;
    if (Math.abs(finalTotal - 100) > 0.1) {
      const largest = Object.keys(newNutrition)
        .filter(k => k !== 'calories')
        .reduce((a, b) => newNutrition[a] > newNutrition[b] ? a : b);
      newNutrition[largest] += Math.round(100 - finalTotal);
    }
    
    setNutrition(newNutrition);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Math.abs(totalPercentage - 100) > 1) {
      alert(`Total must be 100%. Current: ${totalPercentage}%`);
      return;
    }
    onPredict(nutrition);
  };

  const getRangeIndicator = (value, typicalMin, typicalMax) => {
    if (value < typicalMin) return 'Below typical range';
    if (value > typicalMax) return 'Above typical range';
    return 'Within typical range';
  };

  return (
    <div className="nutrition-form">
      <h2>Enter Your Nutrition Details</h2>
      <p className="info">Ranges based on analysis of 141 countries' data</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="slider-header">
            <span>Fat: {nutrition.fat}%</span>
            <span className="range-indicator">
              {getRangeIndicator(nutrition.fat, ranges.fat.typicalMin, ranges.fat.typicalMax)}
            </span>
          </div>
          <div className="slider-labels">
            <span>{ranges.fat.min}%</span>
            <span>Typical: {ranges.fat.typicalMin}-{ranges.fat.typicalMax}%</span>
            <span>{ranges.fat.max}%</span>
          </div>
          <input
            type="range"
            name="fat"
            min={ranges.fat.min}
            max={ranges.fat.max}
            value={nutrition.fat}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <div className="slider-header">
            <span>Carbohydrates: {nutrition.carbs}%</span>
            <span className="range-indicator">
              {getRangeIndicator(nutrition.carbs, ranges.carbs.typicalMin, ranges.carbs.typicalMax)}
            </span>
          </div>
          <div className="slider-labels">
            <span>{ranges.carbs.min}%</span>
            <span>Typical: {ranges.carbs.typicalMin}-{ranges.carbs.typicalMax}%</span>
            <span>{ranges.carbs.max}%</span>
          </div>
          <input
            type="range"
            name="carbs"
            min={ranges.carbs.min}
            max={ranges.carbs.max}
            value={nutrition.carbs}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <div className="slider-header">
            <span>Protein: {nutrition.protein}%</span>
            <span className="range-indicator">
              {getRangeIndicator(nutrition.protein, ranges.protein.typicalMin, ranges.protein.typicalMax)}
            </span>
          </div>
          <div className="slider-labels">
            <span>{ranges.protein.min}%</span>
            <span>Typical: {ranges.protein.typicalMin}-{ranges.protein.typicalMax}%</span>
            <span>{ranges.protein.max}%</span>
          </div>
          <input
            type="range"
            name="protein"
            min={ranges.protein.min}
            max={ranges.protein.max}
            value={nutrition.protein}
            onChange={handleChange}
          />
        </div>

        <MacronutrientChart 
          fat={nutrition.fat}
          carbs={nutrition.carbs}
          protein={nutrition.protein}
        />

        <div className="percentage-summary">
          <div className="summary-card">
            <h4>Current Distribution</h4>
            <p>Fat: <strong>{nutrition.fat}%</strong></p>
            <p>Carbs: <strong>{nutrition.carbs}%</strong></p>
            <p>Protein: <strong>{nutrition.protein}%</strong></p>
            <div className={`total-display ${Math.abs(totalPercentage - 100) > 1 ? 'error' : 'success'}`}>
              Total: <strong>{totalPercentage}%</strong>
              {Math.abs(totalPercentage - 100) > 1 && ' (Adjust to 100%)'}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Total Daily Calories: {nutrition.calories}</label>
          <input
            type="range"
            name="calories"
            min={ranges.calories.min}
            max={ranges.calories.max}
            step="100"
            value={nutrition.calories}
            onChange={(e) => setNutrition({
              ...nutrition,
              calories: parseFloat(e.target.value)
            })}
          />
          <div className="slider-labels">
            <span>{ranges.calories.min}</span>
            <span>Average: 2500</span>
            <span>{ranges.calories.max}</span>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading || Math.abs(totalPercentage - 100) > 1}
          className={Math.abs(totalPercentage - 100) > 1 ? 'disabled' : ''}
        >
          {loading ? 'Predicting...' : 'Predict Obesity Risk'}
        </button>
      </form>
    </div>
  );
}

export default NutritionForm;