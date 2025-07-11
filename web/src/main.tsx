import { createRoot } from 'react-dom/client';
import { App } from './app';
import './index.css';
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
);
