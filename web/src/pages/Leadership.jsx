import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Reveal from '../components/Reveal';
import AdminNotice from '../components/AdminNotice';
import { apiGet } from '../lib/api';

const CATS = [
  { key: 'rec', label: 'REC' },
  { key: 'school-president', label: 'MSA Presidents' },
  { key: 'standing-committee', label: 'Standing Committee' },
  { key: 'past-coordinator', label: 'Past Coordinators' },
];
const TITLES = {
  rec: 'Regional Executive Council',
  'school-president': 'MSA Presidents',
  'standing-committee': 'Standing Committee Representatives',
  'past-coordinator': 'Past Regional Coordinators',
};
const TYPE_BADGE = { Federal: 'badge-blue', Private: 'badge-purple', State: 'badge-green' };

export default function Leadership() {
  const [data, setData] = useState(null);
  const [cat, setCat] = useState('rec');
  useEffect(() => { apiGet('/leadership').then(setData); }, []);

  const executives = data?.executives || [];
  const institutions = data?.institutions || [];

  const filtered = useMemo(() => {
    const list = executives.filter(e => cat === 'rec' ? (e.category === 'rec' || e.category === 'coordinator') : e.category === cat);
    if (cat === 'school-president') return [...list].sort((a, b) => (a.school || '').localeCompare(b.school || ''));
    return list;
  }, [executives, cat]);

  const counts = Object.fromEntries(CATS.map(c => [c.key, executives.filter(e => c.key === 'rec' ? (e.category === 'rec' || e.category === 'coordinator') : e.category === c.key).length]));

  return (
    <>
      <Helmet><title>Leadership — NiMSA South East Region</title></Helmet>
      <div className="page-hero">
        <div className="page-hero-content">
          <Reveal className="eyebrow">Our Leadership</Reveal>
          <Reveal delay={0.1}><h1>NiMSA SE Leadership</h1></Reveal>
          <Reveal delay={0.2}><p>Meet the Regional Executive Council, MSA Presidents, and Standing Committee Representatives.</p></Reveal>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
            {CATS.map(c => (
              <button key={c.key} onClick={() => setCat(c.key)}
                className="btn btn-sm"
                style={{ background: cat === c.key ? 'var(--green-primary)' : 'transparent', color: cat === c.key ? 'white' : 'var(--text-muted)', border: '1.5px solid var(--border)' }}>
                {c.label} ({counts[c.key]})
              </button>
            ))}
          </div>
          <h3 style={{ textAlign: 'center', color: 'var(--green-deep)', marginBottom: '2rem', fontFamily: 'var(--font-display)' }}>{TITLES[cat]}</h3>

          <div className="grid-3">
            {filtered.map((exec, i) => {
              const isVacant = exec.name === '[Vacant]';
              return (
                <Reveal key={exec._id} delay={i * 0.05} className="card" style={{ textAlign: 'center', opacity: isVacant ? 0.65 : 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'center', margin: '1.8rem auto 1.1rem' }}>
                    {exec.photo && !isVacant
                      ? <img src={exec.photo} alt={exec.name} width="90" height="90" loading="lazy" decoding="async" style={{ borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--gold)' }} />
                      : <div style={{ width: 90, height: 90, borderRadius: '50%', border: `2px solid ${isVacant ? 'var(--border)' : 'var(--gold)'}`, background: isVacant ? 'var(--border)' : 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: isVacant ? 'var(--text-muted)' : 'var(--green-primary)' }}>{isVacant ? '?' : exec.name.charAt(0)}</div>}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: isVacant ? '0.9rem' : '1.1rem', fontStyle: isVacant ? 'italic' : 'normal', color: isVacant ? 'var(--text-muted)' : 'var(--green-deep)' }}>
                    {isVacant ? 'Position Vacant' : exec.name}
                  </div>
                  <div style={{ margin: '0.3rem 0' }}>
                    {exec.category === 'coordinator' ? <span className="badge badge-gold">{exec.position}</span>
                      : exec.category === 'standing-committee' ? <span className="badge badge-purple">{exec.position}</span>
                        : <span style={{ color: 'var(--gold-dark)', fontWeight: 600, fontSize: '0.76rem', textTransform: 'uppercase' }}>{exec.position}</span>}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>{exec.school}</div>
                  {exec.tenure && <div style={{ marginBottom: '0.5rem' }}><span className="badge badge-blue">📅 {exec.tenure}</span></div>}
                  {exec.bio && !isVacant && <p style={{ fontSize: '0.83rem', color: 'var(--text-body)', padding: '0 1.3rem', marginBottom: '1rem' }}>{exec.bio}</p>}
                  {!isVacant && (exec.whatsapp || exec.email) && (
                    <div style={{ padding: '0.9rem 1.3rem', borderTop: '1px solid var(--green-light)', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                      {exec.whatsapp && <a href={`https://wa.me/${exec.whatsapp}`} target="_blank" rel="noopener" className="btn btn-whatsapp btn-sm">WhatsApp</a>}
                      {exec.email && <a href={`mailto:${exec.email}`} className="btn btn-outline-gold btn-sm">Email</a>}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
          <AdminNotice href="/admin/executives">Manage executives — add, edit or remove REC members and school chapter presidents.</AdminNotice>
        </div>
      </section>

      <section className="section section-alt" id="schools">
        <div className="container">
          <Reveal className="section-header">
            <div className="eyebrow">Member Institutions</div>
            <h2>13 Schools. One Region.</h2>
            <p>All accredited by the Medical and Dental Council of Nigeria (MDCN).</p>
            <div className="gold-line" />
          </Reveal>
          <div className="grid-3">
            {institutions.map((s, i) => (
              <Reveal key={s._id} delay={i * 0.03} className="card">
                <div style={{ padding: '1.4rem 1.4rem 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--green-deep)' }}>{s.acronym}</div>
                    <span className={`badge ${TYPE_BADGE[s.type] || 'badge-green'}`}>{s.type}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>{s.assoc}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>{s.name}</div>
                </div>
                <div style={{ padding: '0.8rem 1.4rem 1.2rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  <span className="badge badge-gold">{s.state}</span>
                  <span className={`badge ${s.status === 'Fully Accredited' ? 'badge-green' : 'badge-orange'}`}>{s.status}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
