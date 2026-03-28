import { Link, useLocation } from "react-router-dom";
import { Layers, Search, Heart, User } from "lucide-react";
import { cn } from "../lib/utils";

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Layers, label: "Swipe" },
    { path: "/filters", icon: Search, label: "Search" },
    { path: "/matches", icon: Heart, label: "Likes" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-[#fff4ef]/90 backdrop-blur-xl rounded-t-[3rem] shadow-[0_-4px_40px_rgba(74,37,6,0.06)] border-t-[0.5px] border-[#dba177]/15">
      <div className="w-full max-w-md mx-auto sm:max-w-2xl lg:max-w-4xl flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center px-5 py-2 transition-all duration-200 active:scale-90 cursor-pointer",
                isActive
                  ? "bg-[#ffd4b9] text-[#9b3f00] rounded-full scale-110"
                  : "text-[#4a2506]/60 hover:text-[#9b3f00]"
              )}
            >
              <Icon
                className={cn("w-6 h-6 mb-1", isActive && "fill-current")}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className="font-headline text-[10px] font-semibold uppercase tracking-widest">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
