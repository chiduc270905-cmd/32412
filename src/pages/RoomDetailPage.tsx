import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, MapPin, CheckCircle2, Share, Heart, ShieldCheck, Wifi, Coffee, Wind, Car } from "lucide-react";
import { cn } from "../lib/utils";
import { ROOMS } from "../constants";

export default function RoomDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find room from constants
  const roomData = ROOMS.find(r => r.id === Number(id));

  if (!roomData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Room not found</h1>
          <button 
            onClick={() => navigate("/")}
            className="text-primary font-bold underline"
          >
            Go back to home
          </button>
        </div>
      </div>
    );
  }

  // Merge with default mock data for missing fields
  const room = {
    ...roomData,
    reviews: 128,
    host: {
      name: "Sarah Nguyen",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuTRb4D1-O_u9jwzpfzQyZ7bNvwHci1DLxKNfwz4dowdXdCP_PwC20RqihkSA2EdwJwdPCwYDDhSA6U5BuMVXn5bDRQQoxwWVPrbkjRtVsxxYDpJqujWnczWEUuUIs1WQWci-eMbKpZVE-VNFsX8Qq5c8iWNyyCQVdhvajFqm50R-17balgRq9Z_-hA5hNiWOljCQYmilh3cR1qeBXMAFMDc0WaTDKffTG3aF0MZtP_6sARezANbBoDbjSt55IglezX0a-SqMky3KH",
      joined: "2021",
      responseRate: "98%"
    },
    amenities: [
      { icon: Wifi, label: "High-Speed WiFi" },
      { icon: Wind, label: "Air Conditioning" },
      { icon: Coffee, label: "Kitchenette" },
      { icon: Car, label: "Parking Space" }
    ]
  };

  return (
    <div className="min-h-screen bg-surface pb-24 relative">
      {/* Hero Image & Top Actions */}
      <div className="relative h-[45vh] w-full">
        <img 
          src={room.image} 
          alt={room.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        
        {/* Top Bar Overlay */}
        <div className="absolute top-0 w-full p-6 flex justify-between items-center z-10">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-3">
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <Share className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Floating Price Tag */}
        <div className="absolute bottom-6 left-6 glass-badge px-4 py-2 flex items-baseline gap-1">
          <span className="font-headline font-black text-2xl text-white tracking-tight">{room.price}</span>
          <span className="text-white/80 text-sm font-medium">/mo</span>
        </div>
      </div>

      {/* Content Body */}
      <main className="px-6 pt-8 max-w-md mx-auto sm:max-w-2xl lg:max-w-4xl">
        {/* Title & Rating */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="font-headline text-3xl font-extrabold text-on-background leading-tight mb-2">
              {room.name}
            </h1>
            <div className="flex items-center gap-2 text-sm text-on-surface-variant font-medium">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{room.location}</span>
              <span className="text-outline-variant">•</span>
              <span>{room.distance}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 bg-secondary-container text-on-secondary-container px-2 py-1 rounded-lg font-bold">
              <Star className="w-4 h-4 fill-current" />
              <span>{room.rating}</span>
            </div>
            <span className="text-xs text-on-surface-variant mt-1 underline cursor-pointer">{room.reviews} reviews</span>
          </div>
        </div>

        {/* Host Section */}
        <div className="my-8 p-4 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src={room.host.image} alt={room.host.name} className="w-14 h-14 rounded-full object-cover border-2 border-primary-container" />
              {room.verified && (
                <div className="absolute -bottom-1 -right-1 bg-secondary text-on-secondary rounded-full p-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
            </div>
            <div>
              <p className="font-bold text-on-surface">Hosted by {room.host.name}</p>
              <p className="text-xs text-on-surface-variant">Joined {room.host.joined} • {room.host.responseRate} response rate</p>
            </div>
          </div>
          <button className="text-primary font-bold text-sm px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
            View Profile
          </button>
        </div>

        {/* Description */}
        <section className="mb-8">
          <h2 className="font-headline text-xl font-bold mb-3">About this space</h2>
          <p className="text-on-surface-variant leading-relaxed text-sm">
            {room.description}
          </p>
          <button className="text-primary font-bold text-sm mt-2 underline underline-offset-4">Read more</button>
        </section>

        {/* Amenities */}
        <section className="mb-10">
          <h2 className="font-headline text-xl font-bold mb-4">What this place offers</h2>
          <div className="grid grid-cols-2 gap-4">
            {room.amenities.map((amenity, idx) => (
              <div key={idx} className="flex items-center gap-3 text-on-surface-variant">
                <amenity.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{amenity.label}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 rounded-xl border-2 border-outline-variant/50 font-bold text-on-surface hover:bg-surface-container-low transition-colors">
            Show all 24 amenities
          </button>
        </section>

        {/* Trust Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-primary-container/50 to-transparent border border-primary-container flex gap-4 mb-8">
          <ShieldCheck className="w-8 h-8 text-primary flex-shrink-0" />
          <div>
            <h3 className="font-bold text-on-surface mb-1">RoomFinder Guarantee</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Every booking includes protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.
            </p>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 w-full bg-surface border-t border-outline-variant/20 p-4 px-6 flex items-center justify-between z-50">
        <div className="flex flex-col">
          <span className="font-headline font-black text-xl text-primary">{room.price}</span>
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Available Now</span>
        </div>
        <button className="bg-primary text-on-primary px-8 py-3.5 rounded-full font-bold shadow-lg hover:scale-105 active:scale-95 transition-all">
          Request to Book
        </button>
      </div>
    </div>
  );
}
