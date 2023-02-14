import { useState } from 'react';

const ITEMS_PER_PAGE = 10;

export default function usePagination(items) {
  const [start, setStart] = useState(0);

  const currentPage = 1 + start / ITEMS_PER_PAGE;
  const startOffset = currentPage === 1 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE;
  const endOffset = startOffset + ITEMS_PER_PAGE;
  const currentItems = items.slice(startOffset, endOffset);
  const pageCount = Math.ceil(items.length / ITEMS_PER_PAGE);

  const goBackward = () => {
    if (currentPage - 1 > 0) {
      setStart((current) => current - ITEMS_PER_PAGE);
    }
  };

  const goForward = () => {
    if (pageCount > currentPage) {
      setStart((current) => current + ITEMS_PER_PAGE);
    }
  };

  return { currentItems, currentPage, pageCount, goBackward, goForward };
}
