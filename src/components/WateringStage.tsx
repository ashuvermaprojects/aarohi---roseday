import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WaterDroplets from "./WaterDroplets";

interface WateringStageProps {
  onComplete: () => void;
}

const messages = [
  "Look! what i've brought for you. a seed, Let's plant it 🌱",
  "See! it's growing!",
  "Keep watering, there's a surprise! ",
  "A little more efforts… <3",
  "Almost there… !!",
  "Aww, you did it! it's blooming! A rose just like you 🌹",
];

/* ---- Enhanced SVG Rose Bud ---- */
const RoseBud = ({ bloomed }: { bloomed: boolean }) => {
  const petalVariants = (delay: number) => ({
    initial: { scale: 0.2, opacity: 0 },
    animate: bloomed
      ? { scale: 1, opacity: 1, rotate: [0, -2, 2, 0] }
      : { scale: 0.2, opacity: 0 },
    transition: { delay, duration: 0.9 },
  });

  return (
    <motion.svg
      viewBox="0 0 120 120"
      className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-2xl"
      initial={{ scale: 0, opacity: 0 }}
      animate={bloomed ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ duration: 0.9, type: "spring", bounce: 0.25 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="roseCore" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#ffd6e0" />
          <stop offset="45%" stopColor="#ff7aa6" />
          <stop offset="100%" stopColor="#b33a5a" />
        </radialGradient>
        <linearGradient id="petalGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffc8d6" />
          <stop offset="60%" stopColor="#ff6f98" />
          <stop offset="100%" stopColor="#aa2742" />
        </linearGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Sepals / base leaf */}
      <motion.path
        d="M60 90 C45 88 30 78 30 68 C30 58 45 58 60 66 C75 58 90 58 90 68 C90 78 75 88 60 90 Z"
        fill="hsl(140,40%,34%)"
        opacity={0.95}
        initial={{ y: 6, opacity: 0 }}
        animate={bloomed ? { y: 0, opacity: 1 } : { y: 6, opacity: 0 }}
        transition={{ delay: 0.05, duration: 0.6 }}
      />

      {/* Layered petals - outer ring (4) */}
      <motion.path {...petalVariants(0.15)} d="M60 34 C40 28 24 44 34 58 C44 72 62 68 60 54 C58 68 76 72 86 58 C96 44 80 28 60 34 Z" fill="url(#petalGrad)" stroke="#7a2030" strokeWidth="0.6" filter="url(#softShadow)" />

      {/* Left petal */}
      <motion.path {...petalVariants(0.25)} d="M48 30 C34 28 22 42 32 56 C40 68 56 64 56 52 C56 64 70 68 74 56 C78 44 62 30 48 30 Z" fill="url(#petalGrad)" opacity="0.98" stroke="#7a2030" strokeWidth="0.5" />

      {/* Right petal */}
      <motion.path {...petalVariants(0.28)} d="M72 30 C86 28 98 42 88 56 C80 68 64 64 64 52 C64 64 50 68 46 56 C42 44 58 30 72 30 Z" fill="url(#petalGrad)" opacity="0.98" stroke="#7a2030" strokeWidth="0.5" />

      {/* Inner petals - layered small ones */}
      <motion.path {...petalVariants(0.4)} d="M60 40 C54 36 46 40 48 48 C50 56 60 54 60 46 C60 54 70 56 72 48 C74 40 66 36 60 40 Z" fill="url(#roseCore)" stroke="#8b233b" strokeWidth="0.4" />
      <motion.path {...petalVariants(0.55)} d="M60 44 C58 42 54 44 55 48 C56 52 60 52 60 50 C60 52 64 52 65 48 C66 44 62 42 60 44 Z" fill="#ffdfe7" opacity="0.95" />

      {/* Center bud highlight */}
      <motion.circle
        cx="60"
        cy="46"
        r="4"
        fill="#fff6f8"
        opacity={0.9}
        initial={{ scale: 0 }}
        animate={bloomed ? { scale: [0, 1.2, 1] } : { scale: 0 }}
        transition={{ delay: 0.75, duration: 0.45 }}
      />

      {/* Fine highlights for realism */}
      <motion.path d="M66 36 C63 34 61 36 63 38" stroke="#ffffff" strokeWidth="0.6" strokeLinecap="round" opacity={0.6} initial={{ opacity: 0 }} animate={bloomed ? { opacity: 0.9 } : { opacity: 0 }} transition={{ delay: 0.8 }} />
      <motion.path d="M54 36 C57 34 59 36 57 38" stroke="#ffffff" strokeWidth="0.5" strokeLinecap="round" opacity={0.6} initial={{ opacity: 0 }} animate={bloomed ? { opacity: 0.9 } : { opacity: 0 }} transition={{ delay: 0.82 }} />
    </motion.svg>
  );
};

