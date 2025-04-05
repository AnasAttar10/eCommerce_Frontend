import { useState } from 'react';

const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return { currentPage, handlePageChange };
};

export default usePagination;
