"use client";

import { useState } from "react";
import useSWR from "swr";

import AddProductForm from "../dashboard/AddProductForm";
import ProductTable from "../dashboard/ProductTable";
import ProductGrid from "../dashboard/ProductGrid";

const fetcher = (url) => fetch(url).then((res) => res.json());

function Section({ title, children }) {
  return (
    <div className="neo-box p-6">
      <h2 className="text-2xl font-extrabold mb-4">{title}</h2>
      {children}
    </div>
  );
}

export default function ProductsClient({ products }) {
  const [view, setView] = useState("table");
  const [showForm, setShowForm] = useState(false);

  const { data: swrProducts, mutate } = useSWR(
    "/api/products",
    fetcher,
    { fallbackData: products }
  );

  function refresh() {
    mutate();
  }

  return (
    <div className="space-y-10">
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

      <Section title="Products">
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

        {swrProducts.length === 0 ? (
          <div className="neo-box p-6 font-bold text-center">
            No products yet. Add your first product above.
          </div>
        ) : view === "table" ? (
          <ProductTable products={swrProducts} onRefresh={refresh} />
        ) : (
          <ProductGrid products={swrProducts} onRefresh={refresh} />
        )}
      </Section>
    </div>
  );
}