/* ---- Leaf with vein detail ---- */
const Leaf = ({
  side,
  bottom,
  delay,
}: {
  side: "left" | "right";
  bottom: number;
  delay: number;
}) => (
  <motion.svg
    viewBox="0 0 50 30"
    className="absolute w-12 h-7"
    style={{
      bottom: `${bottom}px`,
      [side === "left" ? "right" : "left"]: "52%",
      transformOrigin: side === "left" ? "right center" : "left center",
    }}
    initial={{ scale: 0, rotate: side === "left" ? 20 : -20, opacity: 0 }}
    animate={{ scale: 1, rotate: side === "left" ? -25 : 25, opacity: 1 }}
    transition={{ delay, duration: 0.6, type: "spring" }}
  >
    <ellipse
      cx="25" cy="15" rx="24" ry="12"
      fill={`hsl(${135 + Math.random() * 15}, ${45 + Math.random() * 15}%, ${40 + Math.random() * 10}%)`}
    />
    {/* Leaf vein */}
    <line x1="2" y1="15" x2="48" y2="15" stroke="hsl(140, 30%, 55%)" strokeWidth="0.8" opacity="0.5" />
    <line x1="15" y1="15" x2="10" y2="6" stroke="hsl(140, 30%, 55%)" strokeWidth="0.5" opacity="0.4" />
    <line x1="25" y1="15" x2="22" y2="5" stroke="hsl(140, 30%, 55%)" strokeWidth="0.5" opacity="0.4" />
    <line x1="35" y1="15" x2="38" y2="6" stroke="hsl(140, 30%, 55%)" strokeWidth="0.5" opacity="0.4" />
  </motion.svg>
);

/* ---- Thorn ---- */
const Thorn = ({ bottom, side }: { bottom: number; side: "left" | "right" }) => (
  <motion.div
    className="absolute w-2 h-2"
    style={{
      bottom: `${bottom}px`,
      [side]: "44%",
      clipPath: side === "left"
        ? "polygon(100% 100%, 100% 30%, 0% 0%)"
        : "polygon(0% 100%, 0% 30%, 100% 0%)",
      background: "hsl(140, 35%, 32%)",
    }}
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.3 }}
  />
);

/* ---- Sparkle on water ---- */
const WaterSparkle = ({ x, y }: { x: number; y: number }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: x, top: y }}
    initial={{ scale: 0, opacity: 1 }}
    animate={{ scale: [0, 1.5, 0], opacity: [1, 0.8, 0] }}
    transition={{ duration: 0.8 }}
  >
    <span className="text-xs">✨</span>
  </motion.div>
);

