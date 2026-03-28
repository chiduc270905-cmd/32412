import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "./BottomNav";

export default function Layout() {
  const location = useLocation();
  // Hide bottom nav on specific pages if needed (e.g., room details)
  const hideBottomNav = location.pathname.startsWith("/room/");

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background font-body selection:bg-primary-container selection:text-on-primary-container">
      <main className="flex-1 flex flex-col relative w-full max-w-md mx-auto sm:max-w-2xl lg:max-w-4xl">
        <Outlet />
      </main>
      {!hideBottomNav && <BottomNav />}
    </div>
  );
}
