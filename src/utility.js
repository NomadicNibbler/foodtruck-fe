export const createTruckLocation = (truck)  => {
  return {lat: Number(truck.attributes.lat), lng: Number(truck.attributes.long) }
}

export const createKey = (truck) => {
  return truck.attributes.lat + truck.attributes.long
}

export const createTrucksByRadius = (trucks, radius) => {
  const trucksByRadius = trucks.filter(truck => {
    return Number(truck.attributes.distance) <= radius;
  });
  return trucksByRadius
}

export const setUserData = (userData, trucks) => {
  const sortedTrucks = trucks.data.sort((a, b) =>  {
    return a.attributes.distance - b.attributes.distance
  })
  const lat = userData.data.attributes.lat
  const lng = userData.data.attributes.long
  return {
    trucks: sortedTrucks,
    lat: lat, 
    lng: lng 
  }
}