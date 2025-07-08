import { SpinnerIcon } from '@phosphor-icons/react';

export default function LinkListLoadingList() {
	return (
		<div className="flex-1 flex flex-col justify-center items-center p-8 text-gray-400">
			<SpinnerIcon size={32} className="animate-spin" />

			<p className="text-xs text-gray-500 uppercase">Carregando links...</p>
		</div>
	);
}
