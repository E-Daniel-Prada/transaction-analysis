"use client";
import React, { PureComponent } from "react";
import { BarChart, Bar, ResponsiveContainer } from "recharts";

class ChartComponent extends PureComponent<any> {
  render() {
    const { data } = this.props;

    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart width={150} height={40} data={data}>
          <Bar dataKey="total_amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default ChartComponent;
