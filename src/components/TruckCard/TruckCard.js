const TruckCard = ({ logo, distance, name, id }) => {
    return (
        <div id={id}>
            <p>{name}</p>
            <img src='logo'/>
            <p>{`${distance} miles`}</p>
        </div>
    )
}

export default TruckCard;