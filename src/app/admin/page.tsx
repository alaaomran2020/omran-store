import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata = {
  title: "لوحة إدارة المنتجات | شركة عمران التجارية",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
