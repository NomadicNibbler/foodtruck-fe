import { Link } from 'react-router-dom';

const TruckCard = ({ logo, distance, name, description}) => {
    const newName = name.split(' ').join('-')
    return (
        <Link to={`/trucks/${newName}`} className='truck-card' id={name}>
            <div className='box1'>
                <h2 className='truck-name'>{name}</h2>
                <h2>{`${distance} miles`}</h2>
            </div>
            <div className='box2'>
                {logo && <img src={logo} alt='truck logo' className='truck-logo'/>}
                <h2>{description}</h2>
            </div>
        </Link>
    )
}

export default TruckCard;