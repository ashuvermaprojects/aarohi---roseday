import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FallingPetals from "@/components/FallingPetals";
import BokehLights from "@/components/BokehLights";
import FloatingSparkles from "@/components/FloatingSparkles";
import IntroCard from "@/components/IntroCard";
import WateringStage from "@/components/WateringStage";
import EnvelopeReveal from "@/components/EnvelopeReveal";
import HeroRose from "@/components/HeroRose";
import MessageReveal from "@/components/MessageReveal";
import KeepRoseButton from "@/components/KeepRoseButton";
import HeartAnimation from "@/components/HeartAnimation";
import MemoryCard from "@/components/MemoryCard";
import MusicToggle from "@/components/MusicToggle";
import Flipbook from "@/components/Flipbook";
import roseGardenBg from "@/assets/rose-garden-bg.jpg";

type Stage = "intro" | "watering" | "envelope" | "rose" | "message" | "flipbook" | "hearts" | "memory";

const Index = () => {
  const [stage, setStage] = useState<Stage>("intro");
  const [heartActive, setHeartActive] = useState(false);

  const handleBloom = () => setStage("message");
  const handleKeepRose = () => {
    setStage("flipbook");
  };
  const handleFlipbookComplete = () => {
    setHeartActive(true);
    setStage("hearts");
  };
  const handleHeartsComplete = useCallback(() => {
    setHeartActive(false);
    setStage("memory");
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <div
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${roseGardenBg})`,
          filter: "blur(8px) brightness(0.7)",
          transform: "scale(1.05)",
        }}
      />

      {/* Soft overlay */}
      <div
        className="fixed inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, hsl(340 30% 97% / 0.6) 0%, hsl(340 30% 95% / 0.4) 50%, hsl(340 30% 90% / 0.6) 100%)",
        }}
      />

      {/* Ambient effects */}
      <FallingPetals />
      <BokehLights />
      <FloatingSparkles />

      {/* Heart animation overlay */}
      <HeartAnimation active={heartActive} onComplete={handleHeartsComplete} />

      {/* Main content */}
      <main className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <AnimatePresence mode="wait">
          {stage === "intro" && (
            <motion.div key="intro" exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              <IntroCard onContinue={() => setStage("watering")} />
            </motion.div>
          )}

          {stage === "watering" && (
            <motion.div key="watering" exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              <WateringStage onComplete={() => setStage("envelope")} />
            </motion.div>
          )}

          {stage === "envelope" && (
            <motion.div key="envelope" exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              <EnvelopeReveal onContinue={() => setStage("rose")} />
            </motion.div>
          )}

          {stage === "rose" && (
            <motion.div
              key="rose"
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
            >
              <motion.h1
                className="font-cursive text-4xl sm:text-5xl md:text-6xl text-foreground text-glow mb-8 text-center"
                style={{ position: "relative", zIndex: 60 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
              >
                Happy Rose Day
              </motion.h1>
              <HeroRose onBloom={handleBloom} />
            </motion.div>
          )}

          {stage === "message" && (
            <motion.div
              key="message"
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
            >
              <MessageReveal />
              <motion.p
                className="font-cursive text-2xl sm:text-3xl md:text-4xl text-foreground text-glow text-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 13, duration: 1 }}
              >
                
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 13.5, duration: 0.8 }}
              >
                <KeepRoseButton onClick={handleKeepRose} />
              </motion.div>
            </motion.div>
          )}

          {stage === "flipbook" && (
            <motion.div
              key="flipbook"
              className="flex flex-col items-center w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Flipbook onComplete={handleFlipbookComplete} />
            </motion.div>
          )}

          {stage === "memory" && (
            <motion.div
              key="memory"
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
            >
              <motion.p
                className="font-cursive text-3xl sm:text-4xl md:text-5xl text-foreground text-glow text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                8 billion peoples in the world,
              </motion.p>
              <motion.p
                className="font-cursive text-4xl sm:text-5xl md:text-6xl text-foreground text-glow text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 1.2 }}
              >
                And i got...
              </motion.p>
              <MemoryCard revealDelay={3} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom corner text */}
        <motion.p
          className="fixed bottom-6 left-6 z-30 font-serif text-xs text-muted-foreground/60 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1.5 }}
        >
          Since 24th june 2008, this rose is just keep blooming.
        </motion.p>
      </main>

      {/* Music toggle */}
      <MusicToggle />
    </div>
  );
};

export default Index;
