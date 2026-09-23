import { useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Reveal from '../components/Reveal';
import AdminNotice from '../components/AdminNotice';

export default function News() {
  const data = useLoaderData();
  const featured = data?.featured;
  const rest = data?.rest || [];

  return (
    <>
      <Helmet><title>News & Stories — NiMSA South East Region</title></Helmet>
      <div className="page-hero">
        <div className="page-hero-content">
          <Reveal className="eyebrow">News & Stories</Reveal>
          <Reveal delay={0.1}><h1>Latest from NiMSA SE</h1></Reveal>
          <Reveal delay={0.2}><p>Achievements, outreach reports, announcements, and success stories from across the South East Region.</p></Reveal>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <AdminNotice href="/admin/news" style={{ marginTop: 0, marginBottom: '2rem' }}>Manage news posts — add, edit, or remove news articles.</AdminNotice>
          {featured && (
            <Reveal className="grid-2" style={{ gap: '2rem', marginBottom: '4rem' }}>
              <div style={{ borderRadius: 0, height: 340, background: 'linear-gradient(135deg,var(--green-primary),var(--green-deep))', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
                <div style={{ color: 'white' }}>
                  <span className="badge badge-gold">{featured.category}</span>
                  <h2 style={{ color: 'white', fontSize: '1.6rem', margin: '1rem 0' }}>{featured.title}</h2>
                  <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem' }}>{new Date(featured.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span className="badge badge-gold" style={{ width: 'fit-content', marginBottom: '1rem' }}>{featured.category}</span>
                <h2 style={{ marginBottom: '1rem' }}>{featured.title}</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '0.8rem', fontSize: '0.85rem' }}>
                  {new Date(featured.date).toLocaleDateString('en-NG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <p style={{ marginBottom: '1.5rem' }}>{featured.excerpt}</p>
              </div>
            </Reveal>
          )}

          {rest.length > 0 && (
            <>
              <h3 style={{ marginBottom: '1.5rem' }}>More Stories</h3>
              <div className="grid-3">
                {rest.map((item, i) => (
                  <Reveal key={item._id} delay={i * 0.06} className="card">
                    <div style={{ height: 140, background: 'linear-gradient(135deg,var(--green-primary),var(--green-deep))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {item.image
                        ? <img src={item.image} alt={item.title} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <span className="badge badge-gold">{item.category}</span>}
                    </div>
                    <div style={{ padding: '1rem 1.2rem' }}>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>{new Date(item.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '0.4rem' }}>{item.title}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.excerpt?.slice(0, 110)}...</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </>
          )}

          {!featured && rest.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
              <h3>No news posts yet</h3>
              <p>Check back soon for updates from NiMSA SE.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
