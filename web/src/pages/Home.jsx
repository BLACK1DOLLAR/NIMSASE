import { useLoaderData, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ZoomHero from '../components/ZoomHero';
import Reveal from '../components/Reveal';
import Magnetic from '../components/Magnetic';
import StatCounter from '../components/StatCounter';
import { AngularDivider } from '../components/SectionDivider';

const QUICK_ACTIONS = [
  { to: '/leadership', title: 'Meet Executives', sub: 'Regional leadership team', bg: 'var(--green-light)', fg: 'var(--green-primary)' },
  { to: '/events', title: 'Upcoming Events', sub: 'Webinars, conventions & more', bg: 'var(--gold-light)', fg: 'var(--gold-dark)' },
  { to: '/join', title: 'Register Now', sub: 'Become a member today', bg: '#e8f5e9', fg: 'var(--green-primary)' },
  { to: '/bulletin', title: 'Download Bulletin', sub: 'Monthly newsletter', bg: 'var(--green-light)', fg: 'var(--green-primary)' },
];

export default function Home() {
  const data = useLoaderData();

  const settings = data?.settings || {};
  const events = data?.upcomingEvents || [];
  const execs = data?.featuredExecs || [];
  const news = data?.latestNews || [];
  const bulletin = data?.latestBulletin;
  const heroImages = settings.heroImage ? [settings.heroImage] : [];
  const schoolCount = data?.institutionsCount != null ? String(data.institutionsCount) : '13';

  return (
    <>
      <Helmet>
        <title>Home — NiMSA South East Region</title>
      </Helmet>

      <ZoomHero images={heroImages} watermark={settings.watermarkImage} watermarkText={settings.watermarkText}>
        <Reveal as="div" className="eyebrow" style={{ background: 'rgba(201,168,76,0.18)', border: '1px solid rgba(201,168,76,0.6)', color: 'var(--gold)' }}>
          🏆 Ever Solid Region of NiMSA
        </Reveal>
        <Reveal delay={0.1}>
          <h1 style={{ color: 'white', maxWidth: 760 }}>
            Uniting Medical<br />Students of the<br />
            <span className="highlight" style={{ color: 'var(--gold)' }}>South East Region</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p style={{ color: 'rgba(255,255,255,0.92)', maxWidth: 520, fontSize: '1.05rem', margin: '1.4rem 0 2.2rem' }}>
            Advocacy. Outreach. Excellence. The NiMSA South East Region represents over 3,500 medical students across Abia, Anambra, Ebonyi, Enugu, and Imo states.
          </p>
        </Reveal>
        <Reveal delay={0.3} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Magnetic as="a" href="/join" className="btn btn-gold btn-lg">Join NiMSA SE</Magnetic>
          <Magnetic as={Link} to="/about" className="btn btn-outline btn-lg">Learn More</Magnetic>
        </Reveal>
        <div className="stat-row">
          {[{ v: schoolCount, l: 'Member Schools' }, { v: '3,500+', l: 'Medical Students' }, { v: '5', l: 'Southeast States' }, { v: '1968', l: 'Est. NiMSA' }].map(s => (
            <div key={s.l}>
              <StatCounter value={s.v} />
              <div className="stat-label">{s.l}</div>
            </div>
          ))}
        </div>
      </ZoomHero>
      <AngularDivider toColor="white" fromColor="var(--green-deep)" />

      {/* QUICK ACTIONS */}
      <section style={{ background: 'white', padding: '2rem 0' }}>
        <div className="container">
          <div className="grid-4">
            {QUICK_ACTIONS.map((a, i) => (
              <Reveal key={a.to} delay={i * 0.06} style={{ height: '100%' }}>
                <Link to={a.to} className="card" style={{ padding: '1.6rem', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', boxSizing: 'border-box' }}>
                  <div style={{ width: 52, height: 52, background: a.bg, color: a.fg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.8rem' }}>
                    <svg width="26" height="26" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--green-deep)', fontSize: '0.9rem' }}>{a.title}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{a.sub}</div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      {events.length > 0 && (
        <section className="section">
          <div className="container">
            <Reveal className="section-header">
              <div className="eyebrow">What's Happening</div>
              <h2>Upcoming Events</h2>
              <p>Join medical students across the Southeast Region at our upcoming programs and activities.</p>
              <div className="gold-line" />
            </Reveal>
            <div className="grid-3">
              {events.map((ev, i) => (
                <Reveal key={ev._id} delay={i * 0.1} className="card">
                  <div style={{ height: 165, background: 'linear-gradient(135deg,var(--green-primary),var(--green-deep))', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {ev.image
                      ? <img src={ev.image} alt={ev.title} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <svg width="48" height="48" fill="rgba(255,255,255,0.2)" viewBox="0 0 24 24"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>}
                    <span className="badge badge-gold" style={{ position: 'absolute', top: '0.8rem', right: '0.8rem' }}>{ev.type}</span>
                  </div>
                  <div style={{ padding: '1.2rem' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--green-deep)', fontSize: '1.05rem', marginBottom: '0.4rem' }}>{ev.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.7rem' }}>🕐 {ev.time} · 📍 {ev.location}</div>
                    <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)' }}>{ev.description?.slice(0, 100)}...</p>
                  </div>
                  <div style={{ padding: '0.8rem 1.2rem', borderTop: '1px solid var(--green-light)' }}>
                    <a href={ev.registrationLink} className="btn btn-gold btn-sm" style={{ width: '100%', justifyContent: 'center' }}>Register</a>
                  </div>
                </Reveal>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Magnetic as={Link} to="/events" className="btn btn-outline-gold btn-lg">View All Events</Magnetic>
            </div>
          </div>
        </section>
      )}

      {/* ABOUT TEASER */}
      <section className="section section-alt">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '3rem' }}>
            <Reveal>
              <div className="eyebrow">About NiMSA SE</div>
              <h2 style={{ margin: '0.8rem 0 1.2rem' }}>The Most Exceptional<br />Region of NiMSA</h2>
              <p style={{ marginBottom: '1rem' }}>
                The <strong>Nigerian Medical Students' Association (NiMSA)</strong>, founded in <strong>1968</strong>, is the official umbrella body for all medical students in Nigeria and a full member of <strong>IFMSA</strong> — linking our students to global medical exchange opportunities.
              </p>
              <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>
                The NiMSA South East Region unites <strong>{schoolCount} member associations</strong> across 5 states, governed by the <strong>Regional Coordinator</strong> and Regional Executive Council (REC).
              </p>
              <Magnetic as={Link} to="/about" className="btn btn-green">Learn More About Us</Magnetic>
            </Reveal>
            <Reveal delay={0.15} style={{ background: 'linear-gradient(155deg,var(--green-deep),var(--green-primary))', padding: '2rem', textAlign: 'center', color: 'white' }}>
              <img src="/logo.jpg" alt="NiMSA SE" width="90" height="90" style={{ borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--gold)', margin: '0 auto 1rem' }} />
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>South East Region</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginTop: '1.5rem' }}>
                {[{ v: schoolCount, l: 'Schools' }, { v: '5', l: 'States' }, { v: '1968', l: 'Founded' }, { v: 'IFMSA', l: 'Member' }].map(s => (
                  <div key={s.l} style={{ background: 'rgba(255,255,255,0.07)', padding: '0.9rem', border: '1px solid rgba(201,168,76,0.2)' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--gold)' }}>{s.v}</div>
                    <div style={{ fontSize: '0.65rem', opacity: 0.65, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* LEADERSHIP TEASER */}
      {execs.length > 0 && (
        <section className="section">
          <div className="container">
            <Reveal className="section-header">
              <div className="eyebrow">Our Leadership</div>
              <h2>Regional Executive Council</h2>
              <div className="gold-line" />
            </Reveal>
            <div className="grid-3">
              {execs.map((exec, i) => (
                <Reveal key={exec._id} delay={i * 0.1} className="card" style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', margin: '1.8rem auto 1.1rem' }}>
                    {exec.photo
                      ? <img src={exec.photo} alt={exec.name} width="90" height="90" loading="lazy" decoding="async" style={{ borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--gold)' }} />
                      : <div style={{ width: 90, height: 90, borderRadius: '50%', border: '2px solid var(--gold)', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--green-primary)' }}>{exec.name.charAt(0)}</div>}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem' }}>{exec.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--gold-dark)', fontWeight: 600, textTransform: 'uppercase', margin: '0.3rem 0' }}>{exec.position}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>{exec.school}</div>
                  {exec.whatsapp && (
                    <div style={{ padding: '0.9rem', borderTop: '1px solid var(--green-light)' }}>
                      <a href={`https://wa.me/${exec.whatsapp}`} target="_blank" rel="noopener" className="btn btn-whatsapp btn-sm">WhatsApp</a>
                    </div>
                  )}
                </Reveal>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Magnetic as={Link} to="/leadership" className="btn btn-outline-gold btn-lg">View Full Leadership</Magnetic>
            </div>
          </div>
        </section>
      )}

      {/* LATEST NEWS */}
      {news.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <Reveal className="section-header">
              <div className="eyebrow">Latest News</div>
              <h2>News & Updates</h2>
              <div className="gold-line" />
            </Reveal>
            <div className="grid-3">
              {news.map((item, i) => (
                <Reveal key={item._id} delay={i * 0.1} className="card">
                  <div style={{ height: 140, background: 'linear-gradient(135deg,var(--green-primary),var(--green-deep))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="40" height="40" fill="rgba(255,255,255,0.3)" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                  </div>
                  <div style={{ padding: '1rem 1.2rem' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>{new Date(item.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', marginBottom: '0.4rem' }}>{item.title}</div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.excerpt?.slice(0, 100)}...</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BULLETIN CTA */}
      {bulletin && (
        <section className="section">
          <div className="container">
            <Reveal className="grid-2" style={{ background: 'linear-gradient(140deg,var(--green-deep),#005200)', padding: '3rem', gap: '3rem', alignItems: 'center', border: '1px solid rgba(201,168,76,0.25)' }}>
              <div>
                <span className="badge badge-gold">{bulletin.issue}</span>
                <h2 style={{ color: 'white', margin: '0.8rem 0' }}>{bulletin.title}</h2>
                <p style={{ color: 'rgba(255,255,255,0.72)', marginBottom: '1.5rem' }}>{bulletin.summary}</p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a href={bulletin.pdfUrl} target="_blank" rel="noopener" className="btn btn-gold">📥 Download Issue</a>
                  <Link to="/bulletin" className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}>View Archive</Link>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>THE PULSE</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: 'white' }}>{bulletin.month}</div>
                <div style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)' }}>{bulletin.year}</div>
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
