import { enableMapSet } from 'immer';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { useShallow } from 'zustand/shallow';
import {
	deleteLinkByRoute,
	getLinks,
	postNewLink,
} from '@/http/link-endpoints';

export type LinkModel = {
	id: string;
	url: string;
	route: string;
	displayUrl: string;
	hits: number;
	createdAt: string;
};
export interface createLinkInput {
	route: string;
	url: string;
}

type LinkStoreState = {
	links: Map<string, LinkModel>;
	status: 'progress' | 'success' | 'error';
	loadLinks: () => void;
	addLink: (input: createLinkInput) => Promise<void>;
	deleteLink: (route: string) => void;
	visitLink: (route: string) => void;
};

enableMapSet();

export const useLinksStore = create<LinkStoreState, [['zustand/immer', never]]>(
	immer((set, get) => {
		async function loadLinks() {
			set((state) => {
				state.status = 'progress';
			});

			const fetchedLinks = await getLinks();

			set((state) => {
				state.links = new Map(
					fetchedLinks.links.map((link) => [link.route, link]),
				);
				state.status = 'success';
			});
		}

		async function addLink(input: createLinkInput) {
			try {
				const result = await postNewLink({
					route: input.route,
					url: input.url,
				});

				console.log('Link added successfully: ' + result);

				await loadLinks();
				console.log('LoadLinks executado');
			} catch (error) {
				console.error('Erro em addLink:', error); // ← Vai mostrar o erro
			}
		}

		async function deleteLink(route: string) {
			const findedLink = get().links.get(route);

			if (!findedLink) return;

			await deleteLinkByRoute(route);
		}
		async function visitLink(route: string) {}

		return {
			links: new Map(),
			status: 'progress',
			loadLinks,
			addLink,
			deleteLink,
			visitLink,
		};
	}),
);

export const useLinksData = () => {
	return useLinksStore(
		useShallow((store) => {
			return {
				links: store.links,
				status: store.status,
				isLoading: store.status === 'progress',
				isError: store.status === 'error',
				isSuccess: store.status === 'success',
			};
		}),
	);
};
