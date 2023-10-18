import { getLogo } from '../helpers/getLogo'
import Image from 'react-bootstrap/Image'

interface IProps {
	teamId: number
}

const Logo: React.FC<IProps> = (props) => (
	<Image src={getLogo(props.teamId)} />
)

export default Logo
