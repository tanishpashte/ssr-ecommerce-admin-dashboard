import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/app/lib/db";
import Product from "@/app/models/Product";
import ProductsClient from "./ProductsClient";

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    redirect("/admin/login");
  }

  await connectDB();
  const products = await Product.find().lean();

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <h1 className="text-4xl font-extrabold text-white mt-4">Products</h1>

      <ProductsClient
        products={products.map((p) => ({
          ...p,
          _id: p._id.toString(),
        }))}
      />
    </div>
  );
}
