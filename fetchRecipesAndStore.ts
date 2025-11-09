import axios from "axios";
import * as dotenv from "dotenv";
import admin from "firebase-admin"; // ✅ default import in ESM
import { readFileSync } from "fs";

dotenv.config();

// 🔑 Load the service account JSON file
const serviceAccountPath = "./service.json";
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf-8"));

// 🚀 Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const db = admin.firestore();

// 📦 Firestore collection name
const RECIPES_COLLECTION = "recipes";

// 🌐 Spoonacular API endpoint
const SPOONACULAR_API_URL = `https://api.spoonacular.com/recipes/random?number=100&apiKey=f52589abe7274e488b99c971dddd6093`;

interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  summary?: string;
  instructions?: string;
  readyInMinutes?: number;
  servings?: number;
  sourceUrl?: string;
  [key: string]: any;
}

async function fetchRecipes(): Promise<SpoonacularRecipe[]> {
  try {
    const response = await axios.get(SPOONACULAR_API_URL);
    const recipes = response.data.recipes;

    if (!recipes || recipes.length === 0) {
      console.warn("⚠️ No recipes returned from API");
      return [];
    }

    return recipes;
  } catch (error: any) {
    console.error("❌ Failed to fetch recipes:", error.message);
    return [];
  }
}

async function saveRecipeToFirestore(recipe: SpoonacularRecipe) {
  try {
    const recipeRef = db
      .collection(RECIPES_COLLECTION)
      .doc(recipe.id.toString());
    const docSnapshot = await recipeRef.get();

    if (docSnapshot.exists) {
      console.log(
        `🔁 Skipped: Recipe ${recipe.title} (ID: ${recipe.id}) already exists.`
      );
      return;
    }

    await recipeRef.set(recipe);
    console.log(`✅ Added: ${recipe.title} (ID: ${recipe.id})`);
  } catch (error: any) {
    console.error(`❌ Error saving recipe ID ${recipe.id}:`, error.message);
  }
}

async function main() {
  const recipes = await fetchRecipes();

  if (recipes.length === 0) {
    console.log("🚫 No recipes to save.");
    return;
  }

  console.log("💾 Saving recipes to Firestore...");
  for (const recipe of recipes) {
    await saveRecipeToFirestore(recipe);
  }

  console.log("🎉 Done! All recipes processed.");
}
for (let x of new Array(5).fill(null)) {
  (async () => {
    try {
      await main();
    } catch (error) {
      console.log("An error occured in Main function");
    }
  })();
}
