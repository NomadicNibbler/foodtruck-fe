import { Link } from 'react-router-dom';

const TruckCard = ({ logo, distance, name, description}) => {
    return (
        <Link to={`/trucks/${name}`} className='truck-card' id={name}>
            <h2>{name}</h2>
            {logo && <img src={logo} alt='truck logo' className='truck-logo'/>}
            <h2>{`${distance} miles`}</h2>
            <h2>{description}</h2>
        </Link>
    )
}

export default TruckCard;