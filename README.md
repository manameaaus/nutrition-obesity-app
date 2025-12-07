# Nutrition & Obesity Risk Predictor 

Welcome to the **Nutrition & Obesity Risk Predictor**! This project is a full-stack web application designed to analyze the relationship between dietary patterns and obesity rates. By leveraging global data and Machine Learning, we aim to provide personalized risk assessments based on macronutrient intake.

## About The Project

Obesity is a complex global health challenge. This tool was built to explore how the balance of fat, carbohydrates, and proteins in our daily diet correlates with obesity prevalence. 

We utilize a **Random Forest Regressor**, trained on extensive datasets from the World Health Organization (WHO) and the Food and Agriculture Organization (FAO), to predict obesity risk percentages. The application offers an intuitive interface where users can input their dietary habits and receive instant, data-backed insights.

## ✨ Key Features

*   **Machine Learning Core**: Uses a trained Random Forest model (`scikit-learn`) to predict obesity risk with high accuracy.
*   **Interactive Dashboard**: A clean, responsive React frontend that visualizes data and results.
*   **Real-time Analysis**: Instant feedback on your macronutrient distribution (Fat vs. Carbs vs. Proteins).
*   **Robust Backend**: Powered by Node.js and Express to handle API requests and serve model predictions.
*   **Data-Driven**: built upon real-world data linking caloric supply sources to health outcomes.

## 🛠️ Tech Stack

*   **Frontend**: React.js, CSS3
*   **Backend**: Node.js, Express.js
*   **Machine Learning**: Python 3, Scikit-learn, Pandas, NumPy, Joblib
*   **Data Processing**: Pandas (Python) for initial dataset cleaning and feature engineering.

## 🏁 Getting Started

Follow these steps to get a local copy of the project up and running.

### Prerequisites

*   **Node.js** (v14 or higher)
*   **Python** (3.8 or higher)
*   `npm` or `yarn`

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/nutrition-obesity-app.git
    cd nutrition-obesity-app
    ```

2.  **Setup the Backend**
    Navigate to the backend folder and install dependencies:
    ```bash
    cd backend
    npm install
    ```
    *Note: Ensure you have the required Python packages installed for the ML model to run (if retraining is needed):*
    ```bash
    pip install -r ../requirements.txt
    ```

3.  **Setup the Frontend**
    Open a new terminal, navigate to the frontend folder, and install dependencies:
    ```bash
    cd frontend
    npm install
    ```

### Running the Application

1.  **Start the Backend Server**
    From the `backend` directory:
    ```bash
    npm start
    ```
    The server will start on port `3001`. It will load the pre-trained `obesity_model.pkl`.

2.  **Start the Frontend**
    From the `frontend` directory:
    ```bash
    npm start
    ```
    The application will open in your browser at `http://localhost:3000`.

## 🧠 How It Works

1.  **Input Data**: Enter your daily caloric intake and the percentage of calories coming from Fats, Carbohydrates, and Proteins.
2.  **Validation**: The app checks if your inputs are valid (e.g., percentages sum to ~100%).
3.  **Prediction**: The data is sent to the backend, where the Random Forest model processes it to predict a potential obesity risk score.
4.  **Result**: You receive a risk category (Low, Medium, High) along with actionable recommendations.
