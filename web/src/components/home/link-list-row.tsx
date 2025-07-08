import { CopyIcon, TrashIcon } from '@phosphor-icons/react';
import { type LinkModel, useLinksStore } from '@/store/app-links-store';

export default function LinkListRow({ link }: { link: LinkModel }) {
	const deleteLink = useLinksStore((state) => state.deleteLink);
	const incrementHits = useLinksStore((state) => state.incrementHits);

	function handleCopy() {
		navigator.clipboard.writeText(link.displayUrl);
		alert('link copiado!');
	}
	async function handleDelete(route: string) {
		if (window.confirm('Remover link encurtado?')) {
			await deleteLink(route);
		}
	}
	return (
		<div className="w-full flex flex-row gap-4 justify-between items-center">
			<div className="flex flex-col">
				<a
					onClick={() => incrementHits(link.route)}
					className="text-primary text-md"
					href={`/${link.route}`}
					target="_blank"
				>
					brev.ly/{link.route}
				</a>
				<p className="text-gray-500 text-sm">{link.url}</p>
			</div>

			<div className="flex flex-row items-center gap-2">
				<p className="text-gray-500 text-sm">{link.hits} acessos</p>
				<button
					type="button"
					onClick={handleCopy}
					className="bg-gray-200 p-2 rounded-xs hover:bg-gray-300 cursor-pointer"
				>
					<CopyIcon size={16} />
				</button>
				<button
					type="button"
					className="bg-gray-200 p-2 rounded-xs hover:bg-gray-300 cursor-pointer"
					onClick={() => handleDelete(link.route)}
				>
					<TrashIcon size={16} />
				</button>
			</div>
		</div>
	);
}
