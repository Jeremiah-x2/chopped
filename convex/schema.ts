import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  recipes: defineTable(v.any())
    .index("by_cuisine", ["cuisines"])
    .index("by_cid", ["id"]),
});

// interface SpoonacularRecipe {
//   id: number;
//   title: string;
//   image: string;
//   summary?: string;
//   instructions?: string;
//   readyInMinutes?: number;
//   servings?: number;
//   sourceUrl?: string;
//   [key: string]: any;
// }
