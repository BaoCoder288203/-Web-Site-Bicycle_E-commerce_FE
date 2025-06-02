import React from 'react';
import { Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MonthlyStatsDataPoint {
  name: string;
  profit: number;
  revenue: number;
  expenses: number;
}

interface MonthlyStatisticsProps {
  data: MonthlyStatsDataPoint[];
}

const MonthlyStatistics: React.FC<MonthlyStatisticsProps> = ({ data }) => {
  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip />
          <Bar dataKey="profit" fill="#FFD700" radius={[4, 4, 0, 0]} />
          <Bar dataKey="revenue" fill="#2196F3" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expenses" fill="#4CAF50" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MonthlyStatistics;
