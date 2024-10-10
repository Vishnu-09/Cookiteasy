const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.post('/generate-recipe', async (req, res) => {
  const { ingredients, mealType, cookingTime } = req.body;

  const prompt = `Give me a ${mealType} recipe with the following ingredients: ${ingredients}. It should be cooked in ${cookingTime}. Include the recipe name, ingredients list, instructions, and nutrition values (protein, carbohydrates, fat).`;

  console.log('Generated Prompt:', prompt);

  try {
    const response = await axios.post(
      'https://api.generativelanguage.googleapis.com/v1beta/generateContent',
      {
        prompt: prompt,
      },
      {
        headers: {
          Authorization: `Bearer AIzaSyCVIuTKTjwmY-Ub6R8xmtZjYRqEeqr8C2E`,
        },
      }
    );

    console.log('API Response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('API error details:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to generate recipe. Please try again.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
