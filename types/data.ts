export interface SpoonacularRecipe {
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
