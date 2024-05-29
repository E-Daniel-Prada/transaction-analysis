'use client';
import React, { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

class ChartComponent extends PureComponent<any> {
  render() {
    const { data } = this.props; // Obtener los datos del paginador
    
    return (
     

      <ResponsiveContainer width="100%" height={400}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="transaction_date" />
        <PolarRadiusAxis />
        <Radar name="Mike" dataKey="failed_transactions" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
    );
  }
}

export default ChartComponent;
