import TruckCard from '../TruckCard/TruckCard';

const TruckList = ({ truckList }) => {
    return (
        <>
            <h2>Truck List</h2>
            {truckList.map(truck => {
                return <TruckCard
                        key={truck.id}
                        id={truck.id}
                        logo={truck.logo_small}
                        distance={truck.distance}
                        name={truck.name}
                />
            })}
        </>
    )
}

export default TruckList;