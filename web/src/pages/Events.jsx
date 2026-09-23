import { useMemo, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Reveal from '../components/Reveal';

const TYPES = ['all', 'Webinar', 'Convention', 'Workshop', 'Campaign'];

function EventCard({ event, i }) {
  return (
    <Reveal delay={i * 0.05} className="card">
      <div style={{ height: 165, background: 'linear-gradient(135deg,var(--green-primary),var(--green-deep))', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {event.image
          ? <img src={event.image} alt={event.title} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <svg width="48" height="48" fill="rgba(255,255,255,0.2)" viewBox="0 0 24 24"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>}
        <span className="badge badge-gold" style={{ position: 'absolute', top: '0.8rem', right: '0.8rem' }}>{event.type}</span>
        <span style={{ position: 'absolute', top: '0.8rem', left: '0.8rem', background: 'rgba(0,0,0,0.55)', color: 'white', fontSize: '0.72rem', fontWeight: 600, padding: '0.22rem 0.65rem', backdropFilter: 'blur(4px)' }}>
          {new Date(event.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })}
        </span>
      </div>
      <div style={{ padding: '1.2rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.4rem' }}>{event.title}</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.7rem' }}>🕐 {event.time} · 📍 {event.location}</div>
        <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)' }}>{event.description}</p>
      </div>
      <div style={{ padding: '0.8rem 1.2rem', borderTop: '1px solid var(--green-light)' }}>
        <a href={event.registrationLink} target="_blank" rel="noopener" className="btn btn-gold btn-sm" style={{ width: '100%', justifyContent: 'center' }}>Register</a>
      </div>
    </Reveal>
  );
}

export default function Events() {
  const data = useLoaderData();
  const [type, setType] = useState('all');

  const events = data?.events || [];
  const filtered = type === 'all' ? events : events.filter(e => e.type === type);
  const upcoming = useMemo(() => filtered.filter(e => e.status === 'upcoming'), [filtered]);
  const past = useMemo(() => filtered.filter(e => e.status === 'past'), [filtered]);

  return (
    <>
      <Helmet><title>Events — NiMSA South East Region</title></Helmet>
      <div className="page-hero">
        <div className="page-hero-content">
          <Reveal className="eyebrow">Events & Programs</Reveal>
          <Reveal delay={0.1}><h1>What We're Up To</h1></Reveal>
          <Reveal delay={0.2}><p>Webinars, conventions, campaigns, workshops — find and register for events shaping Southeast medical education.</p></Reveal>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
            {TYPES.map(t => (
              <button key={t} onClick={() => setType(t)} className="btn btn-sm"
                style={{ background: type === t ? 'var(--green-primary)' : 'transparent', color: type === t ? 'white' : 'var(--text-muted)', border: '1.5px solid var(--border)' }}>
                {t === 'all' ? 'All Events' : `${t}s`}
              </button>
            ))}
          </div>

          {upcoming.length > 0 && (
            <>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--green-deep)' }}>Upcoming Events</h3>
              <div className="grid-3" style={{ marginBottom: '4rem' }}>
                {upcoming.map((ev, i) => <EventCard key={ev._id} event={ev} i={i} />)}
              </div>
            </>
          )}
          {past.length > 0 && (
            <>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--green-deep)' }}>Past Events</h3>
              <div className="grid-3">
                {past.map((ev, i) => <EventCard key={ev._id} event={ev} i={i} />)}
              </div>
            </>
          )}
          {filtered.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem 0' }}>No events in this category yet.</p>}
        </div>
      </section>
    </>
  );
}
