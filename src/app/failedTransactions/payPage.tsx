"use client";

import React, { useState, useEffect } from "react";
import { FaCalendarDay } from "react-icons/fa";
import Style from "./PayLayout.module.sass";
import ChartComponent from "./chart";
import Paginator from "app/components/shared/Paginator";


interface PagePayProps {
  data?: any;
  userSecondaryId?: string;
}

export default function PayPage(props: PagePayProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const paymentsPerPage = 10;

  let userPayments = props.data;

  const startIndex = (currentPage - 1) * paymentsPerPage;
  const endIndex = startIndex + paymentsPerPage;
  const currentPayments = userPayments?.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={Style.payLayout__content}>
      <div>
        <ul className={Style.payLayout__list}>
          {currentPayments?.map((payment: any, index: number) => (
            <li className={Style.payLayout__chip} key={index.toString()}>
              <div className={Style.payLayout__content_batch}>
                <span>
                  <FaCalendarDay /> Fecha de la transacción: {payment.transaction_date.toLocaleDateString()}{" "}
                </span>
                <span className={Style.divider} />
                <span>Transacciones fallidas: {payment.failed_transactions}</span>
              </div>
            </li>
          ))}
        </ul>
        {userPayments?.length > 10 && (
          <Paginator
            totalItems={userPayments?.length || 0}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      <div className={Style.contentChart}>
        <ChartComponent data={currentPayments || []} />{" "}
        {/* Pasa los datos correspondientes a la página actual */}
      </div>
    </div>
  );
}
