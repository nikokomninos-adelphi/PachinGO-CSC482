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

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import Pagination from "~/components/Pagination";
import FilterBox from "~/components/FilterBox";

import { FaClock } from "react-icons/fa6";

import { VscSearch } from "react-icons/vsc";
import UserCard from "~/components/UserCard";
import { FaHeart, FaPlayCircle } from "react-icons/fa";

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
  const initialSearchType = searchParams.get("searchType") || "levelName";
  const initialSortType = searchParams.get("sortType") || "date";
  const initialSortOrderType = searchParams.get("sortOrderType") || "desc";
  const initialLimit = searchParams.get("limit") || "25";

  const [term, setTerm] = useState(initialTerm);
  const [results, setResults] = useState<any>([]);
  const [page, setPage] = useState(initialPage);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchType, setSearchType] = useState(initialSearchType);
  const [sortType, setSortType] = useState(initialSortType);
  const [sortOrderType, setSortOrderType] = useState(initialSortOrderType);
  const [limit, setLimit] = useState(initialLimit);

  // If a term is provided in the URL, but not
  // a page, automatically append "&page=1" to the URL
  // on render. If no term is provided, but a page is,
  // automatically prepend "term=" to the URL on render
  useEffect(() => {
    if (initialTerm)
      setSearchParams({
        term,
        page: "1",
        limit,
        searchType,
        sortType,
        sortOrderType,
      });
    if (!initialTerm) handleRecentLevels();
    //setSearchParams({
    //  term: "",
    //  page: "1",
    //  limit,
    //  searchType,
    //  sortType,
    //  sortOrderType,
    //});
  }, []);

  // Set a default sort and order type for when
  // the search type is changed. Prevents invalid
  // searches for search types that might not
  // have the sort or order type the user
  // searched with
  useEffect(() => {
    if (searchType === "levelName") {
      setSortType("date");
      setSortOrderType("desc");
    }
    if (searchType === "users") {
      setSortType("name");
    }
  }, [searchType]);

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
  }, [searchParams, limit]);

  // Search the database for the search term, paginated
  const handleSearch = async (searchTerm: string, searchPage: number) => {
    let endpoint;
    if (searchType === "levelName") endpoint = "searchLevelName";
    if (searchType === "levelID") endpoint = "searchLevelID";
    if (searchType === "users") endpoint = "searchUsers";

    const res = await fetch(
      import.meta.env.VITE_BACKEND_URL + `/api/v1/search/${endpoint}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({
          term: searchTerm,
          page: searchPage,
          limit,
          sortType,
          sortOrderType,
        }),
      },
    );
    const data = await res.json();
    setResults(data.results);
    setTotalResults(data.total);
    setPage(data.currentPage);
    setTotalPages(data.totalPages);
  };

  // Search on Enter key down
  // Set URL params to term and page
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchParams(
        { term, page: "1", limit, searchType, sortType, sortOrderType },
        { replace: false },
      );
    }
  };

  // Set URL params to term and new page
  const handlePageChange = (newPage: number) => {
    setSearchParams(
      {
        term,
        page: newPage.toString(),
        limit,
        searchType,
        sortType,
        sortOrderType,
      },
      { replace: false },
    );
  };

  const handleRecentLevels = () => {
    setSearchType("levelName");
    setSearchParams(
      {
        term: "$recent$",
        page: "1",
        limit,
        searchType,
        sortType,
        sortOrderType,
      },
      { replace: false },
    );
  };

  const handleMostPlayedLevels = () => {
    setSearchType("levelName");
    setSearchParams(
      {
        term: "$plays$",
        page: "1",
        limit,
        searchType,
        sortType,
        sortOrderType,
      },
      { replace: false },
    );
  };

  const handleMostLikedLevels = () => {
    setSearchType("levelName");
    setSearchParams(
      {
        term: "$likes$",
        page: "1",
        limit,
        searchType,
        sortType,
        sortOrderType,
      },
      { replace: false },
    );
  };

  const renderResults = useMemo(() => {
    switch (searchType) {
      case "levelName":
        return results.map((r: any, i: any) => (
          <LevelCard
            key={i}
            id={r.levelID}
            name={r.name}
            author={r.author}
            desc={r.description}
          />
        ));
      case "levelID":
        return results.map((r: any, i: any) => (
          <LevelCard
            key={i}
            id={r.levelID}
            name={r.name}
            author={r.author}
            desc={r.description}
          />
        ));
      case "users":
        return results.map((r: any, i: any) => (
          <UserCard key={i} username={r.user?.username} />
        ));
    }
  }, [results]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-[url('./../../public/pattern.svg')] bg-repeat animate-[scroll-pattern_100s_linear_infinite]">
        <div className="bg-[#FFF] flex-1 p-15 ml-[3vw] mr-[3vw] border-l-1 border-l-[#E1E1EE] border-r-1 border-r-[#E1E1EE] tracking-tighter min-h-screen">
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row flex-1 justify-center items-start grow w-[72vw]">
              <div className="flex flex-col">
                <button
                  onClick={handleRecentLevels}
                  className="flex flex-row justify-between items-center p-2 mb-2 border-1 border-[#E1E1EE] rounded-lg hover:bg-[#FAFAFA] ease-linear duration-75 cursor-pointer"
                >
                  Recently Uploaded
                  <FaClock size={14} />
                </button>

                <button
                  onClick={handleMostPlayedLevels}
                  className="flex flex-row justify-between items-center p-2 mb-2 border-1 border-[#E1E1EE] rounded-lg hover:bg-[#FAFAFA] ease-linear duration-75 cursor-pointer"
                >
                  Most Played
                  <FaPlayCircle />
                </button>

                <button
                  onClick={handleMostLikedLevels}
                  className="flex flex-row justify-between items-center p-2 mb-2 border-1 border-[#E1E1EE] rounded-lg hover:bg-[#FAFAFA] ease-linear duration-75 cursor-pointer"
                >
                  Most Liked
                  <FaHeart />
                </button>
                <FilterBox
                  searchType={searchType}
                  setSearchType={setSearchType}
                  sortType={sortType}
                  setSortType={setSortType}
                  sortOrderType={sortOrderType}
                  setSortOrderType={setSortOrderType}
                  limit={limit}
                  setLimit={setLimit}
                />
              </div>

              <div className="flex flex-col flex-1 grow justify-center gap-5 ml-5 w-350 rounded-lg">
                <div>
                  <div className="relative w-full">
                    <input
                      type="text"
                      name="search"
                      placeholder="Search..."
                      value={term}
                      onChange={(e) => setTerm(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex w-full h-10 p-2 border-1 border-[#e1e1ee] rounded-lg"
                    />
                    <VscSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  </div>
                  <h1 className={"text-xs ml-1 mt-1"}>
                    Showing results{" "}
                    {results.length === 0 ? "0" : +limit * (page - 1) || "1"} -{" "}
                    {results.length + +limit > totalResults
                      ? results.length
                      : +limit * page > totalResults
                        ? totalResults
                        : +limit * page}{" "}
                    of {totalResults}
                  </h1>
                </div>
                <div className="flex flex-wrap flex-1 grow justify-start gap-5">
                  {renderResults}
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
