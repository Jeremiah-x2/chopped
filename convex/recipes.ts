import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const bulkInsertRecipes = mutation({
  args: {
    recipes: v.array(v.any()),
  },
  handler: async (ctx, args) => {
    const { recipes } = args;

    for (const recipe of recipes) {
      const id = await ctx.db.insert("recipes", {
        ...recipe,
      });
    }
  },
});

export const getRecipesPaginated = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    const recipes = await ctx.db.query("recipes").paginate(args.paginationOpts);
    return recipes;
  },
});

export const getRecipeById = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const recipe = await ctx.db
      .query("recipes")
      .withIndex("by_cid", (q) => q.eq("id", Number(args.id)))
      .collect();

    return recipe;
  },
});

export const getRecipesBySearchQuery = query({
  args: {
    paginationOpts: paginationOptsValidator,
    veg: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { veg } = args;
    const recipes = await ctx.db
      .query("recipes")
      .order("asc")
      .filter((q) => q.eq(q.field("cuisines"), []))
      .paginate(args.paginationOpts);

    return recipes;
  },
});

export const getRecipesCarouselSearch = query({
  args: {
    paginationOpts: paginationOptsValidator,
    veg: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { veg } = args;
    const recipes = await ctx.db
      .query("recipes")
      .order("desc")
      .filter((q) => q.eq(q.field("vegetarian"), true))
      .paginate(args.paginationOpts);

    return recipes;
  },
});
