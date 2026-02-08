import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import memoryVideo from "@/assets/memory-photo.mp4";

interface MemoryCardProps {
  revealDelay?: number;
}

const MemoryCard = ({ revealDelay = 0 }: MemoryCardProps) => {
  const [visible, setVisible] = useState(revealDelay === 0);

  useEffect(() => {
    if (revealDelay > 0) {
      const timer = setTimeout(() => setVisible(true), revealDelay * 1000);
      return () => clearTimeout(timer);
    }
  }, [revealDelay]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="flex flex-col items-center gap-4 mt-8"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative group">
            <div
              className="absolute -inset-2 rounded-2xl opacity-50"
              style={{
                background: "linear-gradient(135deg, hsl(340 50% 80%), hsl(38 60% 75%))",
                filter: "blur(10px)",
              }}
            />
            <video
              src={memoryVideo}
              autoPlay
              loop
              muted
              className="relative w-56 h-56 sm:w-64 sm:h-64 object-cover rounded-2xl shadow-xl border-4 border-card"
            />
          </div>
          <p className="font-serif text-muted-foreground italic text-center text-sm sm:text-base max-w-xs">
            "The most precious, anyone can have 💕."
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MemoryCard;
