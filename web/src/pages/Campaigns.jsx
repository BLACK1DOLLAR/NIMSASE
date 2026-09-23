import { useLoaderData, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Reveal from '../components/Reveal';

const CAMPAIGNS = [
  { icon: '🤱', title: 'Maternal Mortality Prevention', states: 'All 5 SE States', status: 'Ongoing', desc: 'Community education on maternal health, hospital-based outreaches, and awareness campaigns aimed at reducing the high maternal death rates across the Southeast.', color: '#ad1457' },
  { icon: '🌿', title: 'Climate Change & Environmental Health', states: 'Enugu & Anambra', status: 'Ongoing', desc: 'Campaigns to halt local drivers of climate change — deforestation, poor waste management, and industrial pollution — that worsen respiratory and infectious diseases.', color: '#2e7d32' },
  { icon: '🚺', title: 'Sexual & Reproductive Health Outreach', states: 'Abia & Imo States', status: 'Ongoing', desc: 'Targeting secondary school girls across the Southeast, this outreach promotes early awareness of reproductive rights, cervical cancer screening, and family planning.', color: '#6a1b9a' },
  { icon: '🩺', title: 'Hypertension & Cardiovascular Screening', states: 'Enugu State', status: 'Upcoming', desc: 'Free blood pressure screenings, lifestyle counselling, and education sessions at markets, churches, and community centres across Enugu State.', color: '#c62828' },
  { icon: '🦟', title: 'Malaria Prevention Drive', states: 'Imo & Ebonyi States', status: 'Completed', desc: 'Mass distribution of insecticide-treated mosquito nets, community education on malaria prevention, and free malaria rapid diagnostic tests.', color: '#00695c' },
  { icon: '🏛️', title: 'Medicine & Politics Mentorship', states: 'All 5 SE States', status: 'Ongoing', desc: 'A mentorship programme preparing medical students for leadership roles in healthcare administration, policy-making, and broader socio-political spaces.', color: '#1565c0' },
];

const CAREERS = [
  { title: 'IFMSA Professional Exchange Programme', org: 'IFMSA / NiMSA National', type: 'International Exchange', badge: 'badge-blue', deadline: 'Check NiMSA Portal', desc: 'As a full IFMSA member, NiMSA SE students can apply for clinical and research exchanges at hospitals across Europe, Asia, and the Americas.' },
  { title: 'MAK Health Week Volunteer Coordinators', org: 'NiMSA SE Public Health Committee', type: 'Leadership', badge: 'badge-gold', deadline: 'Open Year-Round', desc: 'Lead outreach teams during the MAK NiMSA Health Week. Coordinators manage logistics, community liaison, and student volunteers.' },
  { title: 'NiMSA Leadership Academy', org: 'NiMSA National Secretariat', type: 'Training Programme', badge: 'badge-green', deadline: 'Annually — watch NiMSA portal', desc: 'A residential leadership training for medical student leaders across all six regions.' },
  { title: 'Public Health Mentorship Programme', org: 'NiMSA SE — REC', type: 'Mentorship', badge: 'badge-purple', deadline: 'Open', desc: 'Be paired with a senior medical student, junior doctor, or consultant mentor in public health, clinical medicine, or research.' },
];

export default function Campaigns() {
  const data = useLoaderData();
  const wa = data?.settings?.whatsappNumber || '';

  return (
    <>
      <Helmet><title>Campaigns & Career — NiMSA South East Region</title></Helmet>
      <div className="page-hero">
        <div className="page-hero-content">
          <Reveal className="eyebrow">Impact & Opportunities</Reveal>
          <Reveal delay={0.1}><h1>Campaigns & Career Corner</h1></Reveal>
          <Reveal delay={0.2}><p>Public health campaigns, advocacy programs, and career opportunities — NiMSA SE students making a difference across Southeast Nigeria.</p></Reveal>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <Reveal style={{ background: 'linear-gradient(140deg,var(--green-deep),var(--green-primary))', padding: '3rem', color: 'white', border: '1px solid rgba(201,168,76,0.2)', marginBottom: '4rem' }}>
            <div className="grid-2" style={{ gap: '2rem', alignItems: 'center' }}>
              <div>
                <div className="eyebrow" style={{ background: 'rgba(201,168,76,0.14)', border: '1px solid rgba(201,168,76,0.4)', color: 'var(--gold)' }}>Flagship Program</div>
                <h2 style={{ color: 'white', margin: '1rem 0 0.8rem' }}>MAK NiMSA Health Week</h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1rem' }}>Named in honour of <strong style={{ color: 'var(--gold)' }}>Mustapha, Aisha, and Kabiru</strong> — three medical students tragically lost in the 2023 boat mishap.</p>
                <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener" className="btn btn-gold">Volunteer for Next Edition →</a>
              </div>
              <div style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,168,76,0.2)', minWidth: 160 }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🕯️</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--gold)' }}>M·A·K</div>
                <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase' }}>In Memoriam</div>
              </div>
            </div>
          </Reveal>

          <Reveal className="section-header">
            <div className="eyebrow">Public Health Campaigns</div>
            <h2>Our Active Campaigns</h2>
            <div className="gold-line" />
          </Reveal>
          <div className="grid-3">
            {CAMPAIGNS.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06} className="card">
                <div style={{ height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg,${c.color}CC,${c.color}88)` }}>
                  <div style={{ textAlign: 'center', color: 'white' }}>
                    <div style={{ fontSize: '2.8rem', marginBottom: '0.5rem' }}>{c.icon}</div>
                    <span style={{ background: 'rgba(255,255,255,0.2)', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', padding: '0.22rem 0.75rem' }}>{c.status}</span>
                  </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.35rem' }}>{c.title}</h3>
                  <div style={{ fontSize: '0.72rem', color: 'var(--gold-dark)', fontWeight: 600, marginBottom: '0.7rem' }}>📍 {c.states}</div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{c.desc}</p>
                  <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener" className="btn btn-sm btn-green">Volunteer →</a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-header">
            <div className="eyebrow">Career Corner</div>
            <h2>Opportunities for SE Students</h2>
            <p>Jobs, internships, IFMSA exchanges, and mentorship programmes curated for NiMSA SE medical students.</p>
            <div className="gold-line" />
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {CAREERS.map((job, i) => (
              <Reveal key={job.title} delay={i * 0.06} className="card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                      <h3 style={{ fontSize: '0.95rem', margin: 0 }}>{job.title}</h3>
                      <span className={`badge ${job.badge}`}>{job.type}</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>🏥 {job.org}</p>
                    <p style={{ fontSize: '0.83rem' }}>{job.desc}</p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>⏰ {job.deadline}</div>
                    <Link to="/contact" className="btn btn-sm btn-gold">Apply / Enquire</Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
