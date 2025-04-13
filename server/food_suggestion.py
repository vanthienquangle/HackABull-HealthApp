import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("AIzaSyDQa8b4K1Wcpc3OhpXBtGDgym5eXJgtPOY")
genai.configure(api_key="AIzaSyDQa8b4K1Wcpc3OhpXBtGDgym5eXJgtPOY")

model = genai.GenerativeModel("gemini-1.5-flash")

def suggest_food(food_type, protein, fiber, potassium, magnesium, region="All around the world"):
    prompt = f"""
You are a helpful nutritionist. Generate a detailed meal suggestion for a diabetic patient.
The meal should be appropriate for someone with diabetes and follow regional cuisine guidelines.
Use the following required nutritional targets:

- Protein: {protein}g
- Fiber: {fiber}g
- Potassium: {potassium}mg
- Magnesium: {magnesium}mg

The region is: {region}
The meal type is: {food_type}

Return only the name of the meal and bullet points of ingredients or dishes that match this nutritional profile. Keep it culturally appropriate.
"""

    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error generating suggestion: {e}"
