import { DownloadIcon } from '@phosphor-icons/react';
import { getLinksReport } from '@/http/link-endpoints';
import { downloadUrl } from '@/utils/download-url';

export function LinkListHeader() {
	async function downloadCsv() {
		try {
			const reportLink = await getLinksReport();

			await downloadUrl(reportLink);
		} catch (_err) {
			alert('Não foi possível baixar o relatório');
		}
	}

	return (
		<div className="flex flex-row justify-between items-center">
			<h1 className="text-lg font-bold text-gray-600">Meus Links</h1>
			<button
				className="flex flex-row items-center gap-2 p-2 text-center text-sm bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
				type="button"
				onClick={downloadCsv}
			>
				<DownloadIcon /> Baixar CSV
			</button>
		</div>
	);
}
