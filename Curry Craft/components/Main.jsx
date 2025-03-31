import React from "react"
import IngredientsList from "../components/Ingredients"
import ClaudeRecipe from "../components/ClaudeRecipe"
import { getRecipeFromGemini } from "../ai"

export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    
    async function getRecipe() {
        const recipeMarkdown  = await getRecipeFromGemini(ingredients)
        setRecipe(recipeMarkdown)
    }

    function addIngredient(event) {
        event.preventDefault()  // Prevents page refresh
        const formData = new FormData(event.target)
        const newIngredient = formData.get("ingredient").trim()
        
        if (newIngredient && !ingredients.includes(newIngredient)) {  // Avoid empty & duplicate ingredients
            setIngredients(prevIngredients => [...prevIngredients, newIngredient])
        }
        event.target.reset()  // Clear input field
    }

    return (
        <main>
            <form onSubmit={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button type="submit">Add ingredient</button>
            </form>
            
            {ingredients.length > 0 && 
                <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />
            }
            
            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}
