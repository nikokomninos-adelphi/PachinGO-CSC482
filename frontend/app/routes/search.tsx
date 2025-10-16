/**
 * search.tsx
 *
 * A route for the search page. Contains logic
 * for searching a level, and setting the params
 * in the URL to create a reproducible search
 */

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
  // Search params in URL, to create a reproducible search
  const [searchParams, setSearchParams] = useSearchParams();

  const initialTerm = searchParams.get("term") || "";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [term, setTerm] = useState(initialTerm);
  const [results, setResults] = useState<any[]>([]);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 20;

  // Run when page changes — only if a search has been done
  useEffect(() => {
    const currentTerm = searchParams.get("term");
    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    if (currentTerm) {
      setTerm(currentTerm);
      setPage(currentPage);
      handleSearch(currentTerm, currentPage);
    } else {
      setResults([]);
    }
  }, [searchParams]);

  // Search the database for the search term, paginated
  const handleSearch = async (searchTerm: string, searchPage: number) => {
    const res = await fetch(
      import.meta.env.VITE_BACKEND_URL +
        `/api/v1/search/searchLevels?page=${searchPage}&limit=${limit}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({ term: searchTerm, page: searchPage, limit }),
      },
    );
    const data = await res.json();
    setResults(data.results);
    setPage(data.currentPage);
    setTotalPages(data.totalPages);
  };

  // Search on Enter key down
  // Set URL params to term and page
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchParams({ term, page: "1" }, { replace: false });
    }
  };

  // Set URL params to term and new page
  const handlePageChange = (newPage: number) => {
    setSearchParams({ term, page: newPage.toString() }, { replace: false });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-[#FAFAFA]">
        <div className="bg-[#FFF] flex-1 p-15 ml-[3vw] mr-[3vw] border-l-1 border-l-[#E1E1EE] border-r-1 border-r-[#E1E1EE] tracking-tighter">
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row flex-1 justify-center items-start grow w-[72vw]">
              <div className="flex flex-col p-2 border-1 border-[#E1E1EE] w-[15vw] min-h-screen rounded-lg">
                <h1></h1>
              </div>

              <div className="flex flex-col flex-1 grow justify-center gap-5 ml-5 w-350 rounded-lg">
                <input
                  type="text"
                  name="search"
                  placeholder="Search..."
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="text-center w- h-10 p-2 mb-5 border-1 border-[#e1e1ee] rounded-lg"
                />
                <div className="flex flex-wrap flex-1 grow justify-start gap-5">
                  {
                  // Map the results to the screen
                    results.map((r, i) => (
                    <LevelCard
                      key={i}
                      name={r.name}
                      author={r.author}
                      desc={r.description}
                    />
                  ))}
                </div>
                <div
                  className={
                    results.length === 0 ? "hidden" : "flex justify-center"
                  }
                >
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    setPage={handlePageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
