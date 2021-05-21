import { Link } from 'react-router-dom';
import TruckCard from '../TruckCard/TruckCard';

const TruckList = ({ truckList }) => {
    return (
        <>
            <div className='button-container'>
                <Link to='/map'>
                    <button className='button'>Truck Map</button>
                </Link>
                <button className='button'>Filter</button>
            </div>
            {truckList.map(truck => {
                return <TruckCard
                        key={truck.attributes.name}
                        logo={truck.attributes.logo}
                        distance={truck.attributes.distance}
                        name={truck.attributes.name}
                        description={truck.attributes.description_short}
                />
            })}
        </>
    )
}

export default TruckList;