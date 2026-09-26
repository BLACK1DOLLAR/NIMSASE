import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { apiGet } from './api';

/**
 * Route loader data for the first paint, then refreshed from the live API.
 *
 * On the client, vite-react-ssg swaps every route loader for a fetch of the JSON snapshot
 * taken at build time — so loader data alone would stay frozen until the next deploy, and
 * admin edits (new schools, executives, events…) wouldn't show. The snapshot keeps the
 * prerendered HTML complete; this refresh keeps it current. Items keep stable keys, so
 * identical data causes no visible change and animated elements are not remounted.
 */
export default function useLiveData(source) {
  const initial = useLoaderData();
  const [data, setData] = useState(initial);

  useEffect(() => {
    let alive = true;
    const load = typeof source === 'function' ? source : () => apiGet(source);
    load().then(fresh => { if (alive && fresh) setData(fresh); });
    return () => { alive = false; };
  }, [source]);

  return data;
}
