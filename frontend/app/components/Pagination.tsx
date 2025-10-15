/**
 * Pagination.tsx
 *
 * A component that builds a page selector
 */

const Pagination = ({
  page,
  totalPages,
  setPage,
}: {
  page: number;
  totalPages: number;
  setPage: Function;
}) => {
  return (
    <div className="flex flex-row gap-3 p-3 border-1 border-[#E1E1EE] text-[#4B5563] font-semibold tracking-tight rounded-3xl">
      <button
        onClick={() => setPage(page - 1 < 0 ? page : page - 1)}
        className={page === 1 ? "hidden" : ""}
      >
        Previous
      </button>
      {page}
      <button
        onClick={() => setPage(page + 1 > totalPages ? page : page + 1)}
        className={page === totalPages ? "hidden" : ""}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
