import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

export default function ParallelQueriesjsx() {
  const fetchSuperHeroes = () => {
    return axios("http://localhost:4000/superheroes");
  };

  const fetchFriends = () => {
    return axios("http://localhost:4000/friends");
  };

  const { data: superHeroes, isLoading: isLoadingHeroes } = useQuery(
    "super-heroes",
    fetchSuperHeroes
  );
  const { data: friends, isLoading: isLoadingFriends } = useQuery(
    "friends",
    fetchFriends
  );

  if (isLoadingHeroes || isLoadingFriends) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Parallel Queries</h1>
      <ul>
        {superHeroes?.data.map((superHero) => (
          <li key={superHero.id}>{superHero.name}</li>
        ))}
      </ul>
      <ul>
        {friends?.data.map((friend) => (
          <li key={friend.id}>{friend.name}</li>
        ))}
      </ul>
    </div>
  );
}
