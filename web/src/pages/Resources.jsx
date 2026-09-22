import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Reveal from '../components/Reveal';
import Magnetic from '../components/Magnetic';
import { apiGet } from '../lib/api';

export default function Resources() {
  const [data, setData] = useState(null);
  useEffect(() => { apiGet('/resources').then(setData); }, []);
  const settings = data?.settings || {};

  const resources = [
    { icon: '📄', title: 'Past Questions', desc: 'Curated past exam questions from all member schools — organised by year, course, and level.', count: '200+ files', link: settings.resPastQuestions || '#', color: '#e8f5e9', iconColor: '#006400' },
    { icon: '🩺', title: 'Clinical Guides', desc: 'Step-by-step clinical examination guides, OSCE prep materials, and bedside manuals for clinical-year students.', count: '45+ guides', link: settings.resClinicalGuides || '#', color: '#e3f2fd', iconColor: '#1565c0' },
    { icon: '✈️', title: 'IFMSA Exchange', desc: 'Everything you need to apply for international medical exchanges — documents, deadlines, past participants\' experiences.', count: '12 resources', link: settings.resIFMSA || '#', color: '#fff3e0', iconColor: '#e65100' },
    { icon: '🎓', title: 'Scholarships', desc: 'Locally and internationally available scholarships for medical students.', count: '30+ listings', link: settings.resScholarships || '#', color: '#f3e5f5', iconColor: '#6a1b9a' },
    { icon: '🔬', title: 'Research Hub', desc: 'Research templates, published works by NiMSA SE members, and guides on how to get started with medical research.', count: '60+ resources', link: settings.resResearch || '#', color: '#fce4ec', iconColor: '#ad1457' },
    { icon: '📋', title: 'NMA & MDCN Documents', desc: 'Official documents from the Nigerian Medical Association and the Medical and Dental Council of Nigeria.', count: '18 documents', link: settings.resNMAMDCN || '#', color: '#e0f2f1', iconColor: '#00695c' },
  ];

  return (
    <>
      <Helmet><title>Resources — NiMSA South East Region</title></Helmet>
      <div className="page-hero">
        <div className="page-hero-content">
          <Reveal className="eyebrow">Resource Hub</Reveal>
          <Reveal delay={0.1}><h1>Academic Resources</h1></Reveal>
          <Reveal delay={0.2}><p>Past questions, clinical guides, scholarships, and more — everything a Southeast medical student needs, in one place.</p></Reveal>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid-3">
            {resources.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.06}>
                <a href={r.link} target="_blank" rel="noopener" className="card" style={{ padding: '2rem', textAlign: 'center', display: 'block' }}>
                  <div style={{ width: 64, height: 64, background: r.color, color: r.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    <span style={{ fontSize: '1.8rem' }}>{r.icon}</span>
                  </div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{r.title}</h3>
                  <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>{r.desc}</p>
                  <span className="badge badge-green">{r.count}</span>
                  <div style={{ marginTop: '1rem', color: 'var(--green-primary)', fontSize: '0.82rem', fontWeight: 600 }}>View All →</div>
                </a>
              </Reveal>
            ))}
          </div>
          <div className="info-box" style={{ marginTop: '3rem' }}>
            <p>📁 Resources are currently hosted on Google Drive. If a link isn't working, contact the <Link to="/contact">ICT Directorate</Link>.</p>
          </div>
        </div>
      </section>

      <section className="section section-alt" style={{ textAlign: 'center' }}>
        <div className="container">
          <Reveal>
            <div className="eyebrow">Need Help?</div>
            <h2 style={{ margin: '0.8rem 0 1rem' }}>Can't Find What You Need?</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: 440, margin: '0 auto 2rem' }}>Reach out to the ICT Directorate or contact your school's chapter president.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Magnetic as="a" href={`https://wa.me/${settings.whatsappNumber || ''}`} target="_blank" rel="noopener" className="btn btn-gold btn-lg">💬 WhatsApp Us</Magnetic>
              <Magnetic as={Link} to="/contact" className="btn btn-outline-gold btn-lg">Contact Us</Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
