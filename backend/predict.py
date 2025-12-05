import sys
import joblib
import numpy as np

model = joblib.load('obesity_model.pkl')

fat = float(sys.argv[1])
carbs = float(sys.argv[2])
protein = float(sys.argv[3])
calories = float(sys.argv[4])

features = np.array([[fat, carbs, protein, calories]])
prediction = model.predict(features)[0]

print(prediction)
