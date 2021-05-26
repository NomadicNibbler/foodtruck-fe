import { Link } from 'react-router-dom';
import truckIcon from '../../assets/food-truck.svg';

const TruckCard = ({ logo, distance, name, description}) => {
    const newName = name.split(' ').join('_')
    return (
        <Link to={`/trucks/${newName}`} className='truck-card' id={name} data-cy='truck-card'>
            <div className='box1'>
                <h2 className='truck-name'>{name}</h2>
                <h2>{`${distance} miles`}</h2>
            </div>
            <div className='box2'>
                {logo ? <img src={logo} alt='truck logo' className='truck-logo' /> : <img src={truckIcon} alt='truck logo' className='truck-logo' />}
                <h2>{description}</h2>
            </div>
         </Link>
    )
}

export default TruckCard;