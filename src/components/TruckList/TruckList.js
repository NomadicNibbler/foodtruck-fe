import { Link } from 'react-router-dom';
import TruckCard from '../TruckCard/TruckCard';

const TruckList = ({ truckList, sortByDistance }) => {
    return (
        <>
            <div className='button-container'>
                <Link to='/map'>
                    <button className='button'>Truck Map</button>
                </Link>
                <div className='dropdown button'>
                    <p>Filter</p>
                    <div className='dropdown-content button'>
                        <p onClick={() => sortByDistance(truckList)}>Distance</p>
                        <p onClick={() => console.log('cash')}>Cash</p>
                        <p onClick={() => console.log('credit')}>Credit</p>
                        <p onClick={() => console.log('debit')}>Debit</p>
                        <p onClick={() => console.log('apple')}>Apple Pay</p>
                    </div>
                </div>
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