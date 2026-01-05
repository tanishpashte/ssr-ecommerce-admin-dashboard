"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AddProductForm from "../dashboard/AddProductForm";
import ProductTable from "../dashboard/ProductTable";
import ProductGrid from "../dashboard/ProductGrid";

function Section({ title, children }) {
  return (
    <div className="neo-box p-6">
      <h2 className="text-2xl font-extrabold mb-4">{title}</h2>
      {children}
    </div>
  );
}

export default function ProductsClient({ products }) {
  const router = useRouter();
  const [view, setView] = useState("table"); // "table" | "grid"
  const [showForm, setShowForm] = useState(false);


  function refresh() {
    router.refresh();
  }

  return (
    <div className="space-y-10">
      {/* Add Product */}
      <Section title="Add Product">
  {!showForm && (
    <button
      onClick={() => setShowForm(true)}
      className="neo-button bg-green-300"
    >
      + Add New Product
    </button>
  )}

  {showForm && (
    <div className="mt-4 space-y-4">
      <AddProductForm
        onSuccess={() => {
          refresh();
          setShowForm(false);
        }}
      />

      <button
        onClick={() => setShowForm(false)}
        className="neo-button bg-gray-200"
      >
        Cancel
      </button>
    </div>
  )}
</Section>


      {/* Products */}
      <Section title="Products">
        {/* View Toggle */}
        <div className="flex gap-4 mb-6">
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

        {/* Conditional Rendering */}
        {products.length === 0 ? (
          <div className="neo-box p-6 font-bold text-center">
            No products yet. Add your first product above.
          </div>
        ) : view === "table" ? (
          <ProductTable products={products} onRefresh={refresh} />
        ) : (
          <ProductGrid products={products} onRefresh={refresh} />
        )}
      </Section>
    </div>
  );
}
