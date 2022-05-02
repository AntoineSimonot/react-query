import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";

export default function PaginatedQueries() {
  const fetchColors = (pageNumber) => {
    return axios.get(
      `http://localhost:4000/colors?_limit=2&_page=${pageNumber}`
    );
  };

  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, data, error } = useQuery(
    ["colors", pageNumber],
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true,
    }
  );
  return (
    <div>
      <h1>Paginated Queries</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data?.data.map((color) => {
            return <div key={color.id}>{color.name}</div>;
          })}
          <button
            onClick={() => setPageNumber(pageNumber - 1)}
            disabled={pageNumber === 1}
          >
            Previous Page
          </button>
          <button
            onClick={() => setPageNumber(pageNumber + 1)}
            disabled={pageNumber === 2}
          >
            Next Page
          </button>
        </div>
      )}
    </div>
  );
}
