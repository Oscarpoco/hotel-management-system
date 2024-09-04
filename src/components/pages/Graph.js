import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Jan', value: 40 },
  { name: 'Feb', value: 30 },
  { name: 'Mar', value: 20 },
  { name: 'Apr', value: 27 },
  { name: 'May', value: 18 },
  { name: 'Jun', value: 23 },
  { name: 'Aug', value: 34 },
  { name: 'Sep', value: 34 },
  { name: 'Oct', value: 39 },
  { name: 'Nov', value: 46 },
  { name: 'Dec', value: 190 },
];

const SimpleBarChart = () => (
  <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <BarChart width={800} height={350} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis label={{ value: 'Bookings', angle: -90, position: 'insideLeft', dx: -4 }}/>
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#1877F2" />
    </BarChart>
  </div>
);

export default SimpleBarChart;
