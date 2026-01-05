import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "./LogoutButton";
import { connectDB } from "@/app/lib/db";
import Product from "@/app/models/Product";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/admin/login");
  }

  await connectDB();
  const products = await Product.find().lean();
//   console.log(products)

  return (
    <>
      <h1>Admin Dashboard</h1>
      <LogoutButton />

      <h2>Products</h2>
      
      <ul>
        {products.map((p) => (
          <li key={p._id.toString()}>
            {p.name} — ₹{p.price} — Stock: {p.stock}
          </li>
        ))}
      </ul>
    </>
  );
}
