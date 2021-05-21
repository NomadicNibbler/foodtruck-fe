const TruckCard = ({ logo, distance, name, description}) => {
    return (
        <div className='truck-card' id={name}>
            <p>{name}</p>
            <img src={logo} alt='truck logo'/>
            <p>{`${distance} miles`}</p>
            <p>{description}</p>
        </div>
    )
}

export default TruckCard;