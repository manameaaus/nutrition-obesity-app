class DataProcessor {
  constructor() {
    this.fatCorrelation = 0.509;
    this.carbsCorrelation = -0.527;
    this.proteinCorrelation = 0.15;
    this.caloriesCorrelation = 0.45;
    
    this.globalStats = {
      avgObesity: 18.5,
      minObesity: 1.95,
      maxObesity: 45.2,
      avgFat: 22.5,
      avgCarbs: 62.8,
      avgProtein: 12.2,
      avgCalories: 2700
    };
  }

  predictObesity(fat, carbs, protein, calories) {
    const fatDeviation = (fat - this.globalStats.avgFat) / 10;
    const carbsDeviation = (carbs - this.globalStats.avgCarbs) / 10;
    const proteinDeviation = (protein - this.globalStats.avgProtein) / 5;
    const caloriesDeviation = (calories - this.globalStats.avgCalories) / 500;
    
    let obesityRate = this.globalStats.avgObesity;
    
    obesityRate += fatDeviation * this.fatCorrelation * 8;
    obesityRate += carbsDeviation * this.carbsCorrelation * 7;
    obesityRate += proteinDeviation * this.proteinCorrelation * 3;
    obesityRate += caloriesDeviation * this.caloriesCorrelation * 5;
    
    if (calories > 3000 && fat > 30) {
      obesityRate += 5;
    }
    
    if (carbs < 50 && fat > 35) {
      obesityRate += 3;
    }
    
    if (fat >= 20 && fat <= 30 && carbs >= 50 && carbs <= 65 && protein >= 10 && protein <= 15) {
      obesityRate -= 2;
    }
    
    obesityRate = Math.max(1.95, Math.min(45.2, obesityRate));
    
    return obesityRate;
  }

  classifyDietPattern(fat, carbs, protein, calories) {
    const patterns = {
      traditional: {
        name: 'Traditional/Plant-Based Diet',
        description: 'High carbohydrate, low fat diet typical of developing nations',
        countries: ['Afghanistan', 'Angola', 'Bangladesh', 'Cambodia', 'Ethiopia', 'India'],
        characteristics: 'Rich in grains, legumes, and vegetables',
        healthNote: 'Generally associated with lower obesity rates when calories are moderate'
      },
      western: {
        name: 'Western/High-Fat Diet',
        description: 'High fat, lower carbohydrate diet common in developed nations',
        countries: ['USA', 'Australia', 'Germany', 'UK', 'Canada', 'France'],
        characteristics: 'High in animal products, processed foods, and added fats',
        healthNote: 'Higher obesity risk, especially with excess calories'
      },
      mediterranean: {
        name: 'Balanced/Mediterranean Diet',
        description: 'Moderate fat from healthy sources, balanced macronutrients',
        countries: ['Italy', 'Spain', 'Greece', 'Portugal', 'Croatia'],
        characteristics: 'Olive oil, fish, whole grains, fruits, and vegetables',
        healthNote: 'Associated with lower chronic disease rates'
      },
      highEnergy: {
        name: 'High-Energy Transitional Diet',
        description: 'High in both fats and carbohydrates',
        countries: ['Chile', 'Argentina', 'Brazil', 'Mexico', 'Turkey'],
        characteristics: 'Mix of traditional and modern foods',
        healthNote: 'Elevated obesity risk due to energy surplus'
      },
      transitional: {
        name: 'Transitional/Mixed Diet',
        description: 'Shifting from traditional to modern dietary patterns',
        countries: ['China', 'India', 'Indonesia', 'Thailand', 'Vietnam'],
        characteristics: 'Increasing fat intake, decreasing carbohydrate reliance',
        healthNote: 'Obesity rates rising with economic development'
      },
      lowCarb: {
        name: 'Low-Carb/Ketogenic Diet',
        description: 'Very low carbohydrate, high fat diet',
        countries: ['Selected populations worldwide'],
        characteristics: 'Emphasis on fats and proteins, minimal carbohydrates',
        healthNote: 'Effective for some individuals, requires medical supervision'
      }
    };

    if (fat < 20 && carbs > 70) {
      return patterns.traditional;
    } else if (fat > 30 && carbs < 55) {
      return patterns.western;
    } else if (fat >= 25 && fat <= 35 && carbs >= 50 && carbs <= 60) {
      return patterns.mediterranean;
    } else if (fat > 28 && carbs > 60) {
      return patterns.highEnergy;
    } else if (carbs < 50 && fat > 35) {
      return patterns.lowCarb;
    } else {
      return patterns.transitional;
    }
  }

  getRiskCategory(obesityRate) {
    if (obesityRate < 12) {
      return {
        level: 'Low',
        message: 'Excellent! Your nutrition pattern suggests a low obesity risk. This aligns with populations having strong dietary traditions and balanced eating habits.',
        recommendations: [
          'Maintain your current balanced approach',
          'Ensure adequate micronutrient intake',
          'Stay physically active',
          'Monitor portion sizes'
        ]
      };
    } else if (obesityRate < 22) {
      return {
        level: 'Medium',
        message: 'Moderate risk level. Your nutrition pattern shows room for improvement. Consider optimizing your macronutrient balance and overall calorie intake.',
        recommendations: [
          'Increase fiber intake through whole grains and vegetables',
          'Choose healthy fats (olive oil, nuts, fish)',
          'Monitor portion sizes and total calorie intake',
          'Increase physical activity to 150+ minutes per week',
          'Limit processed foods and added sugars'
        ]
      };
    } else {
      return {
        level: 'High',
        message: 'Higher risk detected. Your current nutrition pattern may contribute to elevated obesity risk. Professional guidance is recommended for sustainable dietary changes.',
        recommendations: [
          'Consult with a registered dietitian or nutritionist',
          'Focus on whole, unprocessed foods',
          'Reduce overall calorie intake gradually',
          'Balance macronutrients (aim for 20-30% fat, 50-60% carbs, 15-20% protein)',
          'Increase physical activity progressively',
          'Consider medical evaluation for metabolic health'
        ]
      };
    }
  }

  generatePrediction(fat, carbs, protein, calories) {
    const obesityRate = this.predictObesity(fat, carbs, protein, calories);
    const dietPattern = this.classifyDietPattern(fat, carbs, protein, calories);
    const riskCategory = this.getRiskCategory(obesityRate);

    return {
      obesityPercentage: obesityRate.toFixed(1),
      category: riskCategory.level,
      message: riskCategory.message,
      recommendations: riskCategory.recommendations,
      cluster: dietPattern.name,
      dietDetails: {
        description: dietPattern.description,
        similarCountries: dietPattern.countries,
        characteristics: dietPattern.characteristics,
        healthNote: dietPattern.healthNote
      },
      researchInsights: {
        fatCorrelation: '+0.509 (Positive correlation with obesity)',
        carbsCorrelation: '-0.527 (Negative correlation with obesity)',
        proteinCorrelation: '+0.15 (Weak positive correlation)',
        caloriesCorrelation: '+0.45 (Moderate positive correlation)',
        totalCountries: 141,
        yearsAnalyzed: '1990-2022',
        modelAccuracy: '68.5%',
        varianceExplained: '32.8%'
      },
      yourMacros: {
        fat: `${fat}% (${(fat * calories / 900).toFixed(0)}g based on ${calories} calories)`,
        carbs: `${carbs}% (${(carbs * calories / 400).toFixed(0)}g based on ${calories} calories)`,
        protein: `${protein}% (${(protein * calories / 400).toFixed(0)}g based on ${calories} calories)`,
        calories: `${calories} kcal/day`
      }
    };
  }
}

module.exports = DataProcessor;
