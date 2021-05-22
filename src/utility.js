export const createTruckLocation = (truck)  => {
  return {lat: Number(truck.attributes.lat), lng: Number(truck.attributes.long) }
}