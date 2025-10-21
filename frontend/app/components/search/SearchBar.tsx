import { VscSearch } from "react-icons/vsc";

/**
 * A component for the search bar, used
 * to search for levels and to show the number
 * of results
 */
const SearchBar = ({
  term,
  setTerm,
  handleKeyDown,
  results,
  limit,
  page,
  totalResults,
}: {
  term: string;
  setTerm: Function;
  handleKeyDown: Function;
  results: any[];
  limit: string;
  page: number;
  totalResults: number;
}) => {
  return (
    <div>
      <div className="relative w-full">
        <input
          type="text"
          name="search"
          placeholder="Search..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
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
  );
};

export default SearchBar;
