import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EnvelopeRevealProps {
  onContinue: () => void;
}

const EnvelopeReveal = ({ onContinue }: EnvelopeRevealProps) => {
  const [opened, setOpened] = useState(false);
  const [introPlaying, setIntroPlaying] = useState(false);
  const [showText1, setShowText1] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const [overlayFade, setOverlayFade] = useState(false);

  useEffect(() => {
    const timers: Array<number | ReturnType<typeof setTimeout>> = [];
    if (introPlaying) {
      // sequence timings roughly matching the provided GSAP timeline
      setShowText1(true);

      // hide text1 after 3s
      timers.push(setTimeout(() => setShowText1(false), 3000));

      // show text2 after 3.5s
      timers.push(setTimeout(() => setShowText2(true), 3500));

      // hide text2 after 3.5s + 4s
      timers.push(setTimeout(() => setShowText2(false), 3500 + 4000));

      // start overlay fade after text2 finishes (approx)
      timers.push(setTimeout(() => setOverlayFade(true), 3500 + 4000 + 500));

      // finally call onContinue after overlay faded
      timers.push(
        setTimeout(() => {
          setIntroPlaying(false);
          setOverlayFade(false);
          // proceed to next stage
          onContinue();
        }, 3500 + 4000 + 500 + 1500)
      );
    }

    return () => {
      timers.forEach((t) => clearTimeout(t as number));
    };
  }, [introPlaying, onContinue]);

  return (
    <motion.div
      className="flex flex-col items-center text-center max-w-md w-full px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
    >
      <motion.p
        className="font-cursive text-3xl sm:text-4xl text-foreground text-glow mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Okay so, i've smth to tell You 🥰
      </motion.p>

      {!opened && (
        <motion.p
          className="font-serif text-muted-foreground italic mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Tap to open
        </motion.p>
      )}

      {/* Envelope */}
      <motion.div
        className="relative w-72 sm:w-80 h-48 sm:h-52 rounded-xl cursor-pointer mx-auto"
        style={{
          background: "linear-gradient(to bottom, hsl(var(--rose-blush)), hsl(var(--primary)))",
          boxShadow: "0 15px 35px hsl(var(--primary) / 0.25)",
        }}
        onClick={() => {
          if (!opened) setOpened(true);
        }}
        whileHover={!opened && !introPlaying ? { y: -8, scale: 1.02 } : {}}
        transition={{ duration: 0.4 }}
      >
        {/* Envelope flap pattern */}
        {!opened && (
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              background: "linear-gradient(45deg, transparent 48%, hsl(0 0% 100% / 0.2) 50%, transparent 52%)",
            }}
          />
        )}

        {/* Heart seal */}
        {!opened && (
          <motion.span
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl z-10"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💗
          </motion.span>
        )}

        {/* Letter inside - only show after introPlaying sequence completes (opened === true) */}
        <AnimatePresence>
          {opened && (
            <motion.div
              className="absolute inset-3 bg-card rounded-lg p-5 sm:p-6 text-left overflow-hidden shadow-inner"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h3
                className="font-cursive text-2xl sm:text-3xl text-primary mb-3 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Dear aarohi
              </motion.h3>
              <motion.p
                className="font-serif text-xs sm:text-sm text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                Happy rose day! Just like the roses, you bring lots of color and fragrance to my life.
                Every single petal falling in background represents a smile you've gave me. You make me the happiest 🌹
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Cinematic intro overlay triggered on envelope click */}
      <AnimatePresence>
        {introPlaying && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center flex-col bg-black z-50"
            initial={{ opacity: 1 }}
            animate={overlayFade ? { opacity: 0 } : { opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <motion.div
              className="cinematic-text text-white text-center max-w-xl px-6"
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "1.4rem",
                pointerEvents: "none",
                textShadow: "0 0 15px rgba(255,255,255,0.75)",
                letterSpacing: "1px",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={showText1 ? { opacity: 1, y: 0 } : { opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              A Veryyyy Happy Rose Dayyy!!
            </motion.div>

            <motion.div
              className="cinematic-text text-white text-center max-w-xl px-6 mt-4"
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "1.05rem",
                pointerEvents: "none",
                textShadow: "0 0 12px rgba(255,255,255,0.6)",
                letterSpacing: "0.6px",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={showText2 ? { opacity: 1, y: 0 } : { opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              To the prettiesttt <i>Rose</i> i knowwww 😊🌹<br />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue button */}
      <AnimatePresence>
        {opened && (
          <motion.button
            onClick={() => {
              if (!introPlaying) setIntroPlaying(true);
            }}
            className="mt-8 font-serif text-lg text-primary hover:text-foreground transition-colors"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            whileHover={{ x: 5 }}
            disabled={introPlaying}
          >
            So i want to wish you →
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EnvelopeReveal;
