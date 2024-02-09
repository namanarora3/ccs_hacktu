import React, { useState } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const MapComponent = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapClick = (event) => {
    setSelectedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        center={{ lat: 0, lng: 0 }}
        zoom={2}
        onClick={handleMapClick}
        mapContainerStyle={{ width: '100%', height: '400px' }}
      >
        {selectedLocation && (
          <Marker
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
