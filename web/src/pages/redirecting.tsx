import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import logo from '@/assets/logo_icon.png';
import { visitLinkByRoute } from '@/http/link-endpoints';
import type { LinkModel } from '@/store/app-links-store';

export default function Redirecting() {
	const navigate = useNavigate();
	const { route } = useParams();

	const [url, setUrl] = useState('');

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		async function visit() {
			if (!route) return;

			const response = await visitLinkByRoute(route);

			if (!response.ok) {
				navigate('/not-found');
				return;
			}

			const data: LinkModel = await response.json();

			setTimeout(() => {
				location.href = data.url;
			}, 2000);

			setUrl(data.url);
		}

		visit();
	}, []);

	return (
		<div className="flex flex-col w-full md:w-[30%] m-auto">
			<div className="flex flex-col gap-5 bg-white p-8 rounded-lg shadow-xs items-center justify-center">
				<div>
					<img width={48} src={logo} alt="Logo" />
				</div>
				<h1 className="text-xl font-bold text-gray-600">Redirecionando...</h1>

				<div className="flex flex-col gap-1 items-center justify-center">
					<p className="text-md text-gray-500 text-center">
						O link será aberto automaticamente em alguns instantes.
					</p>
					<p className="text-md text-gray-500 text-center">
						Não foi redirecionado?{' '}
						<a
							className="text-primary"
							target="_blank"
							href={url}
							rel="noopener"
						>
							Acesse aqui
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
