import { cn } from "@/lib/utils";
import UserBadge from "./user-badge";

const Navbar = () => {
  return (
    <nav
      className={cn(
        "flex justify-end items-center h-16 text-black relative font-mono",
        "sticky top-0 z-40 w-full",
        "px-4"
      )}
    >
      <ul>
        <li>
          <UserBadge />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
