import { useLoaderData, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Reveal from '../components/Reveal';
import Magnetic from '../components/Magnetic';

const FUNCTIONS = [
  { icon: '🗣️', title: 'Representation & Advocacy', desc: 'We speak on behalf of Southeast medical students at National Executive Council (NEC) meetings — addressing welfare, academic concerns, and policies.' },
  { icon: '🏥', title: 'MAK Health Week & Outreach', desc: 'We organise the MAK NiMSA Health Week — named in honour of Mustapha, Aisha, and Kabiru, three medical students lost in a 2023 boat mishap.' },
  { icon: '📚', title: 'Academic & Professional Development', desc: 'Regional conventions, debate tournaments, quiz competitions, webinars, and workshops prepare students for clinical excellence and public leadership.' },
  { icon: '🌐', title: 'IFMSA Exchange Programmes', desc: "As part of NiMSA's IFMSA membership, Southeast students access international clinical and research exchange programmes across Europe, Asia, and the Americas." },
  { icon: '🏆', title: 'Regional Convention & Awards', desc: 'The annual South East Regional Convention features academic competitions, the "Face of NiMSA SE" title, leadership elections, and networking across all member schools.' },
  { icon: '⚕️', title: 'Social & Health Advocacy', desc: 'Key campaigns include maternal mortality prevention, climate change awareness, sexual and reproductive health outreach, and the "Medicine and Politics" mentorship programme.' },
];

const TYPE_BADGE = { Federal: 'badge-blue', Private: 'badge-purple', State: 'badge-green' };

export default function About() {
  const data = useLoaderData();
  const institutions = data?.institutions || [];
  const schoolCount = institutions.length || 13;

  return (
    <>
      <Helmet><title>About Us — NiMSA South East Region</title></Helmet>

      <div className="page-hero">
        <div className="page-hero-content">
          <Reveal className="eyebrow">Who We Are</Reveal>
          <Reveal delay={0.1}><h1>About NiMSA South East Region</h1></Reveal>
          <Reveal delay={0.2}><p>Founded in 1968. Member of IFMSA. The Ever Solid Region — uniting {schoolCount} medical student associations across five Southeast states.</p></Reveal>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: '3.5rem', alignItems: 'center' }}>
            <Reveal>
              <div className="eyebrow">Our Identity</div>
              <h2 style={{ margin: '0.8rem 0 1.2rem' }}>What is NiMSA South East Region?</h2>
              <p style={{ marginBottom: '1rem' }}>
                The <strong>Nigerian Medical Students' Association (NiMSA)</strong>, founded in <strong>1968</strong>, is the official umbrella body for all medical students in Nigeria — recognized as the official student wing of the <strong>Nigerian Medical Association (NMA)</strong>, governed by Act Cap 221 of the Laws of the Federation of Nigeria.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                As a full member of the <strong>International Federation of Medical Students' Associations (IFMSA)</strong>, NiMSA connects its regional branches — including the South East — to a global network, providing students access to clinical and research exchanges across the world.
              </p>
              <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                The <strong>NiMSA South East Region</strong> is one of six geopolitical regional branches, governed by the <strong>Regional Coordinator (RC)</strong> — who serves as a bridge between the National Executive Council and the {schoolCount} Medical Student Associations (MSAs) across Abia, Anambra, Ebonyi, Enugu, and Imo states.
              </p>
              <div className="info-box">
                <p><strong>Terminology Note:</strong> We are a <em>Region</em>, not a zone. Our governance is led by the <em>Regional Coordinator</em> — not a "president." The RC coordinates and governs the region through the <strong>Regional Executive Council (REC)</strong>.</p>
              </div>
            </Reveal>
            <Reveal delay={0.15} style={{ background: 'linear-gradient(155deg,var(--green-deep),var(--green-primary))', padding: '2.5rem', textAlign: 'center', color: 'white' }}>
              <img src="/logo.jpg" alt="NiMSA SE" width="100" height="100" style={{ borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--gold)', margin: '0 auto 1rem' }} />
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.1rem' }}>"Ever Solid Region"</div>
              <div style={{ width: 40, height: 1, background: 'var(--gold)', margin: '0.8rem auto' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                {[{ v: '1968', l: 'Founded' }, { v: String(schoolCount), l: 'MSAs' }, { v: '5', l: 'SE States' }, { v: 'IFMSA', l: 'Global Body' }].map(s => (
                  <div key={s.l} style={{ background: 'rgba(255,255,255,0.07)', padding: '0.9rem', border: '1px solid rgba(201,168,76,0.2)' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--gold)' }}>{s.v}</div>
                    <div style={{ fontSize: '0.62rem', opacity: 0.55, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-header">
            <div className="eyebrow">Core Functions</div>
            <h2>What We Do</h2>
            <p>NiMSA SE functions as the representative body and developer of medical students across five Southeast states.</p>
            <div className="gold-line" />
          </Reveal>
          <div className="grid-2" style={{ gap: '1.5rem' }}>
            {FUNCTIONS.map((fn, i) => (
              <Reveal key={fn.title} delay={i * 0.06} style={{ background: 'white', padding: '1.6rem', borderLeft: '3px solid var(--gold)' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.7rem' }}>{fn.icon}</div>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.6rem' }}>{fn.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{fn.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal style={{ background: 'linear-gradient(140deg,var(--green-deep),var(--green-primary))', padding: '3rem', color: 'white', border: '1px solid rgba(201,168,76,0.2)' }}>
            <div style={{ maxWidth: 680 }}>
              <div className="eyebrow" style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)', color: 'var(--gold)' }}>In Memoriam</div>
              <h2 style={{ color: 'white', margin: '1rem 0' }}>The MAK NiMSA Health Week</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1rem' }}>
                In 2023, NiMSA lost three of its own — <strong style={{ color: 'var(--gold)' }}>Mustapha, Aisha, and Kabiru</strong> — in a tragic boat mishap. To honour their memory, NiMSA's annual Health Week was renamed the <strong>"MAK NiMSA Health Week."</strong>
              </p>
              <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}>
                The NiMSA South East Region holds the distinction of hosting the <strong>inaugural MAK NiMSA Health Week</strong>, through EBSUMSA in Abakaliki.
              </p>
              <Magnetic as={Link} to="/campaigns" className="btn btn-gold">View Our Campaigns →</Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-header">
            <div className="eyebrow">Our Schools</div>
            <h2>{schoolCount} Member Associations</h2>
            <p>All fully accredited by the Medical and Dental Council of Nigeria (MDCN).</p>
            <div className="gold-line" />
          </Reveal>
          <div className="grid-3">
            {institutions.map((s, i) => (
              <Reveal key={s._id} delay={i * 0.03} className="card">
                <div style={{ height: 70, background: 'linear-gradient(135deg,var(--green-deep),var(--green-primary))', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.2rem' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--gold)' }}>{s.acronym}</div>
                  <span className={`badge ${TYPE_BADGE[s.type] || 'badge-green'}`}>{s.type}</span>
                </div>
                <div style={{ padding: '1rem 1.2rem' }}>
                  <div style={{ fontWeight: 700, color: 'var(--green-deep)', fontSize: '0.88rem', marginBottom: '0.3rem' }}>{s.name}</div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span className="badge badge-gold">{s.state}</span>
                    <span className={`badge ${s.status === 'Fully Accredited' ? 'badge-green' : 'badge-orange'}`}>{s.status}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'linear-gradient(155deg,var(--green-deep),var(--green-primary))', textAlign: 'center' }}>
        <div className="container">
          <Reveal>
            <h2 style={{ color: 'white', marginBottom: '1rem' }}>Join the Ever Solid Region</h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 480, margin: '0 auto 2rem' }}>Be part of a legacy of excellence, advocacy, and compassionate service.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Magnetic as={Link} to="/join" className="btn btn-gold btn-lg">Join NiMSA SE</Magnetic>
              <Magnetic as={Link} to="/leadership" className="btn btn-outline btn-lg" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}>Meet Our Leaders</Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
