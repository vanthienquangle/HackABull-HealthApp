import google.generativeai as genai

# Initialize Gemini with your API key
genai.configure(api_key='AIzaSyBYVDhkl5Id5GAdvy9SS9oQ7bonqo8Phh4')  # Replace with your actual API key

def suggest_food(food_type, protein, fiber, potassium, magnesium, region):
    prompt = (f"Make an {region} meal plan for a day (Breakfast, Lunch, and Dinner) with a total nutrient content of {protein} grams of protein, {magnesium} mg of Magnesium, {potassium} mg of Potassium, {fiber} mg fiber. Don't write any descriptions before or after, just the name of the meal, type of the meal, and nutrient content. No summary.")



    # Create a Gemini model instance
    model = genai.GenerativeModel('gemini-1.5-flash')

    # Send the prompt to Gemini
    try:
        response = model.generate_content(prompt)
        return(response.text)
    except Exception as e:
        print("An error occurred:", e)

# Example usage
if __name__ == "__main__":
    food_type = input("Enter food type (e.g., snack, meal, fruit): ")
    protein = input("Enter % of protein: ")
    fiber = input("Enter % of fiber: ")
    potassium = input("Enter % of potassium: ")
    magnesium = input("Enter % of magnesium: ")
    region = input("Which regional food would you like to eat: ")

    suggest_food(food_type, protein, fiber, potassium, magnesium, region)
