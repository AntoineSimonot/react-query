import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useAddSuperHero,
  useSuperHeroesData,
} from "../utils/useSuperHeroesData";

export default function RQSuperHeroes() {
  const [name, setName] = useState("");
  const [alterName, setAlterName] = useState("");

  const onSuccess = () => {
    console.log("data from query success");
  };

  const onError = () => {
    console.log("data from query error");
  };

  const {
    data: heroes,
    isLoading,
    isFetching,
    error,
  } = useSuperHeroesData(onSuccess, onError);

  const { mutate } = useAddSuperHero();

  const handleHeroSubmit = () => {
    const hero = {
      name,
      alterName,
    };
    mutate(hero);
  };

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <h1>Super Heroes</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={alterName} onChange={(e) => setAlterName(e.target.value)} />
      <button onClick={handleHeroSubmit}>Add Hero</button>

      <ul>
        {heroes?.data.map((hero) => (
          <Link key={hero.id} to={`/superheroes/${hero.id}`}>
            {hero.name}
          </Link>
        ))}
      </ul>
    </div>
  );
}
