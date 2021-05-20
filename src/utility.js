export const createLocationList = (trucks)  => {
  const truckList = trucks.map(truck => {
    return {lat: Number(truck.attributes.lat), lng: Number(truck.attributes.long) }
  });
  return truckList
}