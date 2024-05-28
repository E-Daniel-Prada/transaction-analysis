'use client';

import React from 'react';
import styles from './paginator.module.sass';

interface PaginatorProps {
  totalItems: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({ totalItems, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / 10); // Suponiendo 10 elementos por página

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.paginator}>
      <button className={styles.button} onClick={handlePreviousClick} disabled={currentPage === 1}>
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button className={styles.button} onClick={handleNextClick} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Paginator;

