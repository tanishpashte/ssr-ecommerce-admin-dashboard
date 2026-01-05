"use client";

import useSWR from "swr";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function AnalyticsClient({ products }) {
  const { data: swrProducts } = useSWR(
    "/api/products",
    fetcher,
    { fallbackData: products }
  );

  const categoryData = Object.values(
    swrProducts.reduce((acc, p) => {
      acc[p.category] = acc[p.category] || {
        category: p.category,
        count: 0,
      };
      acc[p.category].count += 1;
      return acc;
    }, {})
  );

  const stockByCategory = Object.values(
    swrProducts.reduce((acc, p) => {
      acc[p.category] = acc[p.category] || {
        name: p.category,
        value: 0,
      };
      acc[p.category].value += p.stock;
      return acc;
    }, {})
  );

  const lowStock = swrProducts.filter((p) => p.stock < 10);

  const COLORS = ["#fde047", "#86efac", "#93c5fd", "#fca5a5"];
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    name,
    value,
  }) => {
    const radius = outerRadius + 20;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontWeight="bold"
      >
        {name} ({value})
      </text>
    );
  };

  return (
    <div className="space-y-10">
      <div className="neo-box p-6">
        <h2 className="text-2xl font-extrabold mb-4">
          Products by Category
        </h2>
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={categoryData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#000" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="neo-box p-6">
        <h2 className="text-2xl font-extrabold mb-4">
          Stock Distribution by Category
        </h2>
        <div className="h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={stockByCategory}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label={renderCustomizedLabel}
                labelLine={true}
              >
                {stockByCategory.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="neo-box p-6">
        <h2 className="text-2xl font-extrabold mb-4">
          Low Stock Products (&lt; 10)
        </h2>
        {lowStock.length === 0 ? (
          <p className="font-bold">No low stock products 🎉</p>
        ) : (
          <ul className="font-bold space-y-2">
            {lowStock.map((p) => (
              <li key={p._id}>
                {p.name} — Stock: {p.stock}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
