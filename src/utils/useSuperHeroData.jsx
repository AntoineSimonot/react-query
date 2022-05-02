import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

function getSuperHeroe({ queryKey }) {
  return axios.get(`http://localhost:4000/superheroes/${queryKey[1]}`);
}

export const useSuperHeroeData = (heroId) => {
  const queryClient = useQueryClient();
  return useQuery(["super-hero", heroId], getSuperHeroe, {
    initialData: () => {
      const hero = queryClient
        .getQueryData("super-heroes")
        ?.data.find((heroe) => heroe.id === parseInt(heroId));

      if (hero) {
        return {
          data: hero,
        };
      } else {
        return undefined;
      }
    },
  });
};
