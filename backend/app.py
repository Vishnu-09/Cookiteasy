from flask import Flask, request, jsonify
from google.generativeai import GenerativeModel, configure
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configure the API key (hypothetical)
configure(api_key="AIzaSyAvMeZ9xcJ_qiZEsx7Hn-xK8tKvalJnNx8")

# Initialize the model (hypothetical)
model = GenerativeModel("gemini-1.5-flash")

@app.route('/generate-recipe', methods=['POST'])
def generate_recipe():
    try:
        data = request.json
        ingredients = data.get('ingredients', [])
        meal_type = data.get('mealType', '').strip().lower()
        allergies = data.get('allergies', [])

        # Construct the prompt based on user input
        prompt = f"Generate a {meal_type} recipe with the following ingredients: {', '.join(ingredients)}."
        if allergies:
            prompt += f" Avoid ingredients: {', '.join(allergies)}."

        # Generate the recipe using the hypothetical API
        response = model.generate_content(prompt)

        return jsonify({'recipe': response.text})

    except Exception as e:
        return jsonify({'error': f"Error generating recipe: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)
