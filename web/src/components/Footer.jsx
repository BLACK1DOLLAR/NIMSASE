import { Link } from 'react-router-dom';

const FALLBACK_SCHOOLS = ['UNMSA — UNN Enugu', 'NAUMSA — Nnamdi Azikiwe', 'ABSUMSA — Abia State', 'ESUMSA — ESUT Enugu', 'IMSUMSA — Imo State', 'EBSUMSA — Ebonyi State'];

export default function Footer({ settings = {}, session, institutions = [] }) {
  const wa = settings.whatsappNumber || '2348000000000';
  const user = session?.user;
  const shown = institutions.length ? institutions.slice(0, 6).map(s => `${s.acronym} — ${s.name}`) : FALLBACK_SCHOOLS;
  const remaining = institutions.length ? Math.max(institutions.length - shown.length, 0) : 7;
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.1rem' }}>
              <img src="/logo.jpg" alt="NiMSA SE" width="46" height="46" style={{ borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--gold)' }} />
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'white' }}>NiMSA South East</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Ever Solid Region</div>
              </div>
            </div>
            <p style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, marginBottom: '1.6rem' }}>
              Founded 1968. The NiMSA South East Region unites, represents, and develops over 3,500 medical students across Abia, Anambra, Ebonyi, Enugu, and Imo states.
            </p>
            <div className="social-icons">
              <a href={settings.facebook || '#'} className="social-icon" aria-label="Facebook" target="_blank" rel="noopener">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href={settings.instagram || '#'} className="social-icon" aria-label="Instagram" target="_blank" rel="noopener">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href={settings.twitter || '#'} className="social-icon" aria-label="Twitter/X" target="_blank" rel="noopener">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href={settings.snapchat || '#'} className="social-icon" aria-label="Snapchat" target="_blank" rel="noopener">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12.006 2.002c3.7 0 6.7 2.85 6.7 6.75 0 1.14-.06 2.16-.16 3.06.5.16 1.06.27 1.5.62.28.22.36.6.2.94-.4.86-1.5 1.24-2.5 1.5.02.28.06.54.12.78.28 1.14 1.36 1.6 2.28 1.86.34.1.56.44.5.8-.1.6-.94.96-2.3 1.2-.06.22-.14.5-.24.7-.14.3-.44.42-.86.36-.36-.06-.78-.1-1.2-.1-.8 0-1.36.32-2.04.82-.74.56-1.58 1.2-2.96 1.2s-2.22-.64-2.96-1.2c-.68-.5-1.24-.82-2.04-.82-.44 0-.86.04-1.22.1-.4.06-.7-.06-.86-.36-.1-.2-.18-.48-.24-.7-1.36-.24-2.2-.6-2.3-1.2-.06-.36.16-.7.5-.8.92-.26 2-.72 2.28-1.86.06-.24.1-.5.12-.78-1-.26-2.1-.64-2.5-1.5-.16-.34-.08-.72.2-.94.44-.35 1-.46 1.5-.62-.1-.9-.16-1.92-.16-3.06 0-3.9 3-6.75 6.7-6.75z"/></svg>
              </a>
              <a href={`https://wa.me/${wa}`} className="social-icon" aria-label="WhatsApp" target="_blank" rel="noopener">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/leadership">Leadership</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/bulletin">Monthly Bulletin</Link></li>
              <li><Link to="/resources">Resources</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/news">News</Link></li>
              <li><Link to="/campaigns">Campaigns</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-heading">Member Schools</h4>
            <ul className="footer-links">
              {shown.map(label => <li key={label}><Link to="/leadership#schools">{label}</Link></li>)}
              {remaining > 0 && <li><Link to="/leadership#schools">+ {remaining} more →</Link></li>}
            </ul>
          </div>
          <div>
            <h4 className="footer-heading">Get In Touch</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <a href={`mailto:${settings.email || 'nimsa.se@gmail.com'}`} style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.65)' }}>{settings.email || 'nimsa.se@gmail.com'}</a>
              <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener" style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.65)' }}>WhatsApp Us</a>
              <Link to="/join" className="btn btn-gold btn-sm" style={{ marginTop: '0.5rem' }}>Join NiMSA SE</Link>
              {!user ? (
                <a href="/auth/login" className="btn btn-outline-gold btn-sm">Member Login</a>
              ) : (
                <a href="/auth/change-password" className="btn btn-outline-gold btn-sm">Change Password</a>
              )}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} NiMSA South East Region — ICT Directorate. All rights reserved.</p>
          <p style={{ color: 'var(--gold)', fontWeight: 600 }}>"Ever Solid Region"</p>
        </div>
      </div>
    </footer>
  );
}
