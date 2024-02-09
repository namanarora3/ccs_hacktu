import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import MapComponent from 'src/components/MapComponent';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
const apiKey = process.env.NEXT_PUBLIC_API_KEY;


// Assuming you have a component for displaying a map

// Import styles for third-party libraries
import 'react-datepicker/dist/react-datepicker.css';

const AddIssueForm = () => {
  // Sample categories for the dropdown
  const categories = ['water','infra','electrical','social_justice','other'];

  // State for selected date
  const [selectedDate, handleDateChange] = React.useState(new Date());

  // State for selected image
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleUpload = () => {
    // Here, you can implement logic to upload the selectedImage to your server or cloud storage
    console.log("Selected Image:", selectedImage);
    
  };

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', "infra");
    formData.append('description', description);
    formData.append('image', image);
    formData.append('lat',selectedLocation.lat );
    formData.append('long', selectedLocation.lng);
    const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8001/issue/', {
        method: 'POST',
        headers: {
          'Authorization':`Token ${token}`
          // 'Content-Type': 'multipart/form-data'
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        console.log(response)
      } else {
        console.error('Error occurred:', response);
      }
    };

    const [selectedLocation, setSelectedLocation] = useState({lat:30.340000,lng:76.379997});

    const handleMapClick = (event) => {
      setSelectedLocation({
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      });
    };

  return (
    <Card>
      <CardHeader title='Add Issue' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={handleSubmit}>
      <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <TextField label="Title" variant="outlined" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="category-label">Category</InputLabel>
            <Select labelId="category-label" label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={12}>
          <TextField label="Description" variant="outlined" fullWidth multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
        </Grid>
        <Grid item xs={6} md={6}>
        <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          center={{ lat: 30.340000, lng: 76.379997 }}
          zoom={15}
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
        </Grid>
        <Grid item xs={6}>
      <input
        accept="image/*"
        id="image-upload"
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <label htmlFor="image-upload">
        <Button variant="contained" component="span">
          Upload Image
        </Button>
      </label>
      {imagePreview && (
              <div>
                <img src={imagePreview} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} />
              </div>
            )}
      {selectedImage && <p>Selected Image: {selectedImage.name}</p>}
      {/* You can display a preview of the selected image here if needed */} 

      
    </Grid>
      </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          </CardActions>
    </form>
    </Card>
  );
};

export default AddIssueForm;
