import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const mainMessage = `It is not really about rose day,

This is just a small surprise to remind you that;
How much you mean to me,
How much you matter to me,
And how precious you are in my eyes <3.`;

const secondaryMessage = `You're really special in ways words can never explain.`;
const thankYouMessage = `Thank you so much for being in my life ♥️`;

const MessageReveal = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [showSecondary, setShowSecondary] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const timers: Array<number | ReturnType<typeof setTimeout>> = [];
    const interval = setInterval(() => {
      if (i < mainMessage.length) {
        setDisplayedText(mainMessage.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setDone(true);
        // show thank-you immediately after typing finishes
        timers.push(setTimeout(() => setShowThankYou(true), 0));
        // show secondary 1 second after thank-you appears
        timers.push(setTimeout(() => setShowSecondary(true), 1000));
      }
    }, 50);

    return () => {
      clearInterval(interval);
      timers.forEach((t) => clearTimeout(t as number));
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 max-w-lg mx-auto px-6">
      <motion.div
        className="relative text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Glow behind text */}
        <div
          className="absolute inset-0 -m-8 rounded-3xl opacity-30"
          style={{
            background: "radial-gradient(ellipse, hsl(340 80% 70% / 0.4), transparent 70%)",
            filter: "blur(30px)",
          }}
        />
        <p className="font-cursive text-3xl sm:text-4xl md:text-5xl text-foreground text-glow whitespace-pre-line leading-relaxed relative z-10">
          {displayedText}
          {!done && (
            <motion.span
              className="inline-block w-0.5 h-8 bg-primary ml-1 align-middle"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          )}
        </p>
      </motion.div>

      <AnimatePresence>
        {showThankYou && (
          <motion.p
            className="font-cursive text-2xl sm:text-3xl md:text-4xl text-foreground text-glow text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0 }}
          >
            {thankYouMessage}
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSecondary && (
          <motion.p
            className="font-serif text-lg sm:text-xl text-muted-foreground italic text-center mt-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            {secondaryMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MessageReveal;
