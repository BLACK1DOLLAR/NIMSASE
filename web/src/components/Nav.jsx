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
        <div className="nav-actions" style={{ display: 'none' }} />
        <button className="nav-hamburger" aria-label="Toggle menu" onClick={() => setOpen(o => !o)}>
          <span style={open ? { transform: 'rotate(45deg) translate(4px,4px)' } : undefined} />
          <span style={open ? { opacity: 0 } : undefined} />
          <span style={open ? { transform: 'rotate(-45deg) translate(4px,-4px)' } : undefined} />
        </button>
      </div>
      {open && (
        <div className="mobile-menu">
          {LINKS.map(l => (
            <Link key={l.to} to={l.to} className={pathname === l.to ? 'active' : ''}>{l.label}</Link>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '1rem' }}>
            {session?.user ? (
              <>
                {session.isAdmin && <a href="/admin" className="btn btn-gold" style={{ justifyContent: 'center' }}>Admin Dashboard</a>}
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
