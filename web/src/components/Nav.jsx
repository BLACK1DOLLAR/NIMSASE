import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/leadership', label: 'Leadership' },
  { to: '/events', label: 'Events' },
  { to: '/bulletin', label: 'Bulletin' },
  { to: '/resources', label: 'Resources' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/news', label: 'News' },
  { to: '/campaigns', label: 'Campaigns' },
  { to: '/acknowledgement', label: 'Acknowledgement' },
  { to: '/contact', label: 'Contact' },
];

export default function Nav({ session }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <img src="/logo.jpg" alt="NiMSA South East Region" width="44" height="44" />
          <span className="nav-logo-text">
            <span className="nav-logo-name">NiMSA</span>
            <span className="nav-logo-sub">South East Region</span>
          </span>
        </Link>
        <ul className="nav-links">
          {LINKS.map(l => (
            <li key={l.to}><Link to={l.to} className={pathname === l.to ? 'active' : ''}>{l.label}</Link></li>
          ))}
        </ul>
        <div className="nav-actions">
          {session?.user ? (
            <>
              <span className="nav-user">
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                {session.user.name?.split(' ')[0]}
                {session.isAdmin && <span className="admin-badge">Admin</span>}
              </span>
              {session.isAdmin && <a href="/admin" className="btn btn-outline-gold btn-sm">Dashboard</a>}
              <a href="/auth/logout" className="btn btn-outline btn-sm">Logout</a>
            </>
          ) : (
            <>
              <a href="/auth/login" className="btn btn-outline btn-sm">Login</a>
              <Link to="/join" className="btn btn-gold btn-sm">Join Us</Link>
            </>
          )}
        </div>
        <button className="nav-hamburger" aria-label="Toggle menu" onClick={() => setOpen(o => !o)}>
          <span style={open ? { transform: 'rotate(45deg) translate(4px,4px)' } : undefined} />
          <span style={open ? { opacity: 0 } : undefined} />
          <span style={open ? { transform: 'rotate(-45deg) translate(4px,-4px)' } : undefined} />
        </button>
      </div>
      {open && (
        <div className="mobile-menu">
          {session?.user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.2rem 0 1rem', borderBottom: '1px solid rgba(201,168,76,0.2)', marginBottom: '0.6rem' }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(201,168,76,0.15)', border: '1px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700, color: 'var(--gold)', flexShrink: 0 }}>
                {session.user.name?.charAt(0)}
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white' }}>{session.user.name}</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>{session.user.email}</div>
              </div>
              {session.isAdmin && <span className="admin-badge" style={{ marginLeft: 'auto' }}>Admin</span>}
            </div>
          )}
          {LINKS.map(l => (
            <Link key={l.to} to={l.to} className={pathname === l.to ? 'active' : ''}>{l.label}</Link>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '1rem' }}>
            {session?.user ? (
              <>
                {session.isAdmin && <a href="/admin" className="btn btn-gold" style={{ justifyContent: 'center' }}>Admin Dashboard</a>}
                <a href="/auth/change-password" className="btn btn-outline" style={{ justifyContent: 'center' }}>Change Password</a>
                <a href="/auth/logout" className="btn btn-outline" style={{ justifyContent: 'center' }}>Logout</a>
              </>
            ) : (
              <>
                <a href="/auth/login" className="btn btn-outline" style={{ justifyContent: 'center' }}>Login</a>
                <Link to="/join" className="btn btn-gold" style={{ justifyContent: 'center' }}>Join NiMSA SE</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
