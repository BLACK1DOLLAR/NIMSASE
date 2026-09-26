import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import Leadership from './pages/Leadership';
import Events from './pages/Events';
import Bulletin from './pages/Bulletin';
import Resources from './pages/Resources';
import Gallery from './pages/Gallery';
import News from './pages/News';
import Campaigns from './pages/Campaigns';
import Join from './pages/Join';
import Contact from './pages/Contact';
import Acknowledgement from './pages/Acknowledgement';
import { apiGet, loadRoot } from './lib/api';

// Content data (institutions, executives, events, settings, …) is loaded via route
// loaders, which vite-react-ssg properly awaits before capturing the prerendered HTML —
// unlike component-level useEffect, which is NOT guaranteed to resolve before the
// static snapshot is taken and was silently shipping empty/fallback content on every
// page. Pages then refresh from the live API via useLiveData, since on the client these
// loaders are replaced with the build-time snapshot. Session/login state stays
// client-only (fetched in App.jsx) since it's per-visitor.
const rootLoader = async () => (await loadRoot()) || { settings: {}, institutions: [] };

export const routes = [
  {
    path: '/',
    element: <App />,
    loader: rootLoader,
    children: [
      { index: true, element: <Home />, loader: () => apiGet('/home') },
      { path: 'about', element: <About />, loader: () => apiGet('/about') },
      { path: 'leadership', element: <Leadership />, loader: () => apiGet('/leadership') },
      { path: 'events', element: <Events />, loader: () => apiGet('/events') },
      { path: 'bulletin', element: <Bulletin />, loader: () => apiGet('/bulletin') },
      { path: 'resources', element: <Resources />, loader: () => apiGet('/resources') },
      { path: 'gallery', element: <Gallery />, loader: () => apiGet('/gallery') },
      { path: 'news', element: <News />, loader: () => apiGet('/news') },
      { path: 'campaigns', element: <Campaigns />, loader: () => apiGet('/campaigns') },
      { path: 'join', element: <Join />, loader: () => apiGet('/join') },
      { path: 'contact', element: <Contact />, loader: () => apiGet('/contact') },
      { path: 'acknowledgement', element: <Acknowledgement />, loader: () => apiGet('/acknowledgement') },
    ],
  },
];
