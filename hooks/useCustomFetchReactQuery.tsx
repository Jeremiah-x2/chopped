import { SPOONACULAR_API_KEY } from "@/utils/constants";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

type IUseFetchWithReactQuery = {
  baseUrl?: string;
  query?: Record<string, string>;
  customKey?: string | string[];
};

export default function useCustomFetchReactQuery({
  baseUrl = "https://api.spoonacular.com/recipes/random",
  query = {},
  customKey = "fetch_query",
}: IUseFetchWithReactQuery = {}): UseQueryResult<unknown, Error> {
  let SPOONACULAR_API_URL = `${baseUrl}?`;

  console.log("useCustomFetchReact Query Custom Key", customKey);

  const params = new URLSearchParams({
    apiKey: SPOONACULAR_API_KEY!,
    ...Object.fromEntries(
      Object.entries(query).map(([k, v]) => [k, String(v)])
    ),
  });

  SPOONACULAR_API_URL += params.toString();

  console.log("SPOONACULAR API : ", SPOONACULAR_API_URL);

  const fetchQuery = useQuery({
    queryKey: [customKey],
    queryFn: async () => {
      try {
        const { data } = await axios.get(SPOONACULAR_API_URL);
        return { data };
      } catch (error) {
        console.log(
          "An Error Occured while fetching Recipes with query: ",
          error
        );
        throw error;
      }
    },
    refetchOnMount: true,
    notifyOnChangeProps: "all",
  });

  return fetchQuery;
}
