import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("AIzaSyDQa8b4K1Wcpc3OhpXBtGDgym5eXJgtPOY")
genai.configure(api_key="AIzaSyDQa8b4K1Wcpc3OhpXBtGDgym5eXJgtPOY")

model = genai.GenerativeModel("gemini-1.5-flash")

def suggest_food(food_type, protein, fiber, fat, carb, region="All over the world"):
    prompt = f"""
You are a helpful nutritionist. Generate a detailed meal suggestion for a diabetic patient.
The meal should be appropriate for someone with diabetes and follow regional cuisine guidelines.
Use the following required nutritional targets:

- Protein: {protein}g
- Fiber: {fiber}g
- Fat: {fat}g
- Carb: {carb}g

The region is: {region}
The meal type is: {food_type}

Return only the names of the meal or dishes that match this nutritional profile on three separate lines with their protein, fiber, fat, carb.
Keep it culturally appropriate but don't make the name too long.
Choose meals with whole grain foods, lean protein, good amount of good fats not normal fats, and fresh fruits.

Remember Meal 1 is breakfast, Meal 2 is lunch, Meal 3 is dinner.
Your whole response text answer should look like this, do not add anything else in your response even disclaimer:
Meal_1*protein_amount_of_meal1*fiber_amount_of_meal1*fat_amount_of_meal1*carb_amount_of_meal1
Meal_2*protein_amount_of_meal2*fiber_amount_of_meal2*fat_amount_of_meal2*carb_amount_of_meal2
Meal_3*protein_amount_of_meal3*fiber_amount_of_meal3*fat_amount_of_meal3*carb_amount_of_meal3
"""
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error generating suggestion: {e}"
