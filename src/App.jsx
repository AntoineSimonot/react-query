import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RQSuperHeroes from "./pages/RQSuperHeroes";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "./components/Header";
import HeroDetails from "./pages/HeroDetails";
import ParallelQueriesjsx from "./pages/ParallelQueries";
import DynamicParallel from "./pages/DynamicParallel";
import DependentQueries from "./pages/DependentQueries";
import PaginatedQueries from "./pages/PaginatedQueries";
import InfiniteQueries from "./pages/InfiniteQueries";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/rq-super-heroes" element={<RQSuperHeroes />}></Route>
          <Route path="/superheroes/:id" element={<HeroDetails />}></Route>
          <Route path="/infinite-queries" element={<InfiniteQueries />}></Route>

          <Route
            path="/paginated-queries"
            element={<PaginatedQueries />}
          ></Route>
          <Route
            path="/dependent-queries"
            element={<DependentQueries />}
          ></Route>

          <Route
            path="/dynamic-parallel-queries"
            element={<DynamicParallel />}
          ></Route>

          <Route
            path="/parallel-queries"
            element={<ParallelQueriesjsx />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
