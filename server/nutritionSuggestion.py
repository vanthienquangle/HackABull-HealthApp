import pandas as pd
from sklearn.multioutput import MultiOutputRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import joblib

# Đường dẫn tương đối chính xác từ cùng cấp với file
base_path = "dataset/"

# Load các dataset
demo = pd.read_sas(base_path + 'DEMO_L.xpt')
diq = pd.read_sas(base_path + 'DIQ_L.xpt')
diet = pd.read_sas(base_path + 'DR1TOT_L.xpt')
glu = pd.read_sas(base_path + 'GLU_L.xpt')
ghb = pd.read_sas(base_path + 'GHB_L.xpt')
bmi = pd.read_sas(base_path + 'BMX_L.xpt')

# Merge các bảng theo SEQN
merged = demo.merge(diet, on="SEQN", how='inner') \
             .merge(glu, on="SEQN", how='inner') \
             .merge(diq, on="SEQN", how='inner') \
             .merge(ghb, on="SEQN", how='inner') \
             .merge(bmi, on="SEQN", how='inner')

# Chọn các cột cần thiết
selected = merged[['RIDAGEYR', 'RIAGENDR', 'LBXGLU', 'DR1TPROT', 'DR1TCARB',
                   'DR1TFIBE', 'DR1TTFAT', 'LBXGH', 'DIQ010', 'BMXBMI']]

# Lọc người bị tiểu đường (DIQ010 == 1) nhưng kiểm soát tốt (HbA1c < 7)
selected = selected[selected['DIQ010'] == 1]
healthy_diabetic = selected[selected['LBXGH'] < 7]

# Biến độc lập (Age, Sex, BMI)
X = healthy_diabetic[['RIDAGEYR', 'RIAGENDR', 'BMXBMI']]
X['RIAGENDR'] = X['RIAGENDR'].map({1: 0, 2: 1})  # Nam:0, Nữ:1

# Biến phụ thuộc (Protein, Carb, Fiber, Fat)
y = healthy_diabetic[["DR1TPROT", "DR1TCARB", "DR1TFIBE", "DR1TTFAT"]]
y_clean = y.dropna()
X_clean = X.loc[y_clean.index]

# Chia tập train/test
X_train, X_test, y_train, y_test = train_test_split(X_clean, y_clean, test_size=0.2, random_state=42)

# Train model
model = MultiOutputRegressor(RandomForestRegressor(n_estimators=100, random_state=42))
model.fit(X_train, y_train)

# Predict cho một người ví dụ (Age, Sex, BMI)
new_patient = pd.DataFrame([[55, 0, 29.4]], columns=['RIDAGEYR', 'RIAGENDR', 'BMXBMI'])
predicted_macros = model.predict(new_patient)[0]
joblib.dump(model, "nutrition_model.pkl")

# In kết quả
print("Gợi ý dinh dưỡng cho bệnh nhân:")
print(f"Protein: {predicted_macros[0]:.2f}g")
print(f"Carb: {predicted_macros[1]:.2f}g")
print(f"Fiber: {predicted_macros[2]:.2f}g")
print(f"Fat: {predicted_macros[3]:.2f}g")

