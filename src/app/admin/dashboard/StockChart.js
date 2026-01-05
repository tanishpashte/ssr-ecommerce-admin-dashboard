"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function StockChart({ products }) {
  const data = products.map((p) => ({
    name: p.name,
    stock: p.stock,
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3>Product Stock Overview</h3>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="stock" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
