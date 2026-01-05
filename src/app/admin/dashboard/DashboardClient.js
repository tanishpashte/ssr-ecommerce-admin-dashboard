"use client";

import useSWR from "swr";
import StockChart from "./StockChart";

const fetcher = (url) => fetch(url).then((res) => res.json());

function Section({ title, children }) {
  return (
    <div className="neo-box p-6">
      <h2 className="text-2xl font-extrabold mb-4">{title}</h2>
      {children}
    </div>
  );
}

export default function DashboardClient({ products }) {
  const { data: swrProducts } = useSWR(
    "/api/products",
    fetcher,
    { fallbackData: products }
  );

  return (
    <div className="space-y-10">
      <Section title="Stock Overview">
        <StockChart products={swrProducts} />
      </Section>

      <Section title="Quick Stats">
        <ul className="font-bold space-y-2">
          <li>Total Products: {swrProducts.length}</li>
          <li>
            Total Stock:{" "}
            {swrProducts.reduce((sum, p) => sum + p.stock, 0)}
          </li>
          <li>
            Low Stock Items:{" "}
            {swrProducts.filter((p) => p.stock < 10).length}
          </li>
        </ul>
      </Section>
    </div>
  );
}
