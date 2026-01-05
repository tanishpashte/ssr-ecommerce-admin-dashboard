"use client";
import AddProductForm from "./AddProductForm";
import DeleteButton from "./DeleteButton";
import { useRouter } from "next/navigation";
import EditProductForm from "./EditProductForm";
import StockChart from "./StockChart";
import ProductTable from "./ProductTable";

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

  function refresh() {
    router.refresh();
  }

  return (
    <div className="neo-box p-6">
      <Section title="Add Product">
        <AddProductForm onSuccess={refresh} />
      </Section>

      <Section title="Products">
        <ProductTable products={products} onRefresh={refresh} />
      </Section>

      <Section title="Stock Overview">
        <StockChart products={products} />
      </Section>


    </div>
  );
}
