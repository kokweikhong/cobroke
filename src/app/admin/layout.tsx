import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-200 h-full min-h-screen">
      <Sidebar />
      <div className={cn("lg:ml-72 lg:mr-8 lg:py-4")}>
        <Navbar />
      </div>
      <main className={cn("lg:ml-64", "pt-8 pb-8 px-4")}>
        <div className="m-4 p-4 bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow-xl min-h-[300px]">
          {children}
        </div>
      </main>
    </div>
  );
}
