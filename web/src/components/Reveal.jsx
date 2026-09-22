import { motion } from 'framer-motion';

/** Scroll-triggered reveal — text/sections rise and fade in as they enter the viewport. */
export default function Reveal({ children, delay = 0, y = 26, as = 'div', className, once = true, ...rest }) {
  const Component = motion[as] || motion.div;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </Component>
  );
}
