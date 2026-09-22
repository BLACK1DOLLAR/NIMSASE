import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Reveal from '../components/Reveal';
import { apiGet } from '../lib/api';

const BENEFITS = [
  { icon: '🗣️', title: 'Advocacy & Representation', desc: 'Your voice at the national NiMSA level and beyond.' },
  { icon: '📚', title: 'Academic Resources', desc: 'Access to past questions, clinical guides, and study materials.' },
  { icon: '🌐', title: 'IFMSA Exchange Access', desc: 'International medical exchange opportunities.' },
  { icon: '🤝', title: 'Networking', desc: 'Connect with 2,400+ students across member schools.' },
  { icon: '🏆', title: 'Competitions & Awards', desc: 'Southeast Literary Awards, academic competitions, and more.' },
  { icon: '🏥', title: 'Health Outreach', desc: 'Participate in community health campaigns and outreaches.' },
];

export default function Join() {
  const [data, setData] = useState(null);
  const [session, setSession] = useState(null);
  useEffect(() => { apiGet('/join').then(setData); apiGet('/session').then(setSession); }, []);
  const institutions = data?.institutions || [];
  const wa = data?.settings?.whatsappNumber || '';
  const user = session?.user;

  return (
    <>
      <Helmet><title>Join Us — NiMSA South East Region</title></Helmet>
      <div className="page-hero">
        <div className="page-hero-content">
          <Reveal className="eyebrow">Membership</Reveal>
          <Reveal delay={0.1}><h1>Join NiMSA South East Region</h1></Reveal>
          <Reveal delay={0.2}><p>Become part of the most exceptional community of medical students in Nigeria's Southeast Region.</p></Reveal>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: '4rem', alignItems: 'start' }}>
            <Reveal>
              <h2 style={{ marginBottom: '1.5rem' }}>Why Join NiMSA SE?</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {BENEFITS.map(b => (
                  <div key={b.title} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'white', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '1.5rem' }}>{b.icon}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--green-deep)' }}>{b.title}</div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              {user ? (
                <div style={{ background: 'white', padding: '2.5rem', boxShadow: 'var(--shadow-xl)' }}>
                  <h3 style={{ marginBottom: '0.4rem' }}>Member Registration Form</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Complete your official NiMSA SE membership registration.</p>
                  <form action="https://formspree.io/f/xvzwjpqd" method="POST">
                    <input type="hidden" name="form-type" value="Member Registration" />
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input type="text" name="name" className="form-control" defaultValue={user.name} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input type="email" name="email" className="form-control" defaultValue={user.email} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Institution *</label>
                      <select name="institution" className="form-control" required>
                        <option value="">— Select your school —</option>
                        {institutions.map(s => <option key={s._id} value={s.name.trim()}>{s.name.trim()}</option>)}
                      </select>
                    </div>
                    <div className="duo-grid">
                      <div className="form-group">
                        <label className="form-label">Level *</label>
                        <select name="level" className="form-control" required>
                          {['100', '200', '300', '400', '500', '600'].map(l => <option key={l}>{l} Level</option>)}
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Matric Number *</label>
                        <input type="text" name="matric" className="form-control" placeholder="e.g. 2021/1234" required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">WhatsApp Number *</label>
                      <input type="tel" name="whatsapp" className="form-control" placeholder="+234 800 000 0000" required />
                    </div>
                    <button type="submit" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>Submit Registration</button>
                  </form>
                </div>
              ) : (
                <div style={{ background: 'white', padding: '2.5rem', textAlign: 'center', boxShadow: 'var(--shadow-xl)' }}>
                  <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2rem' }}>👋</div>
                  <h3 style={{ marginBottom: '0.8rem' }}>Create Your Account First</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '2rem' }}>To submit your membership registration, you'll need a NiMSA SE account. It only takes a minute!</p>
                  <a href="/auth/register" className="btn btn-gold btn-lg" style={{ width: '100%', justifyContent: 'center', marginBottom: '1rem' }}>Create Account</a>
                  <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)' }}>Already have an account? <a href="/auth/login">Sign in</a></p>
                  <div style={{ height: 1, background: 'var(--border)', margin: '1.5rem 0' }} />
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Or reach us directly on WhatsApp:</p>
                  <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener" className="btn btn-whatsapp" style={{ width: '100%', justifyContent: 'center', marginTop: '0.8rem' }}>💬 WhatsApp NiMSA SE</a>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
