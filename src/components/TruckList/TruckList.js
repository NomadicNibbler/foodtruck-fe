import TruckCard from '../TruckCard/TruckCard';

const TruckList = ({ truckList }) => {
    return (
        <>
            <h2>Truck List</h2>
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