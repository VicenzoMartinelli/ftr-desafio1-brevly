import { useEffect } from 'react';
import { useLinksData, useLinksStore } from '@/store/app-links-store';
import LinkListEmptyList from './link-list-empty-list';
import LinkListLoadingList from './link-list-loading-list';
import LinkListRow from './link-list-row';

export default function LinkListContent() {
	const { links, isLoading, isSuccess } = useLinksData();
	const loadLinks = useLinksStore((store) => store.loadLinks);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		loadLinks();
	}, []);

	return (
		<div className="flex-1 flex flex-col border-t-2  border-t-gray-200 min-h-64 max-h-96 overflow-auto theme-overflow">
			{isLoading && <LinkListLoadingList />}

			{isSuccess && links.size === 0 && <LinkListEmptyList />}

			{isSuccess &&
				links.size > 0 &&
				Array.from(links.values()).map((link) => (
					<LinkListRow link={link} key={link.id} />
				))}
		</div>
	);
}
