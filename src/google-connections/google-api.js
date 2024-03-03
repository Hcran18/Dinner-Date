// import { getLocation } from './get-location.js';

// async function getRestaurants() {
//   try {
//     const currentLocation = await getLocation();
//     const request = {
//       location: currentLocation,
//       radius: '500',
//       type: ['restaurant'],
//       key: process.env.GOOGLE_API_KEY
//     };
//     const service = new google.maps.places.PlacesService(map);
//     return new Promise((resolve, reject) => {
//       service.nearbySearch(request, (results, status) => {
//         if (status === google.maps.places.PlacesServiceStatus.OK) {
//           resolve(results);
//         } else {
//           reject(new Error('No restaurants found.'));
//         }
//       });
//     });
//   }
//   catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

// export default getRestaurants;