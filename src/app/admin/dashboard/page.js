import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "./LogoutButton";
import { connectDB } from "@/app/lib/db";
import Product from "@/app/models/Product";
import DashboardClient from "./DashboardClient";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/admin/login");
  }

  await connectDB();
  const products = await Product.find().lean();
//   console.log(products)

 return (
  <div className="max-w-7xl mx-auto space-y-10">
    {/* Header */}
    <div className="flex justify-between items-center">
      <h1 className="text-4xl font-extrabold">Dashboard</h1>
      <LogoutButton />
    </div>

    {/* Main dashboard content */}
    <DashboardClient
      products={products.map((p) => ({
        ...p,
        _id: p._id.toString(),
      }))}
    />
  </div>
);
 

}
