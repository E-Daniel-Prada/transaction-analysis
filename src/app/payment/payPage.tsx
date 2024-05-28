"use client";

import React, { useState, useEffect } from "react";
import { FaCreditCard } from "react-icons/fa";
import Style from "./PayLayout.module.sass";
import ChartComponent from "./chart";
import Paginator from "app/components/shared/Paginator"; 

interface Payment {
    new_primary_id: string
    Transaction_id: string
    secondary_id: string
    primary_id: string
    Inconsistency_description: string
    collector: string
    Collector_1: string
    Payer: string
    sizeRefundsGtw: number
    idRefundGtw: number
    AmountRefundGtw: number
    StatustRefundGtw: string
    transaction_amount: number
    amount: number
    Site: string
    currency: string
    USD_Amount: string
    Payment_type: string
    Payment_method: string
    Profile_id: string
    captured: boolean
    binary_mode: boolean
    product: string
    business_sub_unit: string
    dateCreatedPay: string
}

interface PagePayProps {
  data?: Payment[];
  userSecondaryId?: string; 
}

export default function PayPage(props: PagePayProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const paymentsPerPage = 10; 

  
  let userPayments = props.data;
  if (props.userSecondaryId) {
    userPayments = props.data?.filter(payment => payment.secondary_id === props.userSecondaryId);
  }
  
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
          {currentPayments?.map((payment: Payment) => ( 
            <li
              className={Style.payLayout__chip}
              key={payment.new_primary_id}
            >
              <div className={Style.payLayout__content_batch}>
                <strong>Site: {payment.Site}</strong>
                <span className={Style.divider} />
                <span>
                  <FaCreditCard /> Payment Type: {payment.Payment_type}{" "}
                </span>
                <span className={Style.divider} />
                <span>
                  ${payment.amount} -{" "}
                  {new Date(payment.dateCreatedPay).toLocaleDateString()}
                </span>
                <span className={Style.payLayout__batch}>
                  {payment.StatustRefundGtw}{" "}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <Paginator
          totalItems={userPayments?.length || 0} 
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
      <div className={Style.contentChart}>
        <ChartComponent data={currentPayments || []} /> {/* Pasa los datos correspondientes a la página actual */}
      </div>
    </div>
  );
}
