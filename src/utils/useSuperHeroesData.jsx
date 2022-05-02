import axios from "axios";
import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from "react-query";

export const useSuperHeroesData = (onSuccess, onError) => {
  function getSuperHeroes() {
    return axios.get("http://localhost:4000/superheroes");
  }

  return useQuery("super-heroes", getSuperHeroes, {
    onSuccess: onSuccess,
    onError: onError,
    // enabled: false,
    // refetchIntervalInBackground: 1000 * 60 * 5,
    // cacheTime: 500000, // 5 minutes of cache
    // staleTime: 30000, // 30 sec of stale data before refetching
    // refetchOnMount: true, // refetch data on mount
    // refetchOnWindowFocus: false, // refetch data on window focus
    //     refetchInterval: 3000, refetch data every 3 sec

    //     select: (heroes) => {
    //       const heroesNames = heroes.data.map((superhero) => superhero.name);
    //       return heroesNames;
    //     },
  });
};

function addSuperHero(hero) {
  return axios.post("http://localhost:4000/superheroes", hero);
}

export const useAddSuperHero = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");
      const previousHeroes = await queryClient.getQueryData("super-heroes");
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            {
              id: oldQueryData?.data?.length + 1,
              ...newHero,
            },
          ],
        };
      });
      return {
        previousHeroes,
      };
    },
    onError: (error, hero, context) => {
      queryClient.setQueryData("super-heroes", context.previousHero);
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
  });
};
