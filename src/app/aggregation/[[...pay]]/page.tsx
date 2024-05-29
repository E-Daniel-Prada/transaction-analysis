import data from "../mockdata";
import React, { useState } from 'react';
import Style from '../PayLayout.module.sass';
import PayPage from "../payPage";
import { validateAccessToken } from "app/utils/auth/validateAccessToken"; 
import { getAggregated } from "app/services/postgres/queries";
export const dynamic = 'force-dynamic';
import { getPayments } from "app/services/postgres/consulta";

interface CategoryProps {
  searchParams?: string;
}

export default async function Category(props: CategoryProps) {
  const customer = await validateAccessToken();
  const dataPayment = await getPayments(getAggregated);
  
  let dataParams = data

  if (dataPayment) {
    dataParams = dataPayment
  }
  
  return (
    <div className={Style.payLayout}>
      <h1>Payments</h1>
      <PayPage data={dataParams} userSecondaryId={customer?.secondary_id} />
    </div>
  );
}
