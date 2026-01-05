"use client";

import EditProductForm from "./EditProductForm";
import DeleteButton from "./DeleteButton";

export default function ProductTable({ products, onRefresh }) {
  return (
    <div className="neo-box neo-shadow overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-black text-white">
          <tr>
            <th className="border-4 border-black p-3 text-left">Image</th>
            <th className="border-4 border-black p-3 text-left">Name</th>
            <th className="border-4 border-black p-3 text-left">Category</th>
            <th className="border-4 border-black p-3 text-left">Price</th>
            <th className="border-4 border-black p-3 text-left">Stock</th>
            <th className="border-4 border-black p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="bg-white">
              <td className="border-4 border-black p-3">
                {p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-16 h-16 object-cover border-4 border-black"
                  />
                ) : (
                  <div className="w-16 h-16 border-4 border-black flex items-center justify-center text-xs font-bold">
                    No Image
                  </div>
                )}
              </td>

              <td className="border-4 border-black p-3 font-bold">
                {p.name}
              </td>

              <td className="border-4 border-black p-3">
                {p.category}
              </td>

              <td className="border-4 border-black p-3">
                ₹{p.price}
              </td>

              <td className="border-4 border-black p-3">
                {p.stock}
              </td>

              <td className="border-4 border-black p-3 space-x-2">
                <EditProductForm product={p} onSuccess={onRefresh} />
                <DeleteButton id={p._id} onSuccess={onRefresh} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
