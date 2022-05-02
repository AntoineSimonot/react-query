import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/rq-super-heroes">RQ Super Heroes</Link>
        <Link to="/parallel-queries">Parallel Queries</Link>
        <Link to="/dynamic-parallel-queries">Parallel Queries</Link>
        <Link to="/dependent-queries">Dependent Queries</Link>
        <Link to="/paginated-queries">Paginated Queries</Link>
        <Link to="/infinite-queries">Infinite Queries</Link>
      </ul>
    </nav>
  );
}
