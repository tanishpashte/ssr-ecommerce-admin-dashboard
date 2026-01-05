"use client";
import AddProductForm from "./AddProductForm";
import DeleteButton from "./DeleteButton";
import { useRouter } from "next/navigation";
import EditProductForm from "./EditProductForm";

export default function DashboardClient({ products }) {
  const router = useRouter();

  function refresh() {
    router.refresh();
  }

  return (
    <>
      <AddProductForm onSuccess={refresh} />

      <ul>
        {products.map((p) => (
          <li key={p._id}>
            <EditProductForm product={p} onSuccess={refresh} />
            <DeleteButton id={p._id} onSuccess={refresh} />
          </li>
        ))}
      </ul>
    </>
  );
}
