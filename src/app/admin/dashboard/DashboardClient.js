"use client";
import AddProductForm from "./AddProductForm";
import DeleteButton from "./DeleteButton";
import { useRouter } from "next/navigation";
import EditProductForm from "./EditProductForm";
import StockChart from "./StockChart";
import ProductTable from "./ProductTable";
import { useState } from "react";
import ProductGrid from "./ProductGrid";

function Section({ title, children }) {
  return (
    <div className="neo-box p-6">
      <h2 className="text-2xl font-extrabold mb-4">{title}</h2>
      {children}
    </div>
  );
}


export default function DashboardClient({ products }) {
  const router = useRouter();
  const [view, setView] = useState("table");

  function refresh() {
    router.refresh();
  }

  return (
    <div className="neo-box p-6">
      <Section title="Add Product">
        <AddProductForm onSuccess={refresh} />
      </Section>

      <Section title="Products">
  {/* View Toggle */}
  <div className="flex gap-4 mb-4">
    <button
      onClick={() => setView("table")}
      className={`neo-button ${
        view === "table" ? "bg-black text-white" : "bg-white"
      }`}
    >
      Table View
    </button>

    <button
      onClick={() => setView("grid")}
      className={`neo-button ${
        view === "grid" ? "bg-black text-white" : "bg-white"
      }`}
    >
      Grid View
    </button>
  </div>

  {/* Conditional View */}
  {view === "table" ? (
    <ProductTable products={products} onRefresh={refresh} />
  ) : (
    <ProductGrid products={products} onRefresh={refresh} />
  )}
</Section>


      <Section title="Stock Overview">
        <StockChart products={products} />
      </Section>


    </div>
  );
}
