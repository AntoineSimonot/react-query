import React from "react";
import { useQueries } from "react-query";
import axios from "axios";

export default function DynamicParallel() {
  const ids = [1, 2];
  const fetchSuperHeroe = () => {
    return axios("http://localhost:4000/superheroes");
  };

  const queryResults = useQueries(
    ids.map((id) => {
      return {
        queryKey: ["super-heroe", id],
        queryFn: () => fetchSuperHeroe(id),
      };
    })
  );

  console.log({ queryResults });

  return (
    <div>
      <h1>Dynamic Parallel Queries</h1>
    </div>
  );
}
