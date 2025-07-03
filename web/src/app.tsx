import { Navigate, Route, Routes } from 'react-router';
import Home from './pages/home';
import Redirecting from './pages/redirecting';
import NotFound from './pages/not-found';

export function App() {
	return (
		<main className="h-dvh flex flex-col items-center justify-center p-2 bg-[#E4E6EC]">
			<Routes>
				<Route path="/" element={<Navigate to="/home" replace />} />

				<Route path="/home" element={<Home />} />
				<Route path=":route" element={<Redirecting />} />

				<Route path="*" element={<NotFound />} />
			</Routes>
		</main>
	);
}
