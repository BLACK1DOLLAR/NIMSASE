import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from '../components/Reveal';
import { apiGet } from '../lib/api';

const CATS = [
  { key: 'all', label: 'All Photos' },
  { key: 'convention', label: 'Conventions' },
  { key: 'webinar', label: 'Webinars' },
  { key: 'campaign', label: 'Campaigns' },
  { key: 'outreach', label: 'Outreaches' },
  { key: 'campus', label: 'Campus Life' },
];

export default function Gallery() {
  const [data, setData] = useState(null);
  const [cat, setCat] = useState('all');
  const [lightbox, setLightbox] = useState(null); // index into filtered
  useEffect(() => { apiGet('/gallery').then(setData); }, []);

  const photos = data?.photos || [];
  const filtered = cat === 'all' ? photos : photos.filter(p => p.category === cat);

  useEffect(() => {
    function onKey(e) {
      if (lightbox === null) return;
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox(i => (i + 1) % filtered.length);
      if (e.key === 'ArrowLeft') setLightbox(i => (i - 1 + filtered.length) % filtered.length);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, filtered.length]);

  return (
    <>
      <Helmet><title>Gallery — NiMSA South East Region</title></Helmet>
      <div className="page-hero">
        <div className="page-hero-content">
          <Reveal className="eyebrow">Gallery</Reveal>
          <Reveal delay={0.1}><h1>Moments & Memories</h1></Reveal>
          <Reveal delay={0.2}><p>A visual record of NiMSA SE's conventions, outreaches, webinars, and campus life across the Southeast Region.</p></Reveal>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
            {CATS.map(c => (
              <button key={c.key} onClick={() => setCat(c.key)} className="btn btn-sm"
                style={{ background: cat === c.key ? 'var(--green-primary)' : 'transparent', color: cat === c.key ? 'white' : 'var(--text-muted)', border: '1.5px solid var(--border)' }}>
                {c.label}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div style={{ columns: 4, gap: '1rem' }} className="gallery-masonry">
              {filtered.map((photo, i) => (
                <Reveal key={photo._id} delay={i * 0.02} style={{ breakInside: 'avoid', marginBottom: '1rem', cursor: 'pointer', position: 'relative' }} onClick={() => setLightbox(i)}>
                  <img src={photo.url} alt={photo.caption || photo.category} loading="lazy" decoding="async" style={{ width: '100%', display: 'block' }} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📷</div>
              <h3 style={{ color: 'var(--text-muted)' }}>No photos yet</h3>
              <p style={{ color: 'var(--text-muted)', maxWidth: 400, margin: '0.8rem auto 0' }}>Photos from regional events and outreaches will appear here once uploaded.</p>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightbox !== null && filtered[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
            onClick={() => setLightbox(null)}
          >
            <button onClick={() => setLightbox(null)} aria-label="Close" style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer', minWidth: 44, minHeight: 44 }}>✕</button>
            <button onClick={(e) => { e.stopPropagation(); setLightbox(i => (i - 1 + filtered.length) % filtered.length); }} aria-label="Previous" style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', width: 48, height: 48, borderRadius: '50%', cursor: 'pointer', fontSize: '1.5rem' }}>‹</button>
            <img src={filtered[lightbox].url} alt={filtered[lightbox].caption} style={{ maxWidth: '90vw', maxHeight: '80vh', objectFit: 'contain' }} onClick={e => e.stopPropagation()} />
            <button onClick={(e) => { e.stopPropagation(); setLightbox(i => (i + 1) % filtered.length); }} aria-label="Next" style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', width: 48, height: 48, borderRadius: '50%', cursor: 'pointer', fontSize: '1.5rem' }}>›</button>
            {filtered[lightbox].caption && <div style={{ color: 'rgba(255,255,255,0.8)', marginTop: '1rem' }}>{filtered[lightbox].caption}</div>}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
