const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        resolve(currentLocation);
      }, reject);
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
}

export default getCurrentLocation;