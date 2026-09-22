import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Background image(s) slowly zoom, then crossfade to the next image and repeat.
 * Falls back to the static brand gradient when no images are provided.
 */
export default function ZoomHero({ images = [], intervalMs = 7000, className = 'zoom-hero', watermark, watermarkText, children }) {
  const [index, setIndex] = useState(0);
  const hasImages = images.length > 0;

  useEffect(() => {
    if (!hasImages || images.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setIndex(i => (i + 1) % images.length), intervalMs);
    return () => clearInterval(id);
  }, [hasImages, images.length, intervalMs]);

  return (
    <section className={className}>
      {hasImages && (
        <AnimatePresence>
          <motion.div
            key={index}
            className="zoom-hero-layer"
            style={{ backgroundImage: `url(${images[index]})` }}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.12 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.2 }, scale: { duration: intervalMs / 1000 + 1.2, ease: 'linear' } }}
          />
        </AnimatePresence>
      )}
      <div className="zoom-hero-overlay" />
      <div className="zoom-hero-content">{children}</div>
      {watermark && (
        <div className="hero-watermark">
          <img src={watermark} alt={watermarkText || 'Face of NiMSA SE'} />
          {watermarkText && <div className="hero-watermark-caption">{watermarkText}</div>}
        </div>
      )}
    </section>
  );
}
