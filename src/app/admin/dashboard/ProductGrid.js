"use client";

import EditProductForm from "./EditProductForm";
import DeleteButton from "./DeleteButton";

export default function ProductGrid({ products, onRefresh }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <div key={p._id} className="neo-box p-4">
          {p.imageUrl ? (
            <img
              src={p.imageUrl}
              alt={p.name}
              className="w-full h-40 object-cover border-4 border-black mb-3"
            />
          ) : (
            <div className="w-full h-40 border-4 border-black flex items-center justify-center font-bold mb-3">
              No Image
            </div>
          )}

          <h3 className="text-xl font-extrabold">{p.name}</h3>
          <p className="font-bold">Category: {p.category}</p>
          <p className="font-bold">₹{p.price}</p>
          <p className="font-bold mb-3">Stock: {p.stock}</p>

          <div className="flex gap-2">
            <EditProductForm product={p} onSuccess={onRefresh} />
            <DeleteButton id={p._id} onSuccess={onRefresh} />
          </div>
        </div>
      ))}
    </div>
  );
}
