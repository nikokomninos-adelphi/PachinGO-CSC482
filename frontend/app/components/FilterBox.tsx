/**
 * FilterBox
 *
 * A component that controls search filters
 * on the search page
 */

const FilterBox = ({
  searchType,
  setSearchType,
  sortType,
  setSortType,
  limit,
  setLimit,
}: {
  searchType: string;
  setSearchType: Function;
  sortType: string;
  setSortType: Function;
  limit: string;
  setLimit: Function;
}) => {
  const handleSearchTypeValue = (e: any) => {
    const newValue = e.target.value;
    setSearchType(newValue);
  };

  const handleSortChange = (e: any) => {
    const newValue = e.target.value;
    setSortType(newValue);
  };

  const handleLimitChange = (e: any) => {
    const newValue = e.target.value;
    setLimit(newValue);
  };

  return (
    <div className="flex flex-col p-8 border-1 border-[#E1E1EE] w-[15vw] h-fit rounded-lg">
      <div className="mb-5">
        <h1 className="font-bold mb-2">Search Type</h1>
        <div>
          <input
            type="radio"
            id="levelName"
            name="searchType"
            value="levelName"
            checked={searchType === "levelName"}
            onChange={(e) => handleSearchTypeValue(e)}
            className="accent-[#352F36]"
          />
          <label htmlFor="levelName" className="ml-2">
            Level Name
          </label>
        </div>

        <div>
          <input
            type="radio"
            id="levelID"
            name="searchType"
            value="levelID"
            checked={searchType === "levelID"}
            onChange={(e) => handleSearchTypeValue(e)}
            className="accent-[#352F36]"
          />
          <label htmlFor="levelID" className="ml-2">
            Level ID
          </label>
        </div>

        <div>
          <input
            type="radio"
            id="users"
            name="searchType"
            value="users"
            checked={searchType === "users"}
            onChange={(e) => handleSearchTypeValue(e)}
            className="accent-[#352F36]"
          />
          <label htmlFor="users" className="ml-2">
            Users
          </label>
        </div>
      </div>

      <div
        className={
          searchType === "levelName" || searchType === "users"
            ? "mb-5"
            : "hidden"
        }
      >
        <h1 className="font-bold mb-2">Sort By</h1>
        <div className={searchType === "users" ? "hidden" : ""}>
          <input
            type="radio"
            id="date"
            name="sort"
            value="date"
            checked={sortType === "date"}
            onChange={(e) => handleSortChange(e)}
            className="accent-[#352F36]"
          />
          <label htmlFor="date" className="ml-2">
            Date Uploaded
          </label>
        </div>

        <div>
          <input
            type="radio"
            id="ascending"
            name="sort"
            value="ascending"
            checked={sortType === "ascending"}
            onChange={(e) => handleSortChange(e)}
            className="accent-[#352F36]"
          />
          <label htmlFor="ascending" className="ml-2">
            Name Ascending
          </label>
        </div>

        <div>
          <input
            type="radio"
            id="descending"
            name="sort"
            value="descending"
            checked={sortType === "descending"}
            onChange={(e) => handleSortChange(e)}
            className="accent-[#352F36]"
          />
          <label htmlFor="descending" className="ml-2">
            Name Descending
          </label>
        </div>

        <div className={searchType === "users" ? "hidden" : ""}>
          <input
            type="radio"
            id="plays"
            name="sort"
            value="plays"
            checked={sortType === "plays"}
            onChange={(e) => handleSortChange(e)}
            className="accent-[#352F36]"
          />
          <label htmlFor="plays" className="ml-2">
            Plays
          </label>
        </div>

        <div className={searchType === "users" ? "hidden" : ""}>
          <input
            type="radio"
            id="likes"
            name="sort"
            value="likes"
            checked={sortType === "likes"}
            onChange={(e) => handleSortChange(e)}
            className="accent-[#352F36]"
          />
          <label htmlFor="likes" className="ml-2">
            Likes
          </label>
        </div>
      </div>

      <div className={searchType == "levelID" ? "hidden" : ""}>
        <h1 className="font-bold mb-2">Results Per Page</h1>
        <form className="flex justify-center border-1 border-[#E1E1EE] w-12 p-1 rounded-lg cursor-pointer">
          <select
            name="limits"
            id="limits"
            className="cursor-pointer"
            value={limit}
            onChange={(e) => handleLimitChange(e)}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="75">75</option>
          </select>
        </form>
      </div>
    </div>
  );
};

export default FilterBox;
