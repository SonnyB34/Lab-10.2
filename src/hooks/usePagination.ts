import { useState } from 'react';

interface UsePaginationProps {
    totalItems: number;
    itemsPerPage?: number;
    initialPage?: number;
}

export function usePagination ({
    totalItems,
    itemsPerPage = 10,
    initialPage = 1,
}: UsePaginationProps) {
    
    const [page, setPageState] = useState(initialPage);

    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

    // Keep the page between 1 and totalPages, always
    const currentPage = Math.min(Math.max(page, 1), totalPages);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const itemsOnCurrentPage = Math.max(0, Math.min(itemsPerPage, totalItems - startIndex));

    const endIndex = startIndex + itemsOnCurrentPage - 1;

    const setPage = (pageNumber: number) => {
        setPageState(Math.min(Math.max(pageNumber, 1), totalPages));
    };

    const nextPage = () => setPage(currentPage + 1);
    const prevPage = () => setPage(currentPage - 1);

    const canNextPage = currentPage < totalPages;
    const canPrevPage = currentPage > 1;

    return {
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
    };

}