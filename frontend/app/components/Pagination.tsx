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
    <div className="flex flex-row gap-3">
      <button
        onClick={() => setPage(page - 1 < 0 ? page : page - 1)}
        className={page === 1 ? "hidden" : ""}
      >
        Previous
      </button>
      <h1>{page}</h1>
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
