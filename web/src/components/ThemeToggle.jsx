import { useEffect, useState } from 'react';

const saved = () => { try { return localStorage.getItem('theme'); } catch { return null; } };

function applyTheme(theme, persist) {
  const root = document.documentElement;
  root.classList.add('theme-switching');
  root.setAttribute('data-theme', theme);
  setTimeout(() => root.classList.remove('theme-switching'), 400);
  if (persist) { try { localStorage.setItem('theme', theme); } catch { /* private mode */ } }
}

/** Light/dark switch. The initial theme is set before paint by the script in index.html. */
export default function ThemeToggle() {
  // null until mounted: the prerendered HTML can't know the visitor's theme
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setTheme(root.getAttribute('data-theme') || 'light');
    sync();
    // <html data-theme> is the single source of truth, so every toggle on the page
    // (nav bar + mobile menu) stays in step
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    // Follow the OS setting live until the visitor makes an explicit choice
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => { if (!saved()) applyTheme(e.matches ? 'dark' : 'light', false); };
    mq.addEventListener('change', onChange);
    return () => { observer.disconnect(); mq.removeEventListener('change', onChange); };
  }, []);

  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={theme ? `Switch to ${next} mode` : 'Toggle colour theme'}
      title={theme ? `Switch to ${next} mode` : undefined}
      onClick={() => applyTheme(next, true)}
    >
      {theme === 'dark' ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : theme === 'light' ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      ) : null}
    </button>
  );
}
