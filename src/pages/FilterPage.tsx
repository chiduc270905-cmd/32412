import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Users, User, UserRound, Calendar, Clock, WashingMachine, Waves, DoorClosed, CheckCircle2 } from "lucide-react";
import { cn } from "../lib/utils";

export default function FilterPage() {
  const navigate = useNavigate();
  const [availability, setAvailability] = useState("now");
  const [gender, setGender] = useState("any");
  const [term, setTerm] = useState("long");

  return (
    <div className="min-h-screen bg-surface pb-32">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-[#ffede4]/90 backdrop-blur-md">
        <div className="flex justify-between items-center px-6 h-16 w-full max-w-md mx-auto sm:max-w-2xl lg:max-w-4xl">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#ffd4b9]/40 transition-colors active:scale-95"
            >
              <X className="w-6 h-6 text-[#9b3f00]" />
            </button>
            <h1 className="font-headline font-bold tracking-tight text-[#9b3f00] text-xl">Advanced Filters</h1>
          </div>
          <button className="bg-primary-container text-on-primary-container px-6 py-2 rounded-full font-bold text-sm tracking-wide transition-all active:scale-95">
            Reset
          </button>
        </div>
      </header>

      <main className="pt-24 px-6 max-w-md mx-auto sm:max-w-2xl lg:max-w-4xl space-y-10">
        {/* Availability Section */}
        <section className="space-y-4">
          <h2 className="font-headline text-2xl font-extrabold tracking-tight text-on-background">Availability</h2>
          <div className="grid grid-cols-1 gap-3">
            <label className={cn(
              "flex items-center justify-between p-5 rounded-xl transition-all cursor-pointer group",
              availability === "now" ? "bg-surface-container border-2 border-primary" : "bg-surface-container-lowest hover:bg-surface-container-low border-2 border-transparent"
            )}>
              <div className="flex flex-col">
                <span className="font-bold text-lg">Available Now</span>
                <span className="text-sm text-on-surface-variant">Immediate move-in ready rooms</span>
              </div>
              <input 
                type="radio" 
                name="availability" 
                checked={availability === "now"}
                onChange={() => setAvailability("now")}
                className="w-6 h-6 text-primary focus:ring-primary-fixed border-outline-variant bg-surface" 
              />
            </label>
            <label className={cn(
              "flex items-center justify-between p-5 rounded-xl transition-all cursor-pointer group",
              availability === "soon" ? "bg-surface-container border-2 border-primary" : "bg-surface-container-lowest hover:bg-surface-container-low border-2 border-transparent"
            )}>
              <div className="flex flex-col">
                <span className="font-bold text-lg">Moving Out Soon</span>
                <span className="text-sm text-on-surface-variant">Available within the next 30 days</span>
              </div>
              <input 
                type="radio" 
                name="availability" 
                checked={availability === "soon"}
                onChange={() => setAvailability("soon")}
                className="w-6 h-6 text-primary focus:ring-primary-fixed border-outline-variant bg-surface" 
              />
            </label>
          </div>
        </section>

        {/* Roommate Preferences (Asymmetric Grid) */}
        <section className="space-y-4">
          <h2 className="font-headline text-2xl font-extrabold tracking-tight text-on-background">Roommate Preferences</h2>
          <div className="flex flex-wrap gap-3">
            {/* Chips Pattern */}
            <button 
              onClick={() => setGender("any")}
              className={cn(
                "px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all active:scale-95",
                gender === "any" ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-variant"
              )}
            >
              <Users className="w-5 h-5" /> Any Gender
            </button>
            <button 
              onClick={() => setGender("male")}
              className={cn(
                "px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all active:scale-95",
                gender === "male" ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-variant"
              )}
            >
              <User className="w-5 h-5" /> Male Only
            </button>
            <button 
              onClick={() => setGender("female")}
              className={cn(
                "px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all active:scale-95",
                gender === "female" ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-variant"
              )}
            >
              <UserRound className="w-5 h-5" /> Female Only
            </button>
          </div>

          <div className="bg-surface-container-low p-6 rounded-xl space-y-6 mt-6">
            <ToggleRow title="Quiet Environment" subtitle="Strict no-party rules" defaultChecked />
            <ToggleRow title="Social & Friendly" subtitle="Likely to hang out in common areas" />
          </div>
        </section>

        {/* Lease Term */}
        <section className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h2 className="font-headline text-2xl font-extrabold tracking-tight text-on-background">Lease Term</h2>
            <span className="text-primary font-bold text-sm">Flexible Options</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div 
              onClick={() => setTerm("long")}
              className={cn(
                "p-6 rounded-xl flex flex-col items-center text-center gap-2 relative overflow-hidden cursor-pointer transition-all",
                term === "long" ? "bg-white border-2 border-primary-container" : "bg-surface-container-low hover:bg-surface-container border-2 border-transparent"
              )}
            >
              {term === "long" && (
                <div className="absolute top-0 right-0 bg-primary text-on-primary text-[10px] px-3 py-1 font-bold uppercase tracking-tighter rounded-bl-lg">Popular</div>
              )}
              <Calendar className={cn("w-8 h-8", term === "long" ? "text-primary" : "text-on-surface-variant")} />
              <span className="font-bold text-lg leading-tight">Long-term</span>
              <span className="text-xs text-on-surface-variant">12+ Months</span>
            </div>
            <div 
              onClick={() => setTerm("short")}
              className={cn(
                "p-6 rounded-xl flex flex-col items-center text-center gap-2 relative overflow-hidden cursor-pointer transition-all",
                term === "short" ? "bg-white border-2 border-primary-container" : "bg-surface-container-low hover:bg-surface-container border-2 border-transparent"
              )}
            >
              <Clock className={cn("w-8 h-8", term === "short" ? "text-primary" : "text-on-surface-variant")} />
              <span className="font-bold text-lg leading-tight">Short-term</span>
              <span className="text-xs text-on-surface-variant">3-6 Months</span>
            </div>
          </div>
        </section>

        {/* Specific Amenities (Bento-style Grid) */}
        <section className="space-y-4">
          <h2 className="font-headline text-2xl font-extrabold tracking-tight text-on-background">Specific Amenities</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-1 bg-surface-container-highest p-5 rounded-xl flex flex-col justify-between min-h-[140px] group cursor-pointer hover:bg-primary transition-all">
              <WashingMachine className="w-8 h-8 text-primary group-hover:text-on-primary transition-colors" />
              <p className="font-bold text-lg group-hover:text-on-primary transition-colors">Free Laundry</p>
            </div>
            <div className="col-span-1 bg-secondary-container p-5 rounded-xl flex flex-col justify-between min-h-[140px] group cursor-pointer hover:bg-secondary transition-all">
              <Waves className="w-8 h-8 text-secondary group-hover:text-on-secondary transition-colors" />
              <p className="font-bold text-lg group-hover:text-on-secondary transition-colors">Balcony</p>
            </div>
            <div className="col-span-2 bg-surface-container p-5 rounded-xl flex items-center justify-between group cursor-pointer hover:bg-primary transition-all">
              <div className="flex items-center gap-4">
                <DoorClosed className="w-8 h-8 text-primary group-hover:text-on-primary transition-colors" />
                <p className="font-bold text-lg group-hover:text-on-primary transition-colors">Private Room</p>
              </div>
              <CheckCircle2 className="w-6 h-6 text-on-surface-variant group-hover:text-on-primary transition-colors" />
            </div>
          </div>
        </section>

        {/* Apply Button Floating Area */}
        <div className="fixed bottom-6 left-0 w-full px-6 flex justify-center pointer-events-none z-50">
          <button 
            onClick={() => navigate(-1)}
            className="pointer-events-auto bg-gradient-to-br from-primary to-primary-container text-on-primary w-full max-w-md py-5 rounded-full font-bold text-lg shadow-xl hover:scale-[0.98] transition-transform active:scale-95 flex items-center justify-center gap-3"
          >
            Show 142 Results
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </main>
    </div>
  );
}

function ToggleRow({ title, subtitle, defaultChecked = false }: { title: string, subtitle: string, defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);
  
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-bold text-lg">{title}</p>
        <p className="text-sm text-on-surface-variant">{subtitle}</p>
      </div>
      <button 
        onClick={() => setChecked(!checked)}
        className={cn(
          "relative inline-flex h-8 w-14 items-center rounded-full transition-colors",
          checked ? "bg-primary" : "bg-outline-variant/30"
        )}
      >
        <span 
          className={cn(
            "inline-block h-6 w-6 transform rounded-full bg-white transition-transform",
            checked ? "translate-x-7" : "translate-x-1"
          )}
        />
      </button>
    </div>
  );
}
