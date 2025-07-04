import type { LinkModel } from '@/store/app-links-store';

export interface GetLinksResponse {
	links: LinkModel[];
	total: number;
}
