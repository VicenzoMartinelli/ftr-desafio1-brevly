import logoFull from '@/assets/logo_full.png';
import { useForm } from 'react-hook-form';

interface FormData {
	url: string;
	route: string;
}

export default function Home() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormData>();

	const onSubmit = (data: FormData) => {
		console.log('Form data:', data);
		alert(`URL: ${data.url}, Route: ${data.route}`);
		reset();
	};

	return (
		<div className="flex flex-col w-full md:w-[60%] m-auto">
			<div>
				<img width={100} src={logoFull} alt="Logo" />
			</div>
			<div className="flex flex-col gap-6 bg-white p-8 rounded-lg shadow-xs mt-8">
				<h1 className="text-lg font-bold text-gray-600">Novo Link</h1>

				<form className="flex flex-col gap-4">
					<div className="flex flex-col gap-0.5">
						<label htmlFor="url" className="text-xs text-gray-500">
							LINK ORIGINAL
						</label>
						<input
							id="url"
							type="url"
							{...register('url', {
								required: '',
								pattern: {
									value: /^https?:\/\/.+/,
									message: '',
								},
							})}
							placeholder="https://examplo.com"
							className="border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
						/>
						{errors.url && (
							<p className="text-xs text-red-400">Informe uma url válida.</p>
						)}
					</div>

					<div className="flex flex-col gap-0.5">
						<label htmlFor="route" className="text-xs text-gray-500">
							LINK ENCURTADO
						</label>
						<div className="flex flex-row border border-gray-300 rounded-lg p-4 focus-within:ring-2 focus-within:ring-blue-500">
							<span className="text-gray-400">brev.ly/</span>
							<input
								id="route"
								{...register('route', {
									required: '',
									pattern: {
										value: /^\/[a-zA-Z0-9\-_\/]*$/,
										message: '',
									},
									minLength: {
										value: 1,
										message: '',
									},
								})}
								type="text"
								placeholder="test"
								className="outline-0 flex-1"
							/>
						</div>
						{errors.route && (
							<p className="text-xs text-red-400">
								Informe uma url minúscula e sem espaço/caracter especial.
							</p>
						)}
					</div>

					<button
						type="button"
						onClick={handleSubmit(onSubmit)}
						className="flex flex-row justify-center items-center mt-3 w-full p-3 bg-blue-700 rounded-lg hover:bg-blue-800 active:bg-blue-900 transition-colors "
					>
						<span className="text-white text-md font-bold">Salvar Link</span>
					</button>
				</form>
			</div>
		</div>
	);
}
