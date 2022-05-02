import axios from "axios";
import React, { Fragment } from "react";
import { useInfiniteQuery } from "react-query";

export default function InfiniteQueries() {
  const searchColors = ({ pageParam = 1 }) => {
    return axios.get(
      `http://localhost:4000/colors?_limit=2&_page=${pageParam}`
    );
  };

  const { data, isLoading, error, hasNextPage, fetchNextPage } =
    useInfiniteQuery(["colors"], searchColors, {
      getNextPageParam: (lastPage, pages) => {
        if (pages.length < 2) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    });

  return (
    <div>
      <h1>Infinite Queries</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data?.pages.map((group, index) => {
            return (
              <Fragment key={index}>
                {group.data.map((color) => (
                  <div>{color.name}</div>
                ))}
              </Fragment>
            );
          })}
          <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
            Next Page
          </button>
        </div>
      )}
    </div>
  );
}