const WateringStage = ({ onComplete }: WateringStageProps) => {
  const [progress, setProgress] = useState(0);
  const [waterDrops, setWaterDrops] = useState<number[]>([]);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);
  const [tapCount, setTapCount] = useState(0);
  const [showDroplets, setShowDroplets] = useState(false);

  const handleWater = useCallback(() => {
    if (progress >= 100) return;

    const id = Date.now();
    setWaterDrops((prev) => [...prev, id]);
    setTimeout(() => setWaterDrops((prev) => prev.filter((d) => d !== id)), 900);

    // Show water droplets on tap
    setShowDroplets(true);
    setTimeout(() => setShowDroplets(false), 1200);

    // Sparkles near the pot
    const sparkleCount = 3;
    const newSparkles = Array.from({ length: sparkleCount }, (_, i) => ({
      id: id + i,
      x: 60 + Math.random() * 70,
      y: 180 + Math.random() * 40,
    }));
    setSparkles((prev) => [...prev, ...newSparkles]);
    setTimeout(
      () => setSparkles((prev) => prev.filter((s) => !newSparkles.find((ns) => ns.id === s.id))),
      1000
    );


    setTapCount((c) => c + 1);
    const newProgress = Math.min(progress + 20, 100);
    setProgress(newProgress);

    if (newProgress >= 100) {
      // Pause for 3 seconds so the final message "Aww, you did it..." can be read
      // before proceeding (previously 2200ms).
      setTimeout(onComplete, 3000);
    }
  }, [progress, onComplete]);

  const messageIndex = Math.min(Math.floor(progress / 20), messages.length - 1);
  const stemHeight = (progress / 100) * 180;
  const showLeaf1 = progress >= 40;
  const showLeaf2 = progress >= 60;
  const showLeaf3 = progress >= 80;
  const roseBloomed = progress >= 100;

  return (
    <motion.div
      className="flex flex-col items-center text-center max-w-md w-full px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
    >
      {/* Message */}
      <motion.p
        key={messageIndex}
        className="font-cursive text-3xl sm:text-4xl text-foreground text-glow mb-6 min-h-[3rem]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {messages[messageIndex]}
      </motion.p>

      {/* Tap counter */}
      <motion.p
        className="font-serif text-xs text-muted-foreground/60 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {tapCount < 5 ? `${5 - tapCount} taps left` : "🌹 Complete!"}
      </motion.p>

      {/* Plant area */}
      <div className="relative h-80 w-52 mb-4 flex flex-col items-center justify-end">
        {/* Water droplets effect */}
        {showDroplets && <WaterDroplets isActive={showDroplets} count={6} />}

        {/* Sparkles */}
        {sparkles.map((s) => (
          <WaterSparkle key={s.id} x={s.x} y={s.y} />
        ))}

        {/* Rose bud at top of stem */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-10"
          style={{ bottom: `${stemHeight + 68}px` }}
        >
          <motion.div
            animate={roseBloomed ? { rotate: [0, -3, 3, -2, 2, 0] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
          >
            <RoseBud bloomed={roseBloomed} />
          </motion.div>
          {/* Glow behind rose */}
          <AnimatePresence>
            {roseBloomed && (
              <motion.div
                className="absolute inset-0 -m-6 rounded-full"
                style={{
                  background: "radial-gradient(circle, hsl(var(--rose-glow) / 0.5), transparent 70%)",
                  filter: "blur(15px)",
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.5 }}
                transition={{ duration: 1 }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Leaves */}
        <AnimatePresence>
          {showLeaf1 && (
            <Leaf key="l1" side="left" bottom={stemHeight * 0.55 + 70} delay={0} />
          )}
          {showLeaf2 && (
            <Leaf key="l2" side="right" bottom={stemHeight * 0.35 + 70} delay={0} />
          )}
          {showLeaf3 && (
            <Leaf key="l3" side="left" bottom={stemHeight * 0.15 + 70} delay={0} />
          )}
        </AnimatePresence>

        {/* Thorns */}
        {progress >= 40 && <Thorn bottom={stemHeight * 0.48 + 70} side="right" />}
        {progress >= 60 && <Thorn bottom={stemHeight * 0.28 + 70} side="left" />}
        {progress >= 80 && <Thorn bottom={stemHeight * 0.7 + 70} side="right" />}

        {/* Stem */}
        <motion.div
          className="w-3 rounded-t-sm"
          style={{
            height: stemHeight,
            background: "linear-gradient(to top, hsl(140, 35%, 30%), hsl(140, 45%, 42%), hsl(140, 50%, 48%))",
            boxShadow: "1px 0 3px hsl(140 30% 20% / 0.3)",
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Beautiful pot */}
        <div className="relative flex flex-col items-center">
          {/* Pot rim */}
          <div
            className="w-44 h-5 rounded-t-lg relative z-10"
            style={{
              background: "linear-gradient(to bottom, hsl(15, 55%, 52%), hsl(15, 50%, 44%))",
              boxShadow: "0 2px 8px hsl(15 40% 30% / 0.3), inset 0 1px 0 hsl(15 60% 65%)",
            }}
          />
          {/* Pot body */}
          <div
            className="w-40 h-24 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(15, 50%, 48%), hsl(15, 45%, 38%), hsl(15, 50%, 42%))",
              borderRadius: "0 0 2.5rem 2.5rem",
              boxShadow:
                "0 12px 30px hsl(15 40% 25% / 0.35), inset -8px 0 15px hsl(15 40% 30% / 0.3), inset 8px 0 15px hsl(15 60% 55% / 0.15)",
            }}
          >
            {/* Decorative band */}
            <div
              className="absolute top-6 left-3 right-3 h-3 rounded-full"
              style={{
                background: "linear-gradient(to bottom, hsl(15, 55%, 55%), hsl(15, 50%, 40%))",
                boxShadow: "inset 0 1px 0 hsl(15 60% 62%)",
              }}
            />
            {/* Heart on pot */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 text-lg opacity-40">
              💗
            </div>
            {/* Soil */}
            <div
              className="absolute top-0 left-2 right-2 h-4 rounded-b-lg"
              style={{
                background: "linear-gradient(to bottom, hsl(25, 40%, 22%), hsl(25, 35%, 18%))",
              }}
            />
          </div>
          {/* Pot base/saucer */}
          <div
            className="w-48 h-4 rounded-b-xl -mt-1"
            style={{
              background: "linear-gradient(to bottom, hsl(15, 45%, 40%), hsl(15, 40%, 35%))",
              boxShadow: "0 4px 10px hsl(15 30% 20% / 0.3)",
            }}
          />
        </div>
      </div>

      {/* Water button */}
      <motion.button
        onClick={handleWater}
        disabled={progress >= 100}
        className="relative w-20 h-20 rounded-full text-3xl mb-5 disabled:cursor-default overflow-hidden"
        style={{
          background: progress < 100
            ? "linear-gradient(135deg, hsl(200, 85%, 70%), hsl(210, 80%, 55%), hsl(220, 75%, 50%))"
            : "linear-gradient(135deg, hsl(140, 50%, 55%), hsl(140, 50%, 45%))",
          boxShadow: progress < 100
            ? "0 8px 30px hsl(210 80% 50% / 0.4), inset 0 2px 0 hsl(200 80% 80%)"
            : "0 8px 20px hsl(140 50% 40% / 0.3)",
          transition: "background 0.6s, box-shadow 0.6s",
        }}
        whileHover={progress < 100 ? { scale: 1.1, y: -2 } : {}}
        whileTap={progress < 100 ? { scale: 0.88 } : {}}
      >
        {progress < 100 ? "💧" : "✨"}
        {/* Ripple effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: "2px solid hsl(0 0% 100% / 0.3)" }}
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        {/* Water drops */}
        {waterDrops.map((id) => (
          <motion.span
            key={id}
            className="absolute text-lg pointer-events-none"
            style={{ top: "100%", left: "50%" }}
            initial={{ opacity: 1, y: 0, x: "-50%" }}
            animate={{ opacity: 0, y: 70, x: "-50%" }}
            transition={{ duration: 0.9 }}
          >
            💧
          </motion.span>
        ))}
      </motion.button>

      {/* Progress bar */}
      <div
        className="w-full max-w-xs h-4 rounded-full overflow-hidden"
        style={{
          background: "hsl(var(--card) / 0.4)",
          backdropFilter: "blur(8px)",
          border: "1px solid hsl(var(--border) / 0.3)",
          boxShadow: "inset 0 2px 4px hsl(0 0% 0% / 0.1)",
        }}
      >
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          style={{
            background: progress < 100
              ? "linear-gradient(90deg, hsl(var(--rose-blush)), hsl(var(--primary)), hsl(var(--rose-deep)))"
              : "linear-gradient(90deg, hsl(140, 50%, 50%), hsl(140, 60%, 45%))",
          }}
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Shimmer */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.4), transparent)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
            transition={{ duration: 2, repeat: Infinity, ease: [0, 0, 1, 1] }}
          />
        </motion.div>
      </div>

      <motion.p
        className="font-serif text-sm text-muted-foreground mt-2"
        animate={{ opacity: progress >= 100 ? 0 : 1 }}
      >
        {progress}%
      </motion.p>
    </motion.div>
  );
};

export default WateringStage;
