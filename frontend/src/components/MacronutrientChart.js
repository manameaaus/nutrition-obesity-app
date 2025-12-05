import React from 'react';

function MacronutrientChart({ fat, carbs, protein }) {
  const total = fat + carbs + protein;
  
  const fatPercent = (fat / total) * 100;
  const carbsPercent = (carbs / total) * 100;
  const proteinPercent = (protein / total) * 100;
  
  return (
    <div style={styles.container}>
      <h4 style={styles.title}>Macronutrient Distribution</h4>
      
      <div style={styles.barContainer}>
        <div 
          style={{
            ...styles.bar,
            width: `${fatPercent}%`,
            backgroundColor: '#e74c3c'
          }}
        >
          <span style={styles.barLabel}>{fat}%</span>
        </div>
        <div 
          style={{
            ...styles.bar,
            width: `${carbsPercent}%`,
            backgroundColor: '#3498db'
          }}
        >
          <span style={styles.barLabel}>{carbs}%</span>
        </div>
        <div 
          style={{
            ...styles.bar,
            width: `${proteinPercent}%`,
            backgroundColor: '#27ae60'
          }}
        >
          <span style={styles.barLabel}>{protein}%</span>
        </div>
      </div>
      
      <div style={styles.legend}>
        <div style={styles.legendItem}>
          <div style={{...styles.legendColor, backgroundColor: '#e74c3c'}}></div>
          <span>Fat</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{...styles.legendColor, backgroundColor: '#3498db'}}></div>
          <span>Carbohydrates</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{...styles.legendColor, backgroundColor: '#27ae60'}}></div>
          <span>Protein</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#fafbfc',
    padding: '20px',
    borderRadius: '8px',
    marginTop: '20px',
    border: '1px solid #e8e8e8'
  },
  title: {
    fontSize: '1.05rem',
    color: '#1a1a1a',
    marginBottom: '16px',
    textAlign: 'center',
    fontWeight: '600'
  },
  barContainer: {
    display: 'flex',
    width: '100%',
    height: '46px',
    borderRadius: '6px',
    overflow: 'hidden',
    border: '1px solid #e0e0e0'
  },
  bar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    position: 'relative'
  },
  barLabel: {
    color: 'white',
    fontWeight: '600',
    fontSize: '0.9rem',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
  },
  legend: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '18px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.9rem',
    color: '#333'
  },
  legendColor: {
    width: '14px',
    height: '14px',
    borderRadius: '3px',
    border: '1px solid rgba(0, 0, 0, 0.1)'
  }
};

export default MacronutrientChart;
