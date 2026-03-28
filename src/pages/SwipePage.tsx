import { useState } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "motion/react";
import { X, Heart, Zap, MapPin, CheckCircle2, Star, Info } from "lucide-react";
import TopBar from "../components/TopBar";

const ROOMS = [
  {
    id: 1,
    name: "Skyloft Studio",
    price: "3.500.000đ",
    location: "District 1, Ho Chi Minh City",
    distance: "0.8 km",
    rating: 4.9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjM-qEBlh7bcsPAVADqk_Iz4JtQRWFRvhODRbV-c-GNsqGHTOuALsl9rqUOIZN_vUmeEUnOJ3kKamQESMOEU24WLyV-htyn9zCTFsel96Xh6bAX2Ozt8dIGU73EAwXraBKkIR1lO4f9SpohuEaTZJL67wBLZMS9XQH8ZPDfq0UqKPsZV0iPGSW8L6Uvc6ANouhnj0B4q5PZkqV3dtSWeqIcDBF6h-_kolSYBgvdxG_EMvbWXrkrJYZBqvQ_bVYnmywjdOrKhCmeoCu",
    verified: true,
    description: "Bright studio with a large balcony. Great natural light for your plants and morning coffee.",
    match: 75,
  },
  {
    id: 2,
    name: "Neon Loft District 3",
    price: "7.500.000đ",
    location: "District 3, Near UEH",
    distance: "800m",
    rating: 4.7,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3VCFEpk5Rq-ljJAelkjjxZ7W1oKsXrgKtNYD--qjTb1iv5RvtRu_E8V-ZH2ovXHgnkZ4wUUS2CPA530gGImaPfruydwHU4l9aGdNNcaIfjEZnXTzks-HXEJdTkFSaIzjVf--c7MYihKM5XIMJmyf_jZYzSJ7yxjxJTtvK0zFzEEz0YNq3Pw0xxnuEi0ectn_cVIXcaNg06qbzhE0CtwPR0LCSfW7u_P-3vcuuOuoPf5hIsPCskJ6dUUGULBC3IEpyBXDG-HqIE5qb",
    verified: true,
    description: "Modern loft with neon accents. Perfect for students who love a vibrant city lifestyle.",
    match: 85,
  },
  {
    id: 3,
    name: "Modern Minimalist",
    price: "4.200.000đ",
    location: "District 7, Near RMIT",
    distance: "1.2 km",
    rating: 4.8,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDoIBWqDfsVw-jh6-STN5fizcMWY7GPZnQmgkB8UblyFHIv4qpGzMdZLR9Bl274advSLKifedSke--1RL5rxpOAFp_VNjDsI6PLDZHYUtVtmO2h_rAi2MNEYD5qrF60yiAjUXg2bnIgArNPRADvD_wXV4lNPnZctmqRc7KOO-fdxYr-wcC9UHrMSnztU4pN-JcW63lES51znBxrdALPgn0NNmRkRlE_vLtnlwxH69Rk93YFqZk2jgnI_IPK6nfMIzzyAoZacDkU392Y",
    verified: false,
    description: "Clean, minimalist design with essential amenities. Quiet neighborhood ideal for studying.",
    match: 90,
  },
  {
    id: 4,
    name: "Cozy Corner Room",
    price: "2.800.000đ",
    location: "Binh Thanh District",
    distance: "2.5 km",
    rating: 4.5,
    image: "https://picsum.photos/seed/room4/600/800",
    verified: true,
    description: "Affordable and cozy room in a friendly shared house. Close to local markets and street food.",
    match: 60,
  },
  {
    id: 5,
    name: "Riverside Apartment",
    price: "6.000.000đ",
    location: "District 2, Thao Dien",
    distance: "5.0 km",
    rating: 4.9,
    image: "https://picsum.photos/seed/room5/600/800",
    verified: true,
    description: "Spacious apartment with a stunning river view. Includes access to pool and gym.",
    match: 40,
  },
  {
    id: 6,
    name: "Vintage Studio",
    price: "3.800.000đ",
    location: "Phu Nhuan District",
    distance: "1.5 km",
    rating: 4.6,
    image: "https://picsum.photos/seed/room6/600/800",
    verified: false,
    description: "Charming studio with vintage decor. Located in a quiet alley, away from the city noise.",
    match: 80,
  },
  {
    id: 7,
    name: "Urban Oasis",
    price: "5.500.000đ",
    location: "District 10",
    distance: "3.0 km",
    rating: 4.7,
    image: "https://picsum.photos/seed/room7/600/800",
    verified: true,
    description: "A green oasis in the heart of the city. Features a shared rooftop garden.",
    match: 65,
  },
  {
    id: 8,
    name: "Student Hub Shared Room",
    price: "1.500.000đ",
    location: "District 5",
    distance: "1.0 km",
    rating: 4.2,
    image: "https://picsum.photos/seed/room8/600/800",
    verified: true,
    description: "Budget-friendly shared room. Great way to meet fellow students and make friends.",
    match: 95,
  },
  {
    id: 9,
    name: "Sunny Balcony Room",
    price: "4.000.000đ",
    location: "Tan Binh District",
    distance: "4.0 km",
    rating: 4.8,
    image: "https://picsum.photos/seed/room9/600/800",
    verified: false,
    description: "Private room with a large sunny balcony. Fully furnished and ready to move in.",
    match: 55,
  },
  {
    id: 10,
    name: "Luxury Penthouse Share",
    price: "8.500.000đ",
    location: "District 1",
    distance: "2.0 km",
    rating: 5.0,
    image: "https://picsum.photos/seed/room10/600/800",
    verified: true,
    description: "Share a luxury penthouse with young professionals. Premium amenities and breathtaking views.",
    match: 50,
  },
  {
    id: 11,
    name: "Artisan Loft",
    price: "5.200.000đ",
    location: "District 4",
    distance: "1.8 km",
    rating: 4.7,
    image: "https://picsum.photos/seed/room11/600/800",
    verified: true,
    description: "Creative loft space with high ceilings and exposed brick. Perfect for artists and designers.",
    match: 70,
  },
  {
    id: 12,
    name: "Quiet Suburb House",
    price: "3.000.000đ",
    location: "Go Vap District",
    distance: "6.0 km",
    rating: 4.4,
    image: "https://picsum.photos/seed/room12/600/800",
    verified: false,
    description: "Peaceful room in a suburban house. Ideal for those who prefer a quiet environment.",
    match: 35,
  },
  {
    id: 13,
    name: "City Center Micro-Apartment",
    price: "4.500.000đ",
    location: "District 1",
    distance: "0.5 km",
    rating: 4.6,
    image: "https://picsum.photos/seed/room13/600/800",
    verified: true,
    description: "Compact and efficient micro-apartment right in the city center. Walk to everything.",
    match: 88,
  },
  {
    id: 14,
    name: "Spacious Master Bedroom",
    price: "5.000.000đ",
    location: "District 7",
    distance: "1.5 km",
    rating: 4.9,
    image: "https://picsum.photos/seed/room14/600/800",
    verified: true,
    description: "Large master bedroom with en-suite bathroom. Located in a secure and modern building.",
    match: 82,
  },
  {
    id: 15,
    name: "Eco-Friendly Studio",
    price: "4.800.000đ",
    location: "District 2",
    distance: "4.5 km",
    rating: 4.8,
    image: "https://picsum.photos/seed/room15/600/800",
    verified: false,
    description: "Sustainable studio built with eco-friendly materials. Solar powered and energy efficient.",
    match: 45,
  },
  {
    id: 16,
    name: "Traditional Homestay",
    price: "2.500.000đ",
    location: "Binh Thanh District",
    distance: "3.5 km",
    rating: 4.3,
    image: "https://picsum.photos/seed/room16/600/800",
    verified: true,
    description: "Experience local culture in this traditional homestay. Home-cooked meals available.",
    match: 55,
  },
  {
    id: 17,
    name: "High-Rise Condo Room",
    price: "6.500.000đ",
    location: "District 4",
    distance: "2.2 km",
    rating: 4.7,
    image: "https://picsum.photos/seed/room17/600/800",
    verified: true,
    description: "Modern room in a high-rise condo. Enjoy spectacular city skyline views at night.",
    match: 68,
  },
  {
    id: 18,
    name: "Pet-Friendly Apartment",
    price: "5.500.000đ",
    location: "District 7",
    distance: "2.0 km",
    rating: 4.6,
    image: "https://picsum.photos/seed/room18/600/800",
    verified: false,
    description: "Bring your furry friends! This apartment is completely pet-friendly with a nearby park.",
    match: 72,
  }
];

