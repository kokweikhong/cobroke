import { cn } from "@/lib/utils";

const Sidebar = () => {
  return (
    <aside
      className={cn("fixed inset-y-0 left-0 w-64", "z-50 hidden lg:block")}
    >
      <div className="h-24 flex items-center justify-center text-2xl font-bold bg-white dark:bg-gray-800 dark:text-white">
        COBROKE SYSTEM
      </div>

      <div
        className={cn(
          "h-full p-4 rounded-xl shadow-xl",
          "bg-white dark:bg-gray-800 dark:text-white",
          "mx-4 mt-12"
        )}
      >
        <h2>Sidebar</h2>
        <p>Some text about the sidebar</p>
      </div>
    </aside>
  );
};

export default Sidebar;
