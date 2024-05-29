'use client';
import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

class ChartComponent extends PureComponent<any> {
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
          <XAxis dataKey="mongo_id" />
          <YAxis type="number" domain={['auto', 'auto']} />
          <Tooltip />
          <Area type="monotone" dataKey="total_transactions" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

export default ChartComponent;
