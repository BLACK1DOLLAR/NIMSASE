import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/** Animates "13", "3,500+", "1968" style text into view; leaves non-numeric text ("IFMSA") untouched. */
export default function StatCounter({ value, duration = 1200 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) return;
    const match = String(value).match(/^([\d,]+)(.*)$/);
    if (!match || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setDisplay(value); return; }
    const target = parseInt(match[1].replace(/,/g, ''), 10);
    const suffix = match[2];
    if (Number.isNaN(target)) { setDisplay(value); return; }
    const start = performance.now();
    let raf;
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(target * eased).toLocaleString('en-US') + suffix);
      if (progress < 1) raf = requestAnimationFrame(step);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return <motion.div ref={ref} className="stat-num">{display}</motion.div>;
}