export default function SwipePage() {
  const [cards, setCards] = useState(ROOMS);
  const activeIndex = cards.length - 1;

  const removeCard = (id: number, action: "like" | "nope") => {
    setCards((prev) => prev.filter((card) => card.id !== id));
    // Handle action (e.g., save to matches)
    console.log(`Card ${id} ${action}d`);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopBar />
      <main className="flex-1 relative flex items-center justify-center px-4 pb-32">
        {cards.length === 0 ? (
          <div className="text-center">
            <h2 className="font-headline text-2xl font-bold text-primary mb-2">No more rooms!</h2>
            <p className="text-on-surface-variant">Check back later or adjust your filters.</p>
            <button 
              onClick={() => setCards(ROOMS)}
              className="mt-6 px-6 py-3 bg-primary text-on-primary rounded-full font-bold shadow-lg active:scale-95 transition-transform"
            >
              Reset Stack
            </button>
          </div>
        ) : (
          <div className="relative w-full max-w-md aspect-[3/4] max-h-[600px]">
            {cards.map((room, index) => {
              const isFront = index === activeIndex;
              if (!isFront) return null;
              return (
                <SwipeCard
                  key={room.id}
                  room={room}
                  isFront={isFront}
                  onRemove={(action) => removeCard(room.id, action)}
                  index={index}
                  total={cards.length}
                />
              );
            })}
          </div>
        )}

        {/* Floating Interaction Buttons */}
        {cards.length > 0 && (
          <div className="fixed bottom-28 flex justify-center items-center gap-6 w-full z-40 pointer-events-none">
            <button 
              onClick={() => removeCard(cards[activeIndex].id, "nope")}
              className="pointer-events-auto w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-error border-4 border-error/10 active:scale-90 transition-all duration-150"
            >
              <X className="w-8 h-8" strokeWidth={3} />
            </button>
            <button className="pointer-events-auto w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-tertiary active:scale-90 transition-all duration-150">
              <Zap className="w-6 h-6 fill-current" />
            </button>
            <button 
              onClick={() => removeCard(cards[activeIndex].id, "like")}
              className="pointer-events-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-container shadow-lg flex items-center justify-center text-on-primary active:scale-90 transition-all duration-150"
            >
              <Heart className="w-8 h-8 fill-current" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

interface SwipeCardProps {
  key?: number | string;
  room: typeof ROOMS[0];
  isFront: boolean;
  onRemove: (action: "like" | "nope") => void;
  index: number;
  total: number;
}

function SwipeCard({ room, isFront, onRemove, index, total }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  
  // Stamps opacity
  const likeOpacity = useTransform(x, [20, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-20, -100], [0, 1]);

  // Background cards scaling and positioning
  const isSecond = index === total - 2;
  const scale = isFront ? 1 : isSecond ? 0.95 : 0.9;
  const yOffset = isFront ? 0 : isSecond ? 16 : 32;

  const handleDragEnd = (_e: any, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      onRemove("like");
    } else if (info.offset.x < -threshold) {
      onRemove("nope");
    }
  };

  return (
    <motion.div
      className="absolute inset-0 bg-surface-lowest rounded-2xl shadow-[0_20px_50px_rgba(74,37,6,0.12)] origin-bottom"
      style={{
        x: isFront ? x : 0,
        rotate: isFront ? rotate : 0,
        scale,
        y: yOffset,
        zIndex: index,
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: "grabbing" }}
      animate={{ scale, y: yOffset }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative h-full w-full rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover brightness-90 pointer-events-none"
        />
        
        {/* Editorial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-on-surface/20 to-transparent pointer-events-none" />

        {/* Stamps */}
        {isFront && (
          <>
            <motion.div
              style={{ opacity: nopeOpacity }}
              className="absolute top-12 right-8 z-20 pointer-events-none"
            >
              <div className="nope-stamp text-5xl md:text-6xl">NOPE</div>
            </motion.div>
            <motion.div
              style={{ opacity: likeOpacity }}
              className="absolute top-12 left-8 z-20 pointer-events-none"
            >
              <div className="like-stamp text-5xl md:text-6xl">LIKE</div>
            </motion.div>
          </>
        )}

        {/* Price Tag (Editorial Layering Style) */}
        <div className="absolute top-6 left-6 backdrop-blur-xl bg-surface/70 px-4 py-2 rounded-full shadow-sm pointer-events-none">
          <span className="font-headline font-extrabold text-primary tracking-tight text-lg">
            {room.price}
            <span className="text-xs font-medium ml-1">/mo</span>
          </span>
        </div>

        {/* Card Content Information */}
        <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full text-white pointer-events-none">
          <div className="flex items-center gap-2 mb-2">
            {room.verified && (
              <span className="bg-secondary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-on-secondary flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Verified Host
              </span>
            )}
            <div className="flex items-center gap-1 backdrop-blur-md bg-white/20 px-2 py-1 rounded-full">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs font-bold">{room.rating}</span>
            </div>
          </div>
          
          <h2 className="font-headline font-bold text-3xl leading-tight mb-1">{room.name}</h2>
          
          <div className="flex items-center gap-2 opacity-90 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{room.location}</span>
          </div>

          <p className="mt-3 text-sm opacity-90 line-clamp-2 leading-relaxed">
            {room.description}
          </p>

          {/* Proximity Indicator */}
          <div className="mt-4">
            <div className="flex justify-between text-[10px] uppercase tracking-tighter font-bold mb-1.5 opacity-80">
              <span>Proximity to Campus</span>
              <span>{room.match}% Match</span>
            </div>
            <div className="h-1.5 w-full bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-secondary rounded-full" style={{ width: `${room.match}%` }} />
            </div>
          </div>

          <button className="mt-5 w-full py-3 px-4 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl flex items-center justify-center gap-2 transition-colors pointer-events-auto">
            <Info className="w-5 h-5" />
            <span className="font-bold text-sm">View Details & Book</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
