import { Navigate, Route, Routes } from 'react-router';
import Home from './pages/home';
import NotFound from './pages/not-found';
import Redirecting from './pages/redirecting';

export function App() {
	return (
		<main className="h-dvh flex flex-col items-center justify-center p-2 bg-[#E4E6EC]">
			<Routes>
				<Route path="/" element={<Navigate to="/home" replace />} />

				<Route path="/home" element={<Home />} />
				<Route path=":route" element={<Redirecting />} />
				<Route path="/not-found" element={<NotFound />} />

				<Route path="*" element={<NotFound />} />
			</Routes>
		</main>
	);
}
