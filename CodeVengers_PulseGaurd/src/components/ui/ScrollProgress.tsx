import { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, hsl(210 100% 56%), hsl(270 80% 65%))',
        boxShadow: '0 0 10px hsl(210 100% 56% / 0.8)',
      }}
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;
