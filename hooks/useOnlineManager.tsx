import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "@tanstack/react-query";
import React from "react";
import { Platform } from "react-native";

export function useOnlineManager() {
  React.useEffect(() => {
    if (Platform.OS !== "web") {
      return NetInfo.addEventListener((state) => {
        onlineManager.setOnline(
          state.isConnected !== null &&
            state.isConnected &&
            Boolean(state.isInternetReachable)
        );
      });
    }
  }, []);
}

const x = [
  {
    _data: {
      aggregateLikes: 8,
      analyzedInstructions: [Array],
      cheap: false,
      cookingMinutes: 480,
      creditsText: "pinkwhen.com",
      cuisines: [Array],
      dairyFree: true,
      diets: [Array],
      dishTypes: [Array],
      extendedIngredients: [Array],
      gaps: "no",
      glutenFree: true,
      healthScore: 79,
      id: 1044252,
      image: "https://img.spoonacular.com/recipes/1044252-556x370.jpg",
      imageType: "jpg",
      instructions:
        "InstructionsPlace the roast in Crock Pot, cover with beef broth,  and cook on low for 8 hours. Fully cook the sweet potatoes when ready. When roast is finished, shred and serve over the sweet potatoes.",
      license: null,
      lowFodmap: false,
      occasions: [Array],
      originalId: null,
      preparationMinutes: 10,
      pricePerServing: 237.36,
      readyInMinutes: 490,
      servings: 5,
      sourceName: "pinkwhen.com",
      sourceUrl:
        "https://www.pinkwhen.com/shredded-roast-beef-stuffed-sweet-potatoes/",
      spoonacularScore: 95.76347351074219,
      spoonacularSourceUrl:
        "https://spoonacular.com/shredded-roast-beef-stuffed-sweet-potatoes-whole-30-paleo-1044252",
      summary:
        'Need a <b>gluten free, dairy free, paleolithic, and primal side dish</b>? Shredded Roast Beef Stuffed Sweet Potatoes (Whole 30 & PALEO) could be a great recipe to try. One portion of this dish contains around <b>135g of protein</b>, <b>242g of fat</b>, and a total of <b>3376 calories</b>. For <b>$4.24 per serving</b>, this recipe <b>covers 69%</b> of your daily requirements of vitamins and minerals. This recipe serves 5. Head to the store and pick up sweet potatoes, roast, beef broth, and a few other things to make it today. From preparation to the plate, this recipe takes about <b>8 hours and 10 minutes</b>. This recipe from Pink When has 8 fans. With a spoonacular <b>score of 62%</b>, this dish is pretty good. If you like this recipe, take a look at these similar recipes: <a href="https://spoonacular.com/recipes/shredded-roast-beef-stuffed-sweet-potatoes-whole-30-paleo-769774">Shredded Roast Beef Stuffed Sweet Potatoes (Whole 30 & PALEO)</a>, <a href="https://spoonacular.com/recipes/paleo-s-chicken-stuffed-sweet-potatoes-592982">Paleo s: Chicken Stuffed Sweet Potatoes</a>, and <a href="https://spoonacular.com/recipes/paleo-shredded-slow-cooker-roast-beef-with-pumpkin-and-salsa-+-a-slow-cooker-roundup-and-giveaway-680175">Paleo Shredded Slow Cooker Roast Beef with Pumpkin and Salsa + A Slow Cooker Roundup and GIVEAWAY</a>.',
      sustainable: false,
      title: "Shredded Roast Beef Stuffed Sweet Potatoes (Whole 30 & PALEO)",
      vegan: false,
      vegetarian: false,
      veryHealthy: true,
      veryPopular: false,
      weightWatcherSmartPoints: 9,
    },
    _exists: true,
    _metadata: { _metadata: [Array] },
    _ref: {
      //   _documentPath: [FirestorePath],
      //   _firestore: [FirebaseFirestoreModule],
    },
  },
];
