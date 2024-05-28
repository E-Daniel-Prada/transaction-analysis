import { getPayments } from "app/services/mongo/consulta";
import data from "../mockdata";
import React, { useState } from 'react';
import Style from '../PayLayout.module.sass';
import PayPage from "../payPage";
import { validateAccessToken } from "app/utils/auth/validateAccessToken";

export const dynamic = 'force-dynamic';

interface CategoryProps {
  searchParams?: string;
}

export default async function Category(props: CategoryProps) {
  const customer = await validateAccessToken();

  return (
    <div className={Style.payLayout}>
      <h1>Payments</h1>
      <PayPage data={data} userSecondaryId={customer?.secondary_id} />
    </div>
  );
}
