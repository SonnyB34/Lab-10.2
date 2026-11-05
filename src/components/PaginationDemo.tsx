import { usePagination } from '../hooks/usePagination';

// Pretend list of 123 items: ["Item 1", "Item 2", ...]
const ALL_ITEMS = Array.from({ length: 123 }, (_, i) => `Item ${i + 1}`);

import { useState } from "react";

export default function PaginationDemo() {
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    itemsOnCurrentPage,
    setPage,
    nextPage,
    prevPage,
    canNextPage,
    canPrevPage,
  } = usePagination({ totalItems: ALL_ITEMS.length, itemsPerPage });

  // slice's end is "up to but not including", so +1
  const visibleItems = ALL_ITEMS.slice(startIndex, endIndex + 1);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", padding: 16, border: "1px solid #888", borderRadius: 8 }}>
      <h2 style={{ textAlign: "center" }}>Pagination Demo</h2>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <label>
          Items per page:{" "}
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setPage(1); // go back to page 1 when the page size changes
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </label>
        <em>Total Items: {ALL_ITEMS.length}</em>
      </div>

      <ol start={startIndex + 1}>
        {visibleItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={prevPage} disabled={!canPrevPage}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={nextPage} disabled={!canNextPage}>Next</button>
      </div>

      <p style={{ textAlign: "center" }}>
        Showing items {startIndex + 1} - {endIndex + 1} (Total on this page: {itemsOnCurrentPage})
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
        {pageNumbers.map((n) => (
          <button
            key={n}
            onClick={() => setPage(n)}
            style={{
              background: n === currentPage ? "#1a73e8" : "transparent",
              color: n === currentPage ? "white" : "inherit",
              border: "1px solid #888",
              borderRadius: 4,
              padding: "4px 8px",
            }}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}