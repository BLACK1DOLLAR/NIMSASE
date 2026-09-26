export async function apiGet(path) {
  // During the SSG build there is no running Express server yet — read MongoDB directly.
  if (import.meta.env.SSR) {
    const { loadServerData } = await import('./serverData.js');
    return loadServerData(path);
  }
  try {
    const res = await fetch(`/api${path}`);
    if (!res.ok) throw new Error(`API ${path} -> ${res.status}`);
    return await res.json();
  } catch (e) {
    console.warn('apiGet failed', path, e.message);
    return null;
  }
}

/** Site-wide data for the layout (nav/footer): settings + member institutions. */
export async function loadRoot() {
  const [settings, about] = await Promise.all([apiGet('/settings'), apiGet('/about')]);
  if (!settings && !about) return null;
  return { settings: settings || {}, institutions: about?.institutions || [] };
}
