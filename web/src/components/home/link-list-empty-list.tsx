import { LinkIcon } from '@phosphor-icons/react';

export default function LinkListEmptyList() {
	return (
		<div className="flex-1 flex flex-col justify-center items-center p-8 text-gray-400">
			<LinkIcon size={32} />

			<p className="text-xs text-gray-500 uppercase">
				Ainda não existem links cadastrados
			</p>
		</div>
	);
}
