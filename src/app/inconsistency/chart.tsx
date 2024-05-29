"use client";
import React, { PureComponent } from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

class ChartComponent extends PureComponent<any> {
  render() {
    const { data } = this.props; // Obtener los datos del paginador

    return (
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="status" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_transactions" barSize={20} fill="#413ea0" />
          <Line
            type="monotone"
            dataKey="total_transactions"
            stroke="#ff7300"
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}

export default ChartComponent;
