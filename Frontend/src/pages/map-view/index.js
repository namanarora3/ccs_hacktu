import React, { useMemo, useState, useEffect } from 'react';
import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import Card from '@mui/material/Box';

const MapView = () => {
  const libraries = useMemo(() => ['places'], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY,
    libraries: libraries,
  });
  const [issueDetails, setIssueDetails] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token=localStorage.getItem('token')
        const response = await fetch('http://127.0.0.1:8001/issue/',{
          headers:{
            'Authorization':`Token ${token}`
          }
        }); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setIssueDetails(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  if(issueDetails.length>0){
    const locations = issueDetails.map((issue) => ({
      lat: parseFloat(issue.lat),
      lng: parseFloat(issue.long),
      issue: issue,
    }));
  }

  const handleMarkerClick = (issue) => {
    setSelectedIssue(issue);
  };
  if(locations==null)
  return (<p>Loading...</p>)
  else
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
