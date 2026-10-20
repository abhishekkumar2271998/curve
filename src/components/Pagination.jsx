const ELLIPSIS = '…';

function range(start, end) {
  const result = [];
  for (let i = start; i <= end; i++) result.push(i);
  return result;
}

function getPages(current, total, siblings) {
  const totalShown = siblings * 2 + 5;
  if (total <= totalShown) return range(1, total);

  const left = Math.max(current - siblings, 1);
  const right = Math.min(current + siblings, total);
  const showLeftDots = left > 2;
  const showRightDots = right < total - 1;

  if (!showLeftDots && showRightDots) {
    return [...range(1, 3 + siblings * 2), ELLIPSIS, total];
  }

  if (showLeftDots && !showRightDots) {
    return [1, ELLIPSIS, ...range(total - (2 + siblings * 2), total)];
  }

  return [1, ELLIPSIS, ...range(left, right), ELLIPSIS, total];
}

export default function Pagination({
  currentPage = 1,
  totalItems = 0,
  pageSize = 10,
  siblings = 1,
  onPageChange,
  pageSizeOptions = [10, 25, 50],
  onPageSizeChange,
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const pages = getPages(currentPage, totalPages, siblings);

  const goTo = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange?.(page);
  };

  const firstItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const lastItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <nav className="pagination" aria-label="Pagination">
      <span className="pagination-summary">
        {firstItem}–{lastItem} of {totalItems}
      </span>

      <button type="button" onClick={() => goTo(1)} disabled={currentPage === 1} aria-label="First page">
        «
      </button>
      <button type="button" onClick={() => goTo(currentPage - 1)} disabled={currentPage === 1} aria-label="Previous page">
        ‹
      </button>

      <ul className="pagination-pages">
        {pages.map((page, index) =>
          page === ELLIPSIS ? (
            <li key={`dots-${index}`} className="pagination-ellipsis">
              {ELLIPSIS}
            </li>
          ) : (
            <li key={page}>
              <button
                type="button"
                className={page === currentPage ? 'pagination-page active' : 'pagination-page'}
                aria-current={page === currentPage ? 'page' : undefined}
                onClick={() => goTo(page)}
              >
                {page}
              </button>
            </li>
          )
        )}
      </ul>

      <button type="button" onClick={() => goTo(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Next page">
        ›
      </button>
      <button type="button" onClick={() => goTo(totalPages)} disabled={currentPage === totalPages} aria-label="Last page">
        »
      </button>

      {onPageSizeChange && (
        <select value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))} aria-label="Items per page">
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>
      )}
    </nav>
  );
}
