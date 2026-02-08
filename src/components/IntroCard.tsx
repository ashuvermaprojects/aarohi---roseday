import { motion } from "framer-motion";

interface IntroCardProps {
  onContinue: () => void;
}

const IntroCard = ({ onContinue }: IntroCardProps) => {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.8 }}
    >
      {/* Floating decorative petals around the card */}
      {[...Array(5)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl pointer-events-none select-none"
          style={{
            top: `${20 + i * 15}%`,
            left: i % 2 === 0 ? `${10 + i * 5}%` : undefined,
            right: i % 2 !== 0 ? `${10 + i * 5}%` : undefined,
          }}
          initial={{ opacity: 0, y: 20, rotate: 0 }}
          animate={{
            opacity: [0, 0.7, 0],
            y: [20, -30, -60],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            delay: 1 + i * 0.6,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          🌸
        </motion.span>
      ))}

      <motion.div
        className="relative bg-card/70 backdrop-blur-xl p-10 sm:p-14 rounded-[2rem] text-center max-w-sm w-full overflow-hidden"
        style={{
          boxShadow:
            "0 20px 60px hsl(var(--primary) / 0.2), 0 0 100px hsl(var(--rose-glow) / 0.15), inset 0 1px 0 hsl(0 0% 100% / 0.4)",
          border: "1px solid hsl(var(--rose-blush) / 0.5)",
        }}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Animated glow orb behind content */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(var(--rose-glow) / 0.25), transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
        />

        {/* Decorative rose emoji */}
        <motion.div
          className="text-5xl mb-4"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring", bounce: 0.4 }}
        >
          🌹
        </motion.div>

        <motion.h1
          className="font-cursive text-5xl sm:text-6xl text-primary mb-2 relative z-10"
          style={{ textShadow: "0 2px 20px hsl(var(--rose-glow) / 0.5)" }}
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          Hey Miss
        </motion.h1>

        <motion.div
          className="w-16 h-0.5 mx-auto my-4 rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        />

        <motion.p
          className="font-serif text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          I found something special
          <br />
          in the garden…
        </motion.p>

        <motion.button
          onClick={onContinue}
          className="relative font-serif text-lg px-12 py-4 rounded-full text-primary-foreground overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--rose-deep)), hsl(var(--primary)))",
            backgroundSize: "200% 200%",
            boxShadow: "0 8px 30px hsl(var(--primary) / 0.4), inset 0 1px 0 hsl(0 0% 100% / 0.2)",
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{
            opacity: 1,
            y: 0,
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            opacity: { delay: 1.2, duration: 0.6 },
            y: { delay: 1.2, duration: 0.6 },
            backgroundPosition: { duration: 4, repeat: Infinity, ease: [0, 0, 1, 1] },
          }}
          whileHover={{ scale: 1.06, y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
         Wanna see? 🌸
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default IntroCard;
