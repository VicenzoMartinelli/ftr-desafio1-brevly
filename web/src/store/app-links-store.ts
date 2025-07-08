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
	deleteLink: (route: string) => Promise<void>;
	incrementHits: (route: string) => Promise<void>;
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
			const result = await postNewLink({
				route: input.route,
				url: input.url,
			});

			if (result === 400) throw new Error('Essa rota já foi cadastrada.');

			await loadLinks();
		}

		async function deleteLink(route: string) {
			const findedLink = get().links.get(route);

			if (!findedLink) return;

			const resultStatusCode = await deleteLinkByRoute(route);

			if (resultStatusCode === 204) {
				set((state) => {
					state.links.delete(route);
				});
			}
		}

		async function incrementHits(route: string) {
			const findedLink = get().links.get(route);

			if (!findedLink) return;

			findedLink.hits++;

			set((state) => {
				state.links.delete(route);
				state.links.set(route, findedLink);
			});
		}

		return {
			links: new Map(),
			status: 'progress',
			loadLinks,
			addLink,
			deleteLink,
			incrementHits,
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
