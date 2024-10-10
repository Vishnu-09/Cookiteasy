import React, { useState } from 'react';
import axios from 'axios';

const RecipeSearch = () => {
  const [ingredients, setIngredients] = useState('');
  const [mealType, setMealType] = useState('');
  const [recipe, setRecipe] = useState('');
  const [error, setError] = useState('');

  const handleGenerateRecipe = async () => {
    try {
      const response = await axios.post('http://localhost:5000/generate-recipe', {
        ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
        mealType
      });
      setRecipe(response.data.recipe);
      setError('');
    } catch (err) {
      setError('Error generating recipe. Please try again.');
      setRecipe('');
    }
  };

  return (
    <div>
      <h1>Recipe Generator</h1>
      <input
        type="text"
        placeholder="Enter ingredients (comma-separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter meal type"
        value={mealType}
        onChange={(e) => setMealType(e.target.value)}
      />
      <button onClick={handleGenerateRecipe}>Generate Recipe</button>
      {recipe && (
        <div>
          <h2>Generated Recipe</h2>
          <p>{recipe}</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default RecipeSearch;
