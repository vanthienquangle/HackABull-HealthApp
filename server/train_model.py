import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

# Load dataset
df = pd.read_csv("diabetes_data.csv")

# Xử lý input/output
X = df[["Age", "Sex", "BMI", "HighBP", "Diabetes", "HeartDiseaseorAttack", "PhysActivity"]]
y = df["Stroke"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model
joblib.dump(model, "stroke_model.pkl")
print("Mô hình đã được train và lưu lại!")
