import { useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Reveal from '../components/Reveal';

export default function Contact() {
  const data = useLoaderData();
  const settings = data?.settings || {};

  return (
    <>
      <Helmet><title>Contact — NiMSA South East Region</title></Helmet>
      <div className="page-hero">
        <div className="page-hero-content">
          <Reveal className="eyebrow">Get In Touch</Reveal>
          <Reveal delay={0.1}><h1>Contact NiMSA SE</h1></Reveal>
          <Reveal delay={0.2}><p>Have a question, partnership offer, or want to collaborate? We'd love to hear from you.</p></Reveal>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: '3rem', alignItems: 'start' }}>
            <Reveal>
              <h2 style={{ marginBottom: '1.5rem' }}>Send Us a Message</h2>
              <form action="https://formspree.io/f/xvzwjpqd" method="POST" className="card" style={{ padding: '2rem' }}>
                <input type="hidden" name="form-type" value="Contact" />
                <div className="duo-grid">
                  <div className="form-group">
                    <label className="form-label">Your Name *</label>
                    <input type="text" name="name" className="form-control" placeholder="Full name" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input type="email" name="email" className="form-control" placeholder="your@email.com" required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Subject *</label>
                  <select name="subject" className="form-control" required defaultValue="">
                    <option value="">— Select a subject —</option>
                    <option>General Inquiry</option>
                    <option>Partnership / Sponsorship</option>
                    <option>Event Collaboration</option>
                    <option>Media / Press</option>
                    <option>Student Welfare</option>
                    <option>Career Opportunity Submission</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea name="message" className="form-control" placeholder="How can we help you?" required style={{ minHeight: 150 }} />
                </div>
                <button type="submit" className="btn btn-green btn-lg" style={{ width: '100%', justifyContent: 'center' }}>Send Message</button>
              </form>
            </Reveal>

            <Reveal delay={0.15}>
              <h2 style={{ marginBottom: '1.5rem' }}>Direct Contact</h2>
              <div style={{ display: 'flex', gap: '1rem', padding: '1.2rem', background: 'var(--green-pale)', marginBottom: '1rem', border: '1px solid var(--border)' }}>
                <div style={{ width: 44, height: 44, background: 'var(--green-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✉</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Official Email</div>
                  <a href={`mailto:${settings.email || 'nimsa.se@gmail.com'}`}>{settings.email || 'nimsa.se@gmail.com'}</a>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', padding: '1.2rem', background: 'var(--green-pale)', marginBottom: '1rem', border: '1px solid var(--border)' }}>
                <div style={{ width: 44, height: 44, background: '#25D366', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>💬</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>WhatsApp</div>
                  <a href={`https://wa.me/${settings.whatsappNumber || ''}`} target="_blank" rel="noopener" style={{ color: '#25D366' }}>Chat with us on WhatsApp →</a>
                </div>
              </div>

              <h3 style={{ margin: '2rem 0 1rem', fontSize: '1rem' }}>Follow Us</h3>
              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                <a href={settings.facebook || '#'} target="_blank" rel="noopener" className="btn btn-sm" style={{ background: '#1877f2', color: 'white' }}>Facebook</a>
                <a href={settings.instagram || '#'} target="_blank" rel="noopener" className="btn btn-sm" style={{ background: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', color: 'white' }}>Instagram</a>
                <a href={settings.twitter || '#'} target="_blank" rel="noopener" className="btn btn-sm" style={{ background: '#000', color: 'white' }}>X / Twitter</a>
                <a href={settings.snapchat || '#'} target="_blank" rel="noopener" className="btn btn-sm" style={{ background: '#FFFC00', color: 'black' }}>Snapchat</a>
              </div>

              <div style={{ background: 'var(--green-pale)', padding: '1.5rem', marginTop: '2rem', border: '1px solid var(--border)' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>ICT Directorate</h4>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)' }}>For technical issues, website feedback, or digital partnership enquiries, contact the ICT Directorate directly.</p>
                <a href="mailto:ict@nimsase.org" style={{ fontSize: '0.83rem', fontWeight: 600, display: 'block', marginTop: '0.6rem' }}>ict@nimsase.org →</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
