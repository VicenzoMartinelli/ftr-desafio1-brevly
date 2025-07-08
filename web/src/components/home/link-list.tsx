import LinkListContent from './link-list-content';
import { LinkListHeader } from './link-list-header';

export default function LinkList() {
	return (
		<div className="md:flex-2 flex flex-col gap-4 bg-white p-8 rounded-lg shadow-xs mt-8">
			<LinkListHeader />
			<LinkListContent />
		</div>
	);
}
