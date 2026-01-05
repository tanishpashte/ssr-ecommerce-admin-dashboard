"use client";
import StockChart from "./StockChart";

function Section({ title, children }) {
  return (
    <div className="neo-box p-6">
      <h2 className="text-2xl font-extrabold mb-4">{title}</h2>
      {children}
    </div>
  );
}

export default function DashboardClient({ products }) {
  return (
    <div className="space-y-10">
      {/* Overview Analytics */}
      <Section title="Stock Overview">
        <StockChart products={products} />
      </Section>

      <Section title="Quick Stats">
        <ul className="font-bold space-y-2">
          <li>Total Products: {products.length}</li>
          <li>
            Total Stock:{" "}
            {products.reduce((sum, p) => sum + p.stock, 0)}
          </li>
          <li>
            Low Stock Items:{" "}
            {products.filter((p) => p.stock < 10).length}
          </li>
        </ul>
      </Section>
    </div>
  );
}
