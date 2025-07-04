import logoFull from '@/assets/logo_full.png';
import LinkForm from '@/components/home/link-form';
import LinkList from '@/components/home/link-list';

export default function Home() {
	return (
		<div className="flex flex-col w-full md:w-[60%] m-auto">
			<div>
				<img width={100} src={logoFull} alt="Logo" />
			</div>

			<div className="flex flex-col md:flex-row md:gap-4">
				<LinkForm />
				<LinkList />
			</div>
		</div>
	);
}
