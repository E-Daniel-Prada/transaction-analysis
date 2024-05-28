'use client';
import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartComponentProps {
  data: {
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
  }[]; // Definición de tipo para la propiedad data
}

class ChartComponent extends PureComponent<ChartComponentProps> {
  render() {
    const { data } = this.props; // Obtener los datos del paginador
    
    return (
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dateCreatedPay" />
          <YAxis type="number" domain={['auto', 'auto']} />
          <Tooltip />
          <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

export default ChartComponent;
