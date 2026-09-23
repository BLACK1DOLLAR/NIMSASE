import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Reveal from '../components/Reveal';
import AdminNotice from '../components/AdminNotice';

export default function Bulletin() {
  const data = useLoaderData();
  const [q, setQ] = useState('');

  const featured = data?.featured;
  const archive = data?.archive || [];
  const filtered = archive.filter(b => `${b.month} ${b.year} ${b.title}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <Helmet><title>Monthly Bulletin — NiMSA South East Region</title></Helmet>
      <div className="page-hero">
        <div className="page-hero-content">
          <Reveal className="eyebrow">Monthly Bulletin</Reveal>
          <Reveal delay={0.1}><h1>The Pulse</h1></Reveal>
          <Reveal delay={0.2}><p>NiMSA South East Region's official monthly newsletter — your connection to regional news, events, and opportunities.</p></Reveal>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {featured && (
            <Reveal className="grid-2" style={{ background: 'linear-gradient(140deg,var(--green-deep),#003a00 60%,#005200)', padding: '3rem', gap: '3rem', alignItems: 'center', border: '1px solid rgba(201,168,76,0.25)', marginBottom: '4rem' }}>
              <div>
                <span className="badge badge-gold">{featured.issue} — Latest Issue</span>
                <h2 style={{ color: 'white', margin: '1rem 0 0.8rem' }}>{featured.title}</h2>
                <p style={{ color: 'rgba(255,255,255,0.72)', marginBottom: '1.5rem' }}>{featured.summary}</p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a href={featured.pdfUrl} target="_blank" rel="noopener" className="btn btn-gold">📥 Download PDF</a>
                  <a href={featured.pdfUrl} target="_blank" rel="noopener" className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}>👁 Read Online</a>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>NiMSA SE</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 800, color: 'white' }}>{featured.month?.slice(0, 3).toUpperCase()}</div>
                <div style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)' }}>{featured.year}</div>
              </div>
            </Reveal>
          )}

          {archive.length > 0 && (
            <>
              <Reveal className="section-header" style={{ marginBottom: '2rem' }}>
                <div className="eyebrow">Past Issues</div>
                <h2>Bulletin Archive</h2>
                <div className="gold-line" />
              </Reveal>
              <div style={{ maxWidth: 400, margin: '0 auto 2rem' }}>
                <input type="text" className="form-control" placeholder="🔍 Search bulletins by month or year..." value={q} onChange={e => setQ(e.target.value)} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '1.2rem' }}>
                {filtered.map((b, i) => (
                  <Reveal key={b._id} delay={i * 0.04} className="card">
                    <div style={{ height: 200, background: 'linear-gradient(160deg,var(--green-primary),var(--green-deep))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {b.coverImage
                        ? <img src={b.coverImage} alt={b.title} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <div style={{ textAlign: 'center', color: 'white' }}>
                            <div style={{ fontSize: '0.68rem', color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase' }}>{b.issue}</div>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700 }}>{b.month?.slice(0, 3).toUpperCase()}</div>
                            <div style={{ fontSize: '0.9rem', opacity: 0.65 }}>{b.year}</div>
                          </div>}
                    </div>
                    <div style={{ padding: '1rem 1.2rem' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.93rem', marginBottom: '0.4rem' }}>{b.title}</div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>{b.summary?.slice(0, 80)}...</p>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <a href={b.pdfUrl} target="_blank" rel="noopener" className="btn btn-sm btn-gold">📥 Download</a>
                        <a href={b.pdfUrl} target="_blank" rel="noopener" className="btn btn-sm btn-outline-gold">Read</a>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </>
          )}

          <Reveal style={{ background: 'var(--green-pale)', padding: '3rem', textAlign: 'center', marginTop: '4rem', border: '1px solid var(--border)' }}>
            <div className="eyebrow">Stay Connected</div>
            <h3 style={{ margin: '0.8rem 0' }}>Get The Pulse in Your Inbox</h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: 400, margin: '0 auto 1.5rem' }}>Subscribe to receive the NiMSA SE monthly bulletin directly in your email.</p>
            <form action="https://formspree.io/f/xvzwjpqd" method="POST" style={{ display: 'flex', gap: '0.8rem', maxWidth: 400, margin: '0 auto', flexWrap: 'wrap' }}>
              <input type="email" name="email" placeholder="your@email.com" className="form-control" style={{ flex: 1, minWidth: 200 }} required />
              <button type="submit" className="btn btn-gold">Subscribe</button>
            </form>
          </Reveal>
          <AdminNotice href="/admin/bulletin">Manage bulletins — upload new issues and manage the archive.</AdminNotice>
        </div>
      </section>
    </>
  );
}
