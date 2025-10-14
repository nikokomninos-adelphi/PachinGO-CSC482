import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import LevelCard from "~/components/LevelCard";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Pagination from "~/components/Pagination";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Search - PachinGO!" },
    { name: "description", content: "Peggle Reborn" },
  ];
}

const Search = () => {
  // Search params in URL
  const [searchParams, setSearchParams] = useSearchParams();

  const initialTerm = searchParams.get("term") || "";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [term, setTerm] = useState(initialTerm);
  const [results, setResults] = useState<any[]>([]);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const limit = 10;

  // Run when page changes — only if a search has been done
  useEffect(() => {
    if (hasSearched) {
      handleSearch();
      setSearchParams({ term, page: page.toString() });
    }
  }, [page]);

  // Run once on load — if URL already has term (like bookmarked URL)
  useEffect(() => {
    if (initialTerm) {
      setHasSearched(true);
      handleSearch();
    }
  }, []);

  // Search the database for the search term, paginated
  const handleSearch = async () => {
    const res = await fetch(
      import.meta.env.VITE_BACKEND_URL +
        `/api/v1/search/searchLevels?page=${page}&limit=${limit}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({ term, page, limit }),
      },
    );
    const data = await res.json();
    setResults(data.results);
    setPage(data.currentPage);
    setTotalPages(data.totalPages);
    setSearchParams({ term: term, page: data.currentPage });
  };

  // Search on Enter key down
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setPage(1);
      setSearchParams({ term, page: "1" });
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 p-15 min-h-screen tracking-tighter">
        <div className="flex flex-col justify-center items-center">
          <input
            type="text"
            name="search"
            placeholder="Search..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="text-center w-250 p-2 mb-5 border-1 border-[#c1c1c8] rounded-lg drop-shadow-md"
          />
          <div className="flex flex-wrap flex-1 grow justify-center gap-5 w-350 h-100 rounded-lg drop-shadow-md p-5">
            {results.length > 0 ? (
              // Map the results to the screen
              results.map((r, i) => (
                <LevelCard
                  key={i}
                  name={r.name}
                  author={r.author}
                  desc={r.description}
                />
              ))
            ) : (
              <h1>No Results</h1>
            )}
          </div>
          <div className={results.length === 0 ? "hidden" : ""}>
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
