import { Link } from "react-router-dom";
import { MessageCircle, MapPin, ShieldCheck } from "lucide-react";
import TopBar from "../components/TopBar";

const MATCHES = [
  {
    id: 1,
    name: "The Sun-Drenched Loft",
    price: "2.8M",
    location: "0.4 miles from Campus",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuXkkuafU2lE8zaQArFaCLQGoWehfeCkGa1nErWq-UQiR8xmpqTSi9jHjwR5KCIEdYHKTxe2YQ2zORygTiQXKJInExtxoNmN4fhSJE-pnOJfosfmQ1ShxDLoRI-yHVhHS_swM15tkKTSBh_s6YWLPqg_6Y6jjKBeaZUdlWnCwZnuqphV24aMGrkELIZgO97dl8iqHluvOGMlZhpYc8lTpLwMgquryyC1eP3lCp2MtJuWTstPUSnPwkROK8DXJSFCXonL40pJu3wFNR",
    verified: true,
  },
  {
    id: 2,
    name: "Industrial Brick Suite",
    price: "1.9M",
    location: "1.2 miles from Campus",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-KhTguprxcTHGz-PnmLSyI70d8lMBnKVjXrWMFpr9NRi7k97X6wG4GXt2BN_kCG-eiXThTmmSxp-kowkyj65lpdXk1DZbmSGqioNtaOu-krD6TxdpH1G2dep1Eg-i6oM0TASdsQ0SMvjK6_GBDEjnb-3KlBS4qMUb7nQrtxC_UesIQN_DEojUfM8HiNJ4oSktqCWCytbP5MeI5qCiYmCAoZV8HLvPkGK8lKMINa5DoRe2Nu9SB_62m_PMSIxLeSkI6TLO6C9_Ddws",
    verified: false,
  },
  {
    id: 3,
    name: "Nordic Minimalist Room",
    price: "2.4M",
    location: "0.8 miles from Campus",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOjOyjgM2cpxKDkj6bskU_9AuyOJm1LNSlIcqpvAr6NU1BMI7o-lrAYxVHGHiImbpAO1VDGnIuk8-7I5Cfiq9V56Hln3AQrz25ivUAFSChVnULw2AZTAToJyveD4aKqyd8jbh4TEarWiElNsydgdQU0foK3Jf7H5WLdrwhN5W0gG-_x6JCU9YirMHqK4EGP14UWb29mmozGZIZ7R2zfB7oEIfDbDfAjXRhZ9LX3Y_OPFwsblVn_Fl4F7SCbIRhHj3iT0zQ68_cNR6v",
    verified: true,
  },
  {
    id: 4,
    name: "Modern Open Concept",
    price: "3.0M",
    location: "2.1 miles from Campus",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzRp7G1sGC-hjRYLEx85rDy_Hxl0fBjjm_Xr6oxPXRGhHNcaR0TtAlqgq8dUTfJgF9CuHwwGXHV13n8kM7GNUrlz7QltIl4jXV9pFEvpVBdWGzOgmykgYD8uWOyH3m_6gThrl6CfyJeALwxKkH4zWPT_QuiakJIboBDbhhB5xs-CT4GHYgJaAp39htERmoMDCBlUji_T7-FJxFv8L4LNt-PsNf7zeOP32BwGvFl3vwxLx3jGsdq0HtgitiPqJVveSzM1feMLvF0t9w",
    verified: false,
  }
];

export default function MatchesPage() {
  return (
    <div className="flex flex-col min-h-screen pb-32">
      <TopBar title="The Editorial Room-Finder" />
      
      <main className="flex-1 px-6 pt-8">
        <header className="mb-10">
          <h2 className="font-headline text-4xl font-extrabold tracking-tighter text-primary mb-2">Your Matches</h2>
          <p className="font-body text-on-surface-variant text-sm">You have {MATCHES.length} potential new homes waiting for a conversation.</p>
        </header>

        <div className="flex flex-col gap-6">
          {MATCHES.map((match) => (
            <Link 
              key={match.id} 
              to={`/room/${match.id}`}
              className="bg-surface-container-lowest rounded-2xl editorial-shadow p-4 flex items-center gap-4 group transition-transform active:scale-95"
            >
              <div className="relative h-24 w-24 flex-shrink-0 rounded-xl overflow-hidden">
                <img 
                  src={match.image} 
                  alt={match.name} 
                  className="w-full h-full object-cover"
                />
                {match.verified && (
                  <div className="absolute top-1 left-1 bg-surface/90 backdrop-blur-md px-2 py-0.5 rounded-full shadow-sm">
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-tighter">Verified</span>
                  </div>
                )}
              </div>
              
              <div className="flex-grow min-w-0">
                <h3 className="font-headline font-bold text-lg text-on-surface truncate">{match.name}</h3>
                <p className="font-headline text-2xl font-black text-primary-container tracking-tighter mb-1">
                  {match.price} <span className="text-sm font-bold">VND</span><span className="text-xs font-medium text-on-surface-variant">/mo</span>
                </p>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-outline" />
                  <span className="text-xs text-on-surface-variant font-medium truncate">{match.location}</span>
                </div>
              </div>
              
              <button className="flex items-center justify-center bg-primary text-on-primary w-14 h-14 rounded-full shadow-lg shadow-primary/30 hover:scale-110 active:scale-90 transition-all flex-shrink-0">
                <MessageCircle className="w-6 h-6 fill-current" />
              </button>
            </Link>
          ))}
        </div>

        {/* Trust Indicator */}
        <div className="mt-12 p-6 rounded-2xl bg-secondary-container/30 border-l-4 border-secondary flex gap-4">
          <ShieldCheck className="w-8 h-8 text-secondary flex-shrink-0" />
          <div>
            <p className="text-sm font-bold text-on-secondary-container mb-1">Secure Messaging Active</p>
            <p className="text-xs text-on-secondary-container/80 leading-relaxed">
              Your data is encrypted. We recommend keeping all conversations within the app to remain eligible for our $2,000 Deposit Guarantee.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
