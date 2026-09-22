import { useEffect, useState } from 'react';
import { apiGet } from '../lib/api';

/** Self-contained "🔧 Admin: manage X" callout — only renders for logged-in admins. */
export default function AdminNotice({ href, children, style }) {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => { apiGet('/session').then(s => s?.isAdmin && setIsAdmin(true)); }, []);
  if (!isAdmin) return null;
  return (
    <div className="info-box" style={{ marginTop: '3rem', ...style }}>
      <p>🔧 <strong>Admin:</strong> <a href={href}>{children}</a></p>
    </div>
  );
}
