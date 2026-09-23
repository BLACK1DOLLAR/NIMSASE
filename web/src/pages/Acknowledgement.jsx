import { useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Reveal from '../components/Reveal';
import AdminNotice from '../components/AdminNotice';

export default function Acknowledgement() {
  const data = useLoaderData();
  const settings = data?.settings || {};
  const collaborators = data?.collaborators || [];

  return (
    <>
      <Helmet><title>Acknowledgement — NiMSA South East Region</title></Helmet>
      <div className="page-hero">
        <div className="page-hero-content">
          <Reveal className="eyebrow">With Gratitude</Reveal>
          <Reveal delay={0.1}><h1>Acknowledgement</h1></Reveal>
          <Reveal delay={0.2}><p>Recognising the ICT Directorate and the dedicated collaborators whose work brought the NiMSA South East Region platform to life.</p></Reveal>
        </div>
      </div>

      {settings.ictDirectorName && (
        <section className="section">
          <div className="container">
            <Reveal className="section-header">
              <div className="eyebrow">ICT Directorate</div>
              <h2>Led By</h2>
              <p>{settings.ackIntro || 'The vision, design, and technical leadership behind this platform.'}</p>
              <div className="gold-line" />
            </Reveal>
            <div className="grid-2" style={{ gap: '3rem', alignItems: 'center' }}>
              <Reveal style={{ background: 'linear-gradient(155deg,var(--green-deep),var(--green-primary))', padding: '2.5rem', textAlign: 'center', minHeight: 380, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ color: 'white' }}>
                  {settings.ictDirectorPhoto
                    ? <img src={settings.ictDirectorPhoto} alt={settings.ictDirectorName} width="170" height="170" style={{ borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--gold)', margin: '0 auto 1.2rem' }} />
                    : <div style={{ width: 170, height: 170, borderRadius: '50%', border: '3px solid var(--gold)', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '3.4rem', color: 'var(--green-primary)', margin: '0 auto 1.2rem' }}>{settings.ictDirectorName.charAt(0)}</div>}
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--gold)' }}>{settings.ictDirectorName}</div>
                  <div style={{ fontSize: '0.82rem', opacity: 0.7, textTransform: 'uppercase', marginTop: '0.3rem' }}>Director of ICT</div>
                  {settings.ictDirectorYear && <div style={{ marginTop: '0.7rem' }}><span className="badge badge-gold">📅 {settings.ictDirectorYear}</span></div>}
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="eyebrow">The Lead</div>
                <h2 style={{ margin: '0.4rem 0 0' }}>{settings.ictDirectorName}</h2>
                <div style={{ color: 'var(--gold-dark)', fontWeight: 600, fontSize: '0.82rem', textTransform: 'uppercase', margin: '0.6rem 0 1.2rem' }}>
                  Director of ICT{settings.ictDirectorYear ? ` · ${settings.ictDirectorYear}` : ''}
                </div>
                <p>{settings.ictDirectorBio || 'Leading the digital transformation of NiMSA South East Region.'}</p>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {settings.webDevName && (
        <section className="section section-alt">
          <div className="container">
            <Reveal className="section-header"><h2>Co-lead</h2><div className="gold-line" /></Reveal>
            <Reveal className="card" style={{ maxWidth: 640, margin: '0 auto', padding: '2.4rem 2rem', textAlign: 'center', border: '1px solid var(--gold)' }}>
              {settings.webDevPhoto
                ? <img src={settings.webDevPhoto} alt={settings.webDevName} width="130" height="130" style={{ borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--gold)', margin: '0 auto 1.2rem' }} />
                : <div style={{ width: 130, height: 130, borderRadius: '50%', border: '3px solid var(--gold)', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '2.6rem', color: 'var(--green-primary)', margin: '0 auto 1.2rem' }}>{settings.webDevName.charAt(0)}</div>}
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--green-primary)' }}>{settings.webDevName}</div>
              <div style={{ color: 'var(--gold-dark)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', marginTop: '0.4rem' }}>
                {settings.webDevRole || 'Web Developer'}{settings.webDevYear ? ` · ${settings.webDevYear}` : ''}
              </div>
              {settings.webDevBio && <p style={{ marginTop: '1rem', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>{settings.webDevBio}</p>}
            </Reveal>
          </div>
        </section>
      )}

      {collaborators.length > 0 && (
        <section className="section">
          <div className="container">
            <Reveal className="section-header">
              <div className="eyebrow">The Team</div>
              <h2>Collaborators</h2>
              <p>The talented individuals who contributed their time and skills to this project.</p>
              <div className="gold-line" />
            </Reveal>
            <div className="grid-3">
              {collaborators.map((c, i) => (
                <Reveal key={c._id} delay={i * 0.06} className="card" style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', margin: '1.8rem auto 1.1rem' }}>
                    {c.photo
                      ? <img src={c.photo} alt={c.name} width="90" height="90" loading="lazy" decoding="async" style={{ borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--gold)' }} />
                      : <div style={{ width: 90, height: 90, borderRadius: '50%', border: '2px solid var(--gold)', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--green-primary)' }}>{c.name.charAt(0)}</div>}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem' }}>{c.name}</div>
                  {c.role && <div style={{ color: 'var(--gold-dark)', fontWeight: 600, fontSize: '0.76rem', textTransform: 'uppercase', margin: '0.3rem 0' }}>{c.role}</div>}
                  {c.bio && <p style={{ fontSize: '0.83rem', padding: '0 1.3rem 1.2rem' }}>{c.bio}</p>}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="container">
        <AdminNotice href="/admin/acknowledgement">Manage acknowledgement — update the ICT Director and add, edit or remove collaborators.</AdminNotice>
      </div>
    </>
  );
}
