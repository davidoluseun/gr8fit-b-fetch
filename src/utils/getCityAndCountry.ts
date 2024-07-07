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
        // console.log('city', city);
        // console.log('country', country);
        return { city, country };
      }
    } else {
      throw new Error('Unable to determine city and country');
    }
  } catch (error) {
    console.error(error);
    // setErrorMsg('Failed to get city and country');
  }
};

export default getCityAndCountry;

const datat = {
  'plus_code': {
    'compound_code': 'QHPV+8CP Union Square, San Francisco, CA, USA',
    'global_code': '849VQHPV+8CP',
  },
  'results': [
    {
      'address_components': [Array],
      'formatted_address': '200 Geary St, San Francisco, CA 94102, USA',
      'geometry': [Object],
      'place_id': 'ChIJpc9FisyBhYARPN5xBWS7KQc',
      'plus_code': [Object],
      'types': [Array],
    },
    {
      'address_components': [Array],
      'formatted_address': '1800 Ellis St, San Francisco, CA 94115, USA',
      'geometry': [Object],
      'place_id': 'ChIJ4zPXqIiAhYAR31X3S64T6Uw',
      'plus_code': [Object],
      'types': [Array],
    },
    {
      'address_components': [Array],
      'formatted_address': '1 Stockton St, San Francisco, CA 94108, USA',
      'geometry': [Object],
      'place_id': 'ChIJGxvaqIiAhYARpvngxoWeUJo',
      'types': [Array],
    },
    {
      'address_components': [Array],
      'formatted_address': '15 Stockton St, San Francisco, CA 94108, USA',
      'geometry': [Object],
      'place_id':
        'EiwxNSBTdG9ja3RvbiBTdCwgU2FuIEZyYW5jaXNjbywgQ0EgOTQxMDgsIFVTQSIaEhgKFAoSCTeesKeIgIWAEWCyH6df2ETgEA8',
      'types': [Array],
    },
    {
      'address_components': [Array],
      'formatted_address': 'QHPV+8C Union Square, San Francisco, CA, USA',
      'geometry': [Object],
      'place_id': 'GhIJ3QphNZbkQkARduJyvAKaXsA',
      'plus_code': [Object],
      'types': [Array],
    },
    {
      'address_components': [Array],
      'formatted_address': '15-1 Stockton St, San Francisco, CA 94108, USA',
      'geometry': [Object],
      'place_id': 'ChIJN56wp4iAhYARYLIfp1_YROA',
      'types': [Array],
    },
    {
      'address_components': [Array],
      'formatted_address': 'Union Square, San Francisco, CA, USA',
      'geometry': [Object],
      'place_id': 'ChIJu0D9046AhYARurZMmbXZQf4',
      'types': [Array],
    },
    {
      'address_components': [Array],
      'formatted_address': 'San Francisco, CA 94102, USA',
      'geometry': [Object],
      'place_id': 'ChIJs88qnZmAhYARk8u-7t1Sc2g',
      'types': [Array],
    },
    {
      'address_components': [Array],
      'formatted_address': 'San Francisco, CA, USA',
      'geometry': [Object],
      'place_id': 'ChIJIQBpAG2ahYAR_6128GcTUEo',
      'types': [Array],
    },
    {
      'address_components': [Array],
      'formatted_address': 'San Francisco County, San Francisco, CA, USA',
      'geometry': [Object],
      'place_id': 'ChIJIQBpAG2ahYARUksNqd0_1h8',
      'types': [Array],
    },
    {
      'address_components': [Array],
      'formatted_address': 'California, USA',
      'geometry': [Object],
      'place_id': 'ChIJPV4oX_65j4ARVW8IJ6IJUYs',
      'types': [Array],
    },
    {
      'address_components': [Array],
      'formatted_address': 'United States',
      'geometry': [Object],
      'place_id': 'ChIJCzYy5IS16lQRQrfeQ5K5Oxw',
      'types': [Array],
    },
  ],
  'status': 'OK',
};
