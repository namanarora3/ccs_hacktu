import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';
// import styles from './Home.module.css';
import React, { useMemo } from 'react';
const MapView = () => {
  const libraries = useMemo(() => ['places'], []);

  const { isLoaded } = useLoadScript({
    // googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ,
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY,
    libraries: libraries ,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  // Example locations for markers
  const locations = [
    { lat:  27.672932021393862, lng:  85.31184012689732 },
    // ... other locations
  ];

  return (
    <div >
      <GoogleMap
        // options={{ disableDefaultUI: true }}
        zoom={14}
        center={{ lat:  27.672932021393862, lng:  85.31184012689732 }}
        mapTypeId="roadmap"
        mapContainerStyle={{ width: '800px', height: '800px' }}
      >
        {locations.map((location, index) => (
          <Marker key={index} position={location} />
        ))}
      </GoogleMap>
    </div>
  );
};

export default MapView;
