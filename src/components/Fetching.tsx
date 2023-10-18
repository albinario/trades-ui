import Spinner from 'react-bootstrap/Spinner'
import { useIsFetching } from '@tanstack/react-query'

const Fetching = () => {
	const isFetching = useIsFetching()

	return isFetching ? (
		<Spinner
			animation='grow'
			className='opacity-50'
			size='sm'
			variant='warning'
		/>
	) : null
}

export default Fetching
