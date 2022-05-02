import React from "react";
import { useParams } from "react-router-dom";
import { useSuperHeroeData } from "../utils/useSuperHeroData";

export default function HeroDetails() {
  const params = useParams();
  const {
    data: hero,
    isLoading,
    isFetching,
    error,
  } = useSuperHeroeData(params.id);

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <h1>{hero.data.name}</h1>
    </div>
  );
}
