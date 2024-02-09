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



// Assuming you have a component for displaying a map

// Import styles for third-party libraries
import 'react-datepicker/dist/react-datepicker.css';

const AddIssueForm = () => {
  // Sample categories for the dropdown
  const categories = ['Category  1', 'Category  2', 'Category  3'];

  // State for selected date
  const [selectedDate, handleDateChange] = React.useState(new Date());

  // State for selected image
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleUpload = () => {
    // Here, you can implement logic to upload the selectedImage to your server or cloud storage
    console.log("Selected Image:", selectedImage);
    
  };

  return (
    <Card>
      <CardHeader title='Add Issue' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={e => e.preventDefault()}>
      <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <TextField label="Title" variant="outlined" fullWidth />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="category-label">Category</InputLabel>
            <Select labelId="category-label" label="Category">
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={12}>
          <TextField label="Description" variant="outlined" fullWidth multiline rows={4} />
        </Grid>
        <Grid item xs={6} md={6}>
          <MapComponent /> 
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
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
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
