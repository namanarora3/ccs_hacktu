import React, { useMemo, useState } from 'react';
import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import Card from '@mui/material/Box';

const MapView = () => {
  const libraries = useMemo(() => ['places'], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY,
    libraries: libraries,
  });

  const [selectedIssue, setSelectedIssue] = useState(null);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  const issueDetails = [
    {
      "id": 17,
      "user_name": "daksh",
      "is_liked": false,
      "liked_by": [],
      "like_count": 0,
      "title": "Water Clog",
      "description": "Water clog in my area poses a serious threat, causing inconvenience and potential damage. Blocked drains and overflowing water create hazardous conditions, disrupting daily life and risking property. Urgent action is needed to address this issue and safeguard our community's well-being.",
      "created": "2024-02-09T16:55:41.890093Z",
      "image": "http://127.0.0.1:8001/media/images/issues/cat_lV598JO.jpg",
      "category": "infra",
      "long": "76.3799970000000000",
      "lat": "30.3400000000000000",
      "user": 3,
      "likes": []
    },
    {
      "id": 18,
      "user_name": "daksh",
      "is_liked": false,
      "liked_by": [],
      "like_count": 0,
      "title": "Light Not Working",
      "description": "Non-functional street lights in my area pose safety concerns, especially at night. Darkened streets increase the risk of accidents and crime, compromising public safety. Immediate attention is crucial to repair and restore these lights, ensuring a well-lit environment for residents and pedestrians",
      "created": "2024-02-09T16:56:27.751938Z",
      "image": "http://127.0.0.1:8001/media/images/issues/cat_v97lMyW.webp",
      "category": "infra",
      "long": "76.3767440161209000",
      "lat": "30.3420222427980000",
      "user": 3,
      "likes": []
    }
  ];

  const locations = issueDetails.map((issue) => ({
    lat: parseFloat(issue.lat),
    lng: parseFloat(issue.long),
    issue: issue,
  }));

  const handleMarkerClick = (issue) => {
    setSelectedIssue(issue);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <GoogleMap
        zoom={14}
        center={{ lat: parseFloat(locations[0].lat), lng: parseFloat(locations[0].lng) }}
        mapTypeId="roadmap"
        mapContainerStyle={{ width: '1600px', height: '700px' }}
      >
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={{ lat: location.lat, lng: location.lng }}
            onClick={() => handleMarkerClick(location.issue)}
          />
        ))}
      </GoogleMap>
      <Card style={{width:'100%'}}>
      {selectedIssue && (
        <div style={{ marginLeft: '20px'}}>
          <h2>{selectedIssue.title}</h2>
          <p>{selectedIssue.description}</p>
          <p>Category: {selectedIssue.category}</p>
          <p>Created by: {selectedIssue.user_name}</p>
          <img src={selectedIssue.image} alt={selectedIssue.title} style={{ maxWidth: '50%', maxHeight: '300px' }} />
        </div>
      )}
      </Card>
    </div>
  );
};

export default MapView;
