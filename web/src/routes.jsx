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

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'leadership', element: <Leadership /> },
      { path: 'events', element: <Events /> },
      { path: 'bulletin', element: <Bulletin /> },
      { path: 'resources', element: <Resources /> },
      { path: 'gallery', element: <Gallery /> },
      { path: 'news', element: <News /> },
      { path: 'campaigns', element: <Campaigns /> },
      { path: 'join', element: <Join /> },
      { path: 'contact', element: <Contact /> },
      { path: 'acknowledgement', element: <Acknowledgement /> },
    ],
  },
];
