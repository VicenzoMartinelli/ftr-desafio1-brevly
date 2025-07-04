import type { createLinkInput } from '@/store/app-links-store';
import type { GetLinksResponse } from './types';

export async function postNewLink(input: createLinkInput) {
	const result = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/links`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			route: input.route,
			url: input.url,
		}),
	});
	return result.status;
}

export async function getLinks(): Promise<GetLinksResponse> {
	const result = await fetch(
		`${import.meta.env.VITE_API_URL}/api/v1/links?pageSize=1000`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);

	return result.json();
}

export async function deleteLinkByRoute(route: string) {
	const result = await fetch(
		`${import.meta.env.VITE_API_URL}/api/v1/links/${route}`,
		{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);
	return result.status;
}
