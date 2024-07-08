const getCityAndCountry = async (lat: number, lon: number) => {
  const apiKey = 'AIzaSyC6ZbmMoiWCRVRcedrY-xuFivQ7yzAstCI';
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`
    );
    const data = await response.json();

    if (data.status === 'OK') {
      const results = data.results;
      for (let i = 0; i < results.length; i++) {
        const addressComponents = results[i].address_components;
        let city = '';
        let country = '';
        for (let j = 0; j < addressComponents.length; j++) {
          const types = addressComponents[j].types;
          if (types.includes('locality')) {
            city = addressComponents[j].long_name;
          }
          if (types.includes('country')) {
            country = addressComponents[j].long_name;
          }
        }

        return { city, country };
      }
    } else {
      throw new Error('Unable to determine city and country');
    }
  } catch (error) {
    // Log errors to Sentry or Bugsnag for error monitoring
  }
};

export default getCityAndCountry;
