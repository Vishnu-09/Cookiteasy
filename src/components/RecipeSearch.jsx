import React, { useState } from 'react';

function RecipeSearch() {
  const [query, setQuery] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [diets, setDiet] = useState('');
  const [allergies, setAllergies] = useState('');

  const FOOD_APP_ID = '4d30ae94';
  const FOOD_API_KEY = 'c957018cffd764af8ed8628d039d115e';

  const addIngredient = () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery !== '') {
      setIngredients((prevIngredients) => [...prevIngredients, trimmedQuery]);
      setQuery('');
    }
  };

  const removeIngredient = (index) => {
    setIngredients((prevIngredients) => prevIngredients.filter((_, i) => i !== index));
  };

  const clearIngredients = () => {
    setIngredients([]);
  };

  const searchRecipes = async () => {
    try {
      let url = `https://api.edamam.com/search?q=${ingredients.join(',')}&app_id=${FOOD_APP_ID}&app_key=${FOOD_API_KEY}`;

      if (diets && diets !== 'any') {
        url += `&diet=${diets}`;
      }

      if (allergies && allergies !== 'none') {
        url += `&health=${allergies}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      setRecipes(data.hits || []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <div id="s2" style={{maxWidth:'900px',border: '1px solid #ccc',borderRadius: '8px',
    margin:'20px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ border: '1px solid #ccc',borderRadius: '8px',marginBottom: '20px'}}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Recipe Search</h1>
      <div style={{
        textAlign: 'center', margin: '20px auto' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter an ingredient"
          style={{
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '250px',
            marginRight: '10px',
          }}
        />
        <button
          onClick={addIngredient}
          style={{
            padding: '10px',
            borderRadius: '4px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            marginRight: '10px',
          }}
        >
          Add Ingredient
        </button>
        <button
          onClick={clearIngredients}
          style={{
            padding: '10px',
            borderRadius: '4px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Clear Ingredients
        </button>
      </div>
      

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {ingredients.map((ingredient, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <span style={{ marginRight: '10px' }}>{ingredient}</span>
            <button
              onClick={() => removeIngredient(index)}
              style={{
                padding: '8px',
                borderRadius: '4px',
                backgroundColor: '#ffc107',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>Diets:</label>
        <select
          value={diets}
          onChange={(e) => setDiet(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        >
          <option value="any">Any</option>
          <option value="no-sugar">No-Sugar</option>
          <option value="vegan">Vegan</option>
          <option value="balanced">Balanced</option>
          <option value="high-protein">High-Protein</option>
        </select>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>Allergies:</label>
        <select
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        >
          <option value="none">None</option>
          <option value="egg-free">Egg-Free</option>
          <option value="dairy-free">Dairy-Free</option>
        </select>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={searchRecipes}
          style={{
            padding: '12px',
            borderRadius: '4px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Generate Recipes
        </button>
      </div>
      </div>
      <div style={{ padding: '20px' }}>
        {recipes.length > 0 ? (
          recipes.map((recipeData, index) => {
            const recipe = recipeData.recipe;
            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '15px',
                  marginBottom: '20px',
                }}
              >
                <div style={{ flex: '1', textAlign: 'left' }}>
                  <h2 style={{ color: '#333', marginBottom: '10px' }}>{recipe.label}</h2>
                  <img
                    src={recipe.image}
                    alt={recipe.label}
                    style={{
                      maxWidth: '150px',
                      borderRadius: '8px',
                      marginRight: '20px',
                    }}
                  />
                </div>
                <div style={{ flex: '2', textAlign: 'left', marginTop: '20px' }}>
                <h2>Ingredients</h2>
                  <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                    {recipe.ingredients.map((ingredient, ingIndex) => (
                      <li key={ingIndex}>{ingredient.text}</li>
                    ))}
                  </ul>
                  <a
                    href={recipe.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#007bff',
                      textDecoration: 'none',
                      marginTop: '10px',
                    }}
                  >
                    View Recipe
                  </a>
                </div>
                <div
                  style={{
                    flex: '1',
                    textAlign: 'left',
                    marginTop: '20px',
                  }}
                >
                  <h2>Nutrition Value</h2>
                  <p>Fat: {recipe.totalNutrients.FAT?.quantity?.toFixed(2) || 'N/A'} {recipe.totalNutrients.FAT?.unit || ''}</p>
                  <p>Protein: {recipe.totalNutrients.PROCNT?.quantity?.toFixed(2) || 'N/A'} {recipe.totalNutrients.PROCNT?.unit || ''}</p>
                  <p>Carbohydrates: {recipe.totalNutrients.CHOCDF?.quantity?.toFixed(2) || 'N/A'} {recipe.totalNutrients.CHOCDF?.unit || ''}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p style={{ textAlign: 'center', color: '#999' }}>No recipes found with the specified criteria.</p>
        )}
      </div>
    </div>
  );
}

export default RecipeSearch;
