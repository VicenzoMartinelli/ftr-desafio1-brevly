import { useParams } from 'react-router';
import logo404 from '@/assets/404.png';

export default function NotFound() {
	let { route } = useParams();

	return (
		<div className="flex flex-col w-full md:w-[30%] m-auto">
			<div className="flex flex-col gap-5 bg-white p-8 rounded-lg shadow-xs items-center justify-center">
				<div>
					<img width={190} src={logo404} alt="Logo" />
				</div>
				<h1 className="text-xl font-bold text-gray-600">Link não encontrado</h1>

				<div className="flex flex-col gap-1 items-center justify-center">
					<p className="text-md text-gray-500 text-center">
						O link que você está tentando acessar não existe, foi removido ou é
						uma URL inválida. Saiba mais em{' '}
						<span className="text-primary">brev.ly.</span>
					</p>
				</div>
			</div>
		</div>
	);
}
