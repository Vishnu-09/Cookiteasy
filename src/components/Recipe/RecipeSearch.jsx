import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Header/Navbar';
import './RecipeSearch.scss';

const RecipeSearch = () => {
  const [ingredients, setIngredients] = useState('');
  const [mealType, setMealType] = useState('');
  const [allergies, setAllergies] = useState('');
  const [recipe, setRecipe] = useState('');
  const [error, setError] = useState('');

  const handleGenerateRecipe = async () => {
    try {
      const response = await axios.post('http://localhost:5000/generate-recipe', {
        ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
        mealType,
        allergies: allergies.split(',').map(allergy => allergy.trim())
      });
      setRecipe(response.data.recipe);
      setError('');
    } catch (err) {
      setError('Error generating recipe. Please try again.');
      setRecipe('');
    }
  };

  const formatRecipe = (recipeText) => {
    const lines = recipeText.split('\n');
    const elements = [];

    lines.forEach((line, index) => {
      if (line.startsWith('##')) {
        const headerText = line.replace(/^##\s*/, '');
        elements.push(<h2 key={index}>{headerText}</h2>);
      } else if (line.startsWith('**')) {
        const boldText = line.replace(/^\*\*(.*?)\*\*/, (match, p1) => p1);
        elements.push(<strong key={index}>{boldText}</strong>);
      } else if (line.startsWith('*')) {
        const listItem = line.replace(/^\*\s*/, '');
        elements.push(<li key={index}>{listItem}</li>);
      } else if (line.startsWith('1.')) {
        const numberedItem = line.replace(/^1.\s*/, '');
        elements.push(<li key={index}>{numberedItem}</li>);
      } else {
        elements.push(<p key={index}>{line}</p>);
      }
    });

    return elements;
  };

  return (
    <div>
      <Navbar/>
      <div className="recipe-container">
        <h1>Recipe Generator</h1>
        <div className="form-container">
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
          <input
            type="text"
            placeholder="Enter allergies (comma-separated)"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
          />
          <button onClick={handleGenerateRecipe}>Generate Recipe</button>
        </div>
        <div className="recipe-output">
          {recipe && (
            <div className="generated-recipe">
              {formatRecipe(recipe)}
            </div>
          )}
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default RecipeSearch;
