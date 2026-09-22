import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './styles/theme.css';
import './styles/global.css';

export const createRoot = ViteReactSSG({ routes });
