import { useEffect } from 'react';
import Lenis from 'lenis';

let instance = null;

/** The active Lenis instance, or null (reduced motion / not mounted yet). */
export const getLenis = () => instance;

export default function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    instance = lenis;
    let frame;
    const raf = (time) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(frame); lenis.destroy(); instance = null; };
  }, []);
}
