import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Nav from './components/Nav';
import Footer from './components/Footer';
import WhatsAppFab from './components/WhatsAppFab';
import useLenis from './lib/useLenis';
import { apiGet } from './lib/api';

export default function App() {
  useLenis();
  const [session, setSession] = useState(null);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    apiGet('/session').then(s => s && setSession(s));
    apiGet('/settings').then(s => s && setSettings(s));
  }, []);

  return (
    <HelmetProvider>
      <Nav session={session} />
      <main>
        <Outlet context={{ settings }} />
      </main>
      <Footer settings={settings} />
      <WhatsAppFab number={settings.whatsappNumber} />
    </HelmetProvider>
  );
}
