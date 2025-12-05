import React from 'react';

function ResultsDisplay({ predictions }) {
  const getCategoryColor = (category) => {
    switch(category) {
      case 'Low': return '#4CAF50';
      case 'Medium': return '#FF9800';
      case 'High': return '#F44336';
      default: return '#666';
    }
  };

  return (
    <div className="results-display">
      <h2>Prediction Results</h2>
      
      <div className="result-card">
        <h3>Obesity Risk Category</h3>
        <div 
          className="category-badge"
          style={{ backgroundColor: getCategoryColor(predictions.category) }}
        >
          {predictions.category} Risk
        </div>
      </div>

      <div className="result-card">
        <h3>Predicted Obesity Rate</h3>
        <p className="percentage">{predictions.obesityPercentage}%</p>
        <small>Based on global nutrition patterns from 141 countries</small>
      </div>

      <div className="result-card">
        <h3>Diet Pattern Classification</h3>
        <p><strong>{predictions.cluster}</strong></p>
        {predictions.dietDetails && (
          <div style={{ marginTop: '15px', fontSize: '0.95rem' }}>
            <p><em>{predictions.dietDetails.description}</em></p>
            <p style={{ marginTop: '10px' }}><strong>Similar Countries:</strong> {predictions.dietDetails.similarCountries.join(', ')}</p>
            <p style={{ marginTop: '10px' }}><strong>Characteristics:</strong> {predictions.dietDetails.characteristics}</p>
            <p style={{ marginTop: '10px', color: '#667eea', fontWeight: '600' }}>{predictions.dietDetails.healthNote}</p>
          </div>
        )}
      </div>

      <div className="result-card">
        <h3>Health Recommendation</h3>
        <p>{predictions.message}</p>
        {predictions.recommendations && (
          <div style={{ marginTop: '15px' }}>
            <strong>Recommended Actions:</strong>
            <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
              {predictions.recommendations.map((rec, index) => (
                <li key={index} style={{ marginBottom: '8px' }}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {predictions.yourMacros && (
        <div className="result-card">
          <h3>Your Macronutrient Breakdown</h3>
          <div style={{ display: 'grid', gap: '10px' }}>
            <p><strong>Fat:</strong> {predictions.yourMacros.fat}</p>
            <p><strong>Carbohydrates:</strong> {predictions.yourMacros.carbs}</p>
            <p><strong>Protein:</strong> {predictions.yourMacros.protein}</p>
            <p><strong>Total Calories:</strong> {predictions.yourMacros.calories}</p>
          </div>
        </div>
      )}

      {predictions.researchInsights && (
        <div className="result-card">
          <h3>Research Insights</h3>
          <div style={{ display: 'grid', gap: '10px', fontSize: '0.95rem' }}>
            <p><strong>Fat-Obesity Correlation:</strong> {predictions.researchInsights.fatCorrelation}</p>
            <p><strong>Carbs-Obesity Correlation:</strong> {predictions.researchInsights.carbsCorrelation}</p>
            <p><strong>Protein-Obesity Correlation:</strong> {predictions.researchInsights.proteinCorrelation}</p>
            <p><strong>Calories-Obesity Correlation:</strong> {predictions.researchInsights.caloriesCorrelation}</p>
            <p><strong>Model Accuracy:</strong> {predictions.researchInsights.modelAccuracy}</p>
            <p><strong>Variance Explained:</strong> {predictions.researchInsights.varianceExplained}</p>
            <p><strong>Data Coverage:</strong> {predictions.researchInsights.totalCountries} countries, {predictions.researchInsights.yearsAnalyzed}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultsDisplay;