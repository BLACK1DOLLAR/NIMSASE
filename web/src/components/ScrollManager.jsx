import { useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { getLenis } from '../lib/useLenis';

/**
 * Client-side navigation keeps the previous page's scroll position by default, so a footer
 * link would open the next page at its bottom. Reset to the top (or the #anchor) on every
 * new navigation. Must go through Lenis: it tracks its own scroll target, and a bare
 * window.scrollTo gets animated back to where Lenis thinks the page is.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();
  const navType = useNavigationType();

  useLayoutEffect(() => {
    if (navType === 'POP') return; // back/forward: let the browser restore the old position
    const lenis = getLenis();
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) {
      // no offset: Lenis already applies html's scroll-padding-top (clears the fixed nav)
      if (lenis) lenis.scrollTo(target, { immediate: true, force: true });
      else target.scrollIntoView();
      return;
    }
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname, hash, navType]);

  return null;
}
