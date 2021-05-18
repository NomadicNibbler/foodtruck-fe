const TruckCard = ({ logo, distance, name, id }) => {
    return (
        <div className='truck-card' id={id}>
            <p>{name}</p>
            <img src={logo} alt='truck logo'/>
            <p>{`${distance} miles`}</p>
        </div>
    )
}

export default TruckCard;