import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`;

// Load the Gemini API key from environment variables
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function getRecipeFromGemini(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ");
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const response = await model.generateContent({
            contents: [
                { role: "user", parts: [{ text: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` }] }
            ],
            generationConfig: {
                maxOutputTokens: 1024
            }
        });

        return response.response.candidates[0].content.parts[0].text;
    } catch (err) {
        console.error("Error fetching recipe from Gemini:", err);
        return "Oops! Something went wrong while fetching the recipe.";
    }
}
