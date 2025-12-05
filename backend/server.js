const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const DataProcessor = require('./dataProcessor');
const MLPredictor = require('./ml_predictor');

const app = express();
const dataProcessor = new DataProcessor();
const mlPredictor = new MLPredictor();

const modelPath = path.join(__dirname, 'obesity_model.pkl');
const useMLModel = fs.existsSync(modelPath);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 
    status: 'ok',
    message: 'Nutrition-Obesity Predictor API',
    model: useMLModel ? 'Random Forest ML Model' : 'Statistical Model',
    endpoints: {
      predict: '/api/predict (POST)',
      health: '/ (GET)'
    }
  });
});

app.post('/api/predict', async (req, res) => {
  try {
    const { fat, carbs, protein, calories } = req.body;
    
    if (!fat || !carbs || !protein || !calories) {
      return res.status(400).json({ 
        error: 'Please provide all nutrition values: fat, carbs, protein, calories'
      });
    }
    
    if (fat < 0 || fat > 100 || carbs < 0 || carbs > 100 || protein < 0 || protein > 100) {
      return res.status(400).json({
        error: 'Macronutrient percentages must be between 0 and 100'
      });
    }
    
    if (calories < 1000 || calories > 5000) {
      return res.status(400).json({
        error: 'Calories must be between 1000 and 5000'
      });
    }
    
    const total = fat + carbs + protein;
    if (Math.abs(total - 100) > 2) {
      return res.status(400).json({
        error: `Macronutrient percentages must sum to 100% (current: ${total}%)`
      });
    }
    
    let prediction = dataProcessor.generatePrediction(fat, carbs, protein, calories);
    
    if (useMLModel) {
      try {
        const mlPrediction = await mlPredictor.predict(fat, carbs, protein, calories);
        prediction.obesityPercentage = mlPrediction.toFixed(1);
        prediction.modelType = 'Random Forest ML Model';
        
        if (mlPrediction < 12) {
          prediction.category = 'Low';
        } else if (mlPrediction < 22) {
          prediction.category = 'Medium';
        } else {
          prediction.category = 'High';
        }
        
        const riskCategory = dataProcessor.getRiskCategory(mlPrediction);
        prediction.message = riskCategory.message;
        prediction.recommendations = riskCategory.recommendations;
      } catch (error) {
        console.log('ML model unavailable, using statistical model');
        prediction.modelType = 'Statistical Model';
      }
    } else {
      prediction.modelType = 'Statistical Model';
    }
    
    res.json(prediction);
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
  if (useMLModel) {
    console.log('Using Random Forest ML model for predictions');
  } else {
    console.log('ML model not found, using statistical model');
  }
});