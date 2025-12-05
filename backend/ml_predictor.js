const { spawn } = require('child_process');
const path = require('path');

class MLPredictor {
  constructor() {
    this.modelPath = path.join(__dirname, 'obesity_model.pkl');
  }

  predict(fat, carbs, protein, calories) {
    return new Promise((resolve, reject) => {
      const pythonScript = path.join(__dirname, 'predict.py');
      const python = spawn('python3', [pythonScript, fat, carbs, protein, calories]);
      
      let result = '';
      let error = '';

      python.stdout.on('data', (data) => {
        result += data.toString();
      });

      python.stderr.on('data', (data) => {
        error += data.toString();
      });

      python.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(error || 'Python script failed'));
        } else {
          try {
            const prediction = parseFloat(result.trim());
            resolve(prediction);
          } catch (e) {
            reject(new Error('Failed to parse prediction'));
          }
        }
      });
    });
  }
}

module.exports = MLPredictor;
