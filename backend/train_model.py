import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import joblib
import os

data_path = '../PPTs and Video/Python Notebook and Dataset/'

obesity_df = pd.read_csv(os.path.join(data_path, 'obesity-prevalence-adults-who-gho.csv'))
macros_df = pd.read_csv(os.path.join(data_path, 'daily-caloric-supply-derived-from-carbohydrates-protein-and-fat.csv'))
calories_df = pd.read_csv(os.path.join(data_path, 'daily-per-capita-caloric-supply.csv'))

obesity_df = obesity_df.rename(columns={
    'Prevalence of obesity among adults, BMI >= 30 (age-standardized estimate) (%) - Sex: both sexes - Age group: 18+  years of age': 'Obesity'
})

macros_df['Carbs_Cal'] = macros_df['Daily calorie supply per person from carbohydrates']
macros_df['Fat_Cal'] = macros_df['Daily calorie supply per person from fat']
macros_df['Protein_Cal'] = (macros_df['Daily calorie supply per person that comes from animal protein'] + 
                             macros_df['Daily calorie supply per person that comes from vegetal protein'])

calories_df = calories_df.rename(columns={
    'Daily calorie supply per person': 'Total_Calories'
})

merged_df = obesity_df.merge(macros_df, on=['Entity', 'Code', 'Year'], how='inner')
merged_df = merged_df.merge(calories_df, on=['Entity', 'Code', 'Year'], how='inner')

merged_df = merged_df.dropna()

merged_df['Fat_Percent'] = (merged_df['Fat_Cal'] / merged_df['Total_Calories']) * 100
merged_df['Carbs_Percent'] = (merged_df['Carbs_Cal'] / merged_df['Total_Calories']) * 100
merged_df['Protein_Percent'] = (merged_df['Protein_Cal'] / merged_df['Total_Calories']) * 100

final_df = merged_df[['Fat_Percent', 'Carbs_Percent', 'Protein_Percent', 'Total_Calories', 'Obesity']]
final_df = final_df[(final_df['Fat_Percent'] > 0) & (final_df['Carbs_Percent'] > 0) & (final_df['Protein_Percent'] > 0)]

print(f"Dataset size: {len(final_df)} samples")
print(f"Countries: {merged_df['Entity'].nunique()}")
print(f"Years covered: {merged_df['Year'].min()} - {merged_df['Year'].max()}")

X = final_df[['Fat_Percent', 'Carbs_Percent', 'Protein_Percent', 'Total_Calories']]
y = final_df['Obesity']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestRegressor(n_estimators=100, max_depth=15, random_state=42, n_jobs=-1)

print("\nTraining Random Forest model...")
model.fit(X_train, y_train)

y_pred = model.predict(X_test)

mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, y_pred)

print("\nModel Performance:")
print(f"R² Score: {r2:.4f}")
print(f"RMSE: {rmse:.4f}")

feature_importance = pd.DataFrame({
    'Feature': X.columns,
    'Importance': model.feature_importances_
}).sort_values('Importance', ascending=False)

print("\nFeature Importance:")
print(feature_importance)

joblib.dump(model, 'obesity_model.pkl')
print("\nModel saved as 'obesity_model.pkl'")

correlation_matrix = final_df[['Fat_Percent', 'Carbs_Percent', 'Protein_Percent', 'Total_Calories', 'Obesity']].corr()
print("\nCorrelation with Obesity:")
print(correlation_matrix['Obesity'].sort_values(ascending=False))
