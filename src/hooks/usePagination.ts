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
    
}