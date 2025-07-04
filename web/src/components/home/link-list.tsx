import {
	CopyIcon,
	DownloadIcon,
	LinkIcon,
	SpinnerIcon,
	TrashIcon,
} from '@phosphor-icons/react';
import { useEffect } from 'react';
import {
	type LinkModel,
	useLinksData,
	useLinksStore,
} from '@/store/app-links-store';

export function LinkListHeader() {
	return (
		<div className="flex flex-row justify-between items-center">
			<h1 className="text-lg font-bold text-gray-600">Meus Links</h1>
			<button
				className="flex flex-row items-center gap-2 p-2 text-center text-sm bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
				type="button"
			>
				<DownloadIcon /> Baixar CSV
			</button>
		</div>
	);
}

function EmptyList() {
	return (
		<div className="flex-1 flex flex-col justify-center items-center p-8 text-gray-400">
			<LinkIcon size={32} />

			<p className="text-xs text-gray-500 uppercase">
				Ainda não existem links cadastrados
			</p>
		</div>
	);
}

function LoadingList() {
	return (
		<div className="flex-1 flex flex-col justify-center items-center p-8 text-gray-400">
			<SpinnerIcon size={32} className="animate-spin" />

			<p className="text-xs text-gray-500 uppercase">Carregando links...</p>
		</div>
	);
}

function LinkListRow({ link }: { link: LinkModel }) {
	function handleCopy() {
		navigator.clipboard.writeText(link.displayUrl);
	}
	return (
		<div className="w-full flex flex-row gap-4 justify-between items-center">
			<div className="flex flex-col">
				<a className="text-primary text-md" href="/teste">
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
				>
					<TrashIcon size={16} />
				</button>
			</div>
		</div>
	);
}
function LinkListContent() {
	const { links, isLoading, isSuccess } = useLinksData();
	const loadLinks = useLinksStore((store) => store.loadLinks);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		loadLinks();
	}, []);

	return (
		<div className="flex-1 flex flex-col border-t-2  border-t-gray-200 min-h-64 max-h-96 overflow-auto theme-overflow">
			{isLoading && <LoadingList />}

			{isSuccess && links.size === 0 && <EmptyList />}

			{isSuccess &&
				links.size > 0 &&
				Array.from(links.values()).map((link) => (
					<LinkListRow link={link} key={link.id} />
				))}
		</div>
	);
}
export default function LinkList() {
	return (
		<div className="md:flex-2 flex flex-col gap-4 bg-white p-8 rounded-lg shadow-xs mt-8">
			<LinkListHeader />
			<LinkListContent />
		</div>
	);
}
