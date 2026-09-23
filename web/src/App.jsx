import { useEffect, useState } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Nav from './components/Nav';
import Footer from './components/Footer';
import WhatsAppFab from './components/WhatsAppFab';
import useLenis from './lib/useLenis';
import { apiGet } from './lib/api';

export default function App() {
  useLenis();
  const { settings, institutions } = useLoaderData();
  const [session, setSession] = useState(null);

  // Session is per-visitor and must never be frozen into the static build — always
  // fetched fresh on the client, unlike settings/institutions which come from the
  // route loader (correctly baked into the prerendered HTML).
  useEffect(() => {
    apiGet('/session').then(s => s && setSession(s));
  }, []);

  return (
    <HelmetProvider>
      <Nav session={session} />
      <main>
        <Outlet context={{ settings }} />
      </main>
      <Footer settings={settings} session={session} institutions={institutions} />
      <WhatsAppFab number={settings.whatsappNumber} />
    </HelmetProvider>
  );
}
