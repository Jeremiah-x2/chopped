import { SPOONACULAR_API_KEY } from "@/utils/constants";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

type IUseFetchWithReactQuery = {
  searchQuery?: string;
  cuisine?: string[];
  mealType?: string[];
};

export default function useFetchWithReactQuery({
  searchQuery = "",
  cuisine = [],
  mealType = [],
}: IUseFetchWithReactQuery): UseQueryResult<unknown, Error> {
  console.log("Cuisines from hook", cuisine);
  console.log("MealTypes from hook", mealType);
  let SPOONACULAR_API_URL = `https://api.spoonacular.com/recipes/complexSearch?number=20&apiKey=${SPOONACULAR_API_KEY}&addRecipeInformation=true`;

  if (searchQuery) SPOONACULAR_API_URL += `&query=${searchQuery}`;

  if (cuisine) SPOONACULAR_API_URL += `&cuisine=${cuisine.join(",")}`;

  if (mealType) SPOONACULAR_API_URL += `&mealType=${mealType.join(",")}`;

  console.log("URL", SPOONACULAR_API_URL);

  const fetchQuery = useQuery({
    queryKey: [
      "queries",
      searchQuery,
      Array.isArray(cuisine) ? cuisine.join(",") : "",
      Array.isArray(mealType) ? mealType.join(",") : "",
    ],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`${SPOONACULAR_API_URL}`);
        return data;
      } catch (error) {
        console.log(
          "An Error Occured while fetching Recipes with query: ",
          error
        );
        throw error;
      }
    },
    enabled: Boolean(searchQuery || cuisine || mealType),
  });

  return { ...fetchQuery };
}
