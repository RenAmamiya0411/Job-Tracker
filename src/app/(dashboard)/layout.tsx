import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Sidebar from "@/parts/Sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen bg-navy-base">
      <Sidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
