"use client";
import { useState } from "react";
import { productSchema } from "@/app/lib/productSchema";

export default function EditProductForm({ product, onSuccess }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(product);

  async function handleSubmit() {
    productSchema.parse({
      name: form.name,
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
    });

    await fetch("/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      }),
    });

    onSuccess();
  }

  return (
    <>
      {step === 1 && (
        <>
          <input value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <button onClick={() => setStep(2)}>Next</button>
        </>
      )}

      {step === 2 && (
        <>
          <input value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <input value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })} />
          <button onClick={handleSubmit}>Save</button>
        </>
      )}
    </>
  );
}
