import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform, PanInfo, AnimatePresence } from "motion/react";
import { X, Heart, Zap, MapPin, CheckCircle2, Star, Info } from "lucide-react";
import TopBar from "../components/TopBar";
import { ROOMS } from "../constants";
import { Room } from "../types";

export default function SwipePage() {
  const [cards, setCards] = useState<Room[]>(ROOMS);
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
            <AnimatePresence>
              {cards.map((room, index) => {
                const isFront = index === activeIndex;
                const isSecond = index === activeIndex - 1;
                const isThird = index === activeIndex - 2;
                
                if (!isFront && !isSecond && !isThird) return null;
                
                return (
                  <SwipeCard
                    key={room.id}
                    room={room}
                    isFront={isFront}
                    onRemove={(action) => removeCard(room.id, action)}
                    index={index}
                    total={cards.length}
                    activeIndex={activeIndex}
                  />
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Floating Interaction Buttons */}
        {cards.length > 0 && (
          <div className="fixed bottom-28 flex justify-center items-center gap-6 w-full z-40 pointer-events-none">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => removeCard(cards[activeIndex].id, "nope")}
              className="pointer-events-auto w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-error border-4 border-error/10 transition-colors"
            >
              <X className="w-8 h-8" strokeWidth={3} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="pointer-events-auto w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-tertiary transition-colors"
            >
              <Zap className="w-6 h-6 fill-current" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => removeCard(cards[activeIndex].id, "like")}
              className="pointer-events-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-container shadow-lg flex items-center justify-center text-on-primary transition-colors"
            >
              <Heart className="w-8 h-8 fill-current" />
            </motion.button>
          </div>
        )}
      </main>
    </div>
  );
}

interface SwipeCardProps {
  key?: number | string;
  room: Room;
  isFront: boolean;
  onRemove: (action: "like" | "nope") => void;
  index: number;
  total: number;
  activeIndex: number;
}

function SwipeCard({ room, isFront, onRemove, index, total, activeIndex }: SwipeCardProps) {
  const navigate = useNavigate();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  
  // Stamps and overlays
  const likeOpacity = useTransform(x, [20, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-20, -100], [0, 1]);
  
  const likeOverlayOpacity = useTransform(x, [0, 150], [0, 0.4]);
  const nopeOverlayOpacity = useTransform(x, [0, -150], [0, 0.4]);

  // Background cards scaling and positioning
  const positionFromFront = activeIndex - index;
  const scale = isFront ? 1 : Math.max(0, 1 - positionFromFront * 0.05);
  const yOffset = isFront ? 0 : positionFromFront * 12;
  const opacity = isFront ? 1 : Math.max(0, 1 - positionFromFront * 0.3);

  const handleDragEnd = (_e: any, info: PanInfo) => {
    const threshold = 120;
    if (info.offset.x > threshold) {
      onRemove("like");
    } else if (info.offset.x < -threshold) {
      onRemove("nope");
    }
  };

  return (
    <motion.div
      className="absolute inset-0 bg-surface-lowest rounded-2xl editorial-shadow origin-bottom"
      style={{
        x: isFront ? x : 0,
        rotate: isFront ? rotate : 0,
        zIndex: index,
        opacity,
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={isFront ? { cursor: "grabbing", scale: 1.02 } : {}}
      animate={{ 
        scale, 
        y: yOffset,
        opacity,
      }}
      exit={{ 
        x: x.get() > 0 ? 1000 : (x.get() < 0 ? -1000 : (Math.random() > 0.5 ? 1000 : -1000)), 
        opacity: 0,
        scale: 0.5,
        rotate: x.get() > 0 ? 20 : -20,
        transition: { duration: 0.4, ease: "easeIn" }
      }}
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="relative h-full w-full rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover brightness-90 pointer-events-none"
        />
        
        {/* Color Overlays */}
        {isFront && (
          <>
            <motion.div 
              style={{ opacity: likeOverlayOpacity }}
              className="absolute inset-0 bg-primary pointer-events-none z-10"
            />
            <motion.div 
              style={{ opacity: nopeOverlayOpacity }}
              className="absolute inset-0 bg-error pointer-events-none z-10"
            />
          </>
        )}

        {/* Editorial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-on-surface/20 to-transparent pointer-events-none z-10" />

        {/* Stamps */}
        {isFront && (
          <>
            <motion.div
              style={{ opacity: nopeOpacity, scale: useTransform(x, [0, -150], [0.5, 1]) }}
              className="absolute top-12 right-8 z-20 pointer-events-none"
            >
              <div className="nope-stamp text-5xl md:text-6xl">NOPE</div>
            </motion.div>
            <motion.div
              style={{ opacity: likeOpacity, scale: useTransform(x, [0, 150], [0.5, 1]) }}
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

          <button 
            onClick={() => navigate(`/room/${room.id}`)}
            className="mt-5 w-full py-3 px-4 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl flex items-center justify-center gap-2 transition-colors pointer-events-auto"
          >
            <Info className="w-5 h-5" />
            <span className="font-bold text-sm">View Details & Book</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
