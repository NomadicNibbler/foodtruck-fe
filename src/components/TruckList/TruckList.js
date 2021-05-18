import TruckCard from '../TruckCard/TruckCard';

const TruckList = ({ truckList }) => {
        console.log(truckList)
    return (
        <>
            <h2>Truck List</h2>
            {truckList.map(truck => {
                return <TruckCard
                        key={truck.id}
                />
            })}
        </>
    )
}

export default TruckList;