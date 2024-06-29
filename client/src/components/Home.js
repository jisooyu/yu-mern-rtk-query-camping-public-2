import { useSelector } from 'react-redux';
import { selectAllCamps } from '../slices/campingSlice';
import CampingListDetail from './CampingListDetail';
import Skeleton from './Skeleton';
import { useGetCampingsQuery } from '../store';

function Home() {
	const { isLoading, isSuccess, isError, error } = useGetCampingsQuery();
	const camps = useSelector(selectAllCamps);

	let content;

	if (isLoading) {
		content = (
			<Skeleton
				times={3}
				className='h-10 w-full'
			/>
		);
	} else if (isError) {
		content = <div>{error}</div>;
	} else if (isSuccess) {
		content = camps.map((camp) => (
			<CampingListDetail
				key={camp.contentId}
				camp={camp}
			/>
		));
	}

	return (
		<>
			<div>
				<h1 className='text-center p-4 text-4xl w-full h-full m-0 bg-green-400'>
					Go Camping Site Info
				</h1>
			</div>
			{content}
		</>
	);
}

export default Home;
