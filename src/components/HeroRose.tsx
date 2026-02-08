import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import heroRoseImg from "@/assets/hero-rose.jpg";

interface HeroRoseProps {
  onBloom: () => void;
}

const HeroRose = ({ onBloom }: HeroRoseProps) => {
  const [hovered, setHovered] = useState(false);
  const [shake, setShake] = useState(false);
  const shakeTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (shakeTimer.current) clearTimeout(shakeTimer.current as number);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Hero Rose Image (clickable) */}
      <motion.button
        type="button"
        className="relative p-0 border-0 bg-transparent focus:outline-none"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        onClick={onBloom}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        whileTap={{ scale: 0.98 }}
      >
        {/* Soft glow behind image */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, hsl(340 80% 70% / 0.35), transparent 70%)",
            filter: "blur(35px)",
          }}
          animate={hovered ? { opacity: 1 } : { opacity: 0.7 }}
          transition={{ duration: 0.25 }}
        />

        {/* Rose Image */}
        <motion.img
          src={heroRoseImg}
          alt="Hero Rose"
          className="relative w-80 h-auto rounded-xl shadow-2xl object-cover border-4 border-card z-10"
          style={{ maxHeight: "500px" }}
          animate={
            shake
              ? { x: [0, -6, 6, -4, 4, 0] }
              : hovered
              ? { scale: 1.01, boxShadow: "0 30px 60px rgba(255,100,150,0.18)" }
              : { scale: 1, boxShadow: "0 20px 40px rgba(0,0,0,0.25)" }
          }
          transition={shake ? { duration: 0.6, times: [0, 0.15, 0.45, 0.7, 0.9, 1] } : { duration: 0.25 }}
        />
      </motion.button>

      {/* Label button — clicking shakes the image to hint tapping the image */}
      <motion.button
        type="button"
        className="mt-4 font-serif text-sm italic text-muted-foreground transition select-none rounded-md px-3 py-1"
        initial={{ opacity: 0.9 }}
        animate={{ opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        onClick={() => {
          // trigger a short shake animation on the image (only on click)
          if (shakeTimer.current) clearTimeout(shakeTimer.current as number);
          setShake(true);
          // reset after animation
          shakeTimer.current = window.setTimeout(() => setShake(false), 700);
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(255,182,193,0.28)" }}
        style={{ border: "1px solid rgba(255,182,193,0.5)" }}
      >
        Tap On The rose (yourself) to continue ✨
      </motion.button>
    </div>
  );
};

export default HeroRose;
