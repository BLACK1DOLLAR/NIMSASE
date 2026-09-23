import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/** Wraps any element (typically a button/link) with a cursor-follow rubber effect. */
export default function Magnetic({ children, strength = 0.35, as: Component = motion.div, className, ...rest }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  const handleMove = (e) => {
    if (!ref.current || !window.matchMedia('(pointer: fine)').matches) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <Component
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...rest}
    >
      {children}
    </Component>
  );
}
