import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Nav from './components/Nav';
import Footer from './components/Footer';
import WhatsAppFab from './components/WhatsAppFab';
import ScrollManager from './components/ScrollManager';
import useLenis from './lib/useLenis';
import useLiveData from './lib/useLiveData';
import { apiGet, loadRoot } from './lib/api';

export default function App() {
  useLenis();
  const { settings, institutions } = useLiveData(loadRoot);
  const [session, setSession] = useState(null);

  // Session is per-visitor and must never be frozen into the static build — always
  // fetched fresh on the client and never taken from the build-time snapshot.
  useEffect(() => {
    apiGet('/session').then(s => s && setSession(s));
  }, []);

  return (
    <HelmetProvider>
      <ScrollManager />
      <Nav session={session} />
      <main>
        <Outlet context={{ settings }} />
      </main>
      <Footer settings={settings} session={session} institutions={institutions} />
      <WhatsAppFab number={settings.whatsappNumber} />
    </HelmetProvider>
  );
}
