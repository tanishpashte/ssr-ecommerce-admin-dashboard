import Link from "next/link";
export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-yellow-300 border-r-4 border-black p-6">
        <h2 className="text-2xl font-extrabold mb-6">Admin</h2>
       <nav className="space-y-4 font-bold">
          <Link
            href="/admin/dashboard"
            className="block neo-box p-2 hover:bg-white"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/products"
            className="block neo-box p-2 hover:bg-white"
          >
            Products
          </Link>

          <Link
            href="/admin/analytics"
            className="block neo-box p-2 hover:bg-white"
          >
            Analytics
          </Link>
        </nav> 
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 bg-[#fefefe]">{children}</main>
    </div>
  );
}
