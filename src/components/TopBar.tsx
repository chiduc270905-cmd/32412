import { ReactNode } from "react";
import { SlidersHorizontal, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  rightAction?: ReactNode;
}

export default function TopBar({ title = "RoomFinder", showBack = false, rightAction }: TopBarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="w-full top-0 sticky z-50 bg-[#fff4ef]/80 backdrop-blur-md flex justify-between items-center px-6 py-4">
      <div className="flex items-center gap-3">
        {showBack ? (
          <button
            onClick={() => navigate(-1)}
            className="text-[#9b3f00] hover:bg-[#ffd4b9]/40 transition-colors p-2 -ml-2 rounded-full active:scale-95 duration-200 ease-in-out"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="font-headline font-black text-primary text-lg italic">R</span>
          </div>
        )}
        <h1 className="font-headline font-bold tracking-tight text-xl text-[#9b3f00] italic">
          {title}
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        {rightAction ? (
          rightAction
        ) : (
          <>
            {location.pathname === "/" && (
              <button onClick={() => navigate("/filters")} className="text-[#4a2506] hover:opacity-80 transition-opacity active:scale-95 duration-200">
                <SlidersHorizontal className="w-6 h-6" />
              </button>
            )}
            <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border-2 border-primary-container">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuTRb4D1-O_u9jwzpfzQyZ7bNvwHci1DLxKNfwz4dowdXdCP_PwC20RqihkSA2EdwJwdPCwYDDhSA6U5BuMVXn5bDRQQoxwWVPrbkjRtVsxxYDpJqujWnczWEUuUIs1WQWci-eMbKpZVE-VNFsX8Qq5c8iWNyyCQVdhvajFqm50R-17balgRq9Z_-hA5hNiWOljCQYmilh3cR1qeBXMAFMDc0WaTDKffTG3aF0MZtP_6sARezANbBoDbjSt55IglezX0a-SqMky3KH"
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </>
        )}
      </div>
    </header>
  );
}
