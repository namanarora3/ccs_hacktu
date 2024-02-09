// ADMIN SIDE


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

const Alert = () => {
  const alertData = {
    title: '',
    date: '',
    description: '',
  };
  // State for selected date
  const [selectedDate, handleDateChange] = React.useState(new Date());

  // State for selected image
  const [selectedImage, setSelectedImage] = React.useState(null);

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
      <CardHeader title='Add An Alert!' titleTypographyProps={{ variant: 'h4' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={e => e.preventDefault()}>
      <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <TextField label="Title" value={alertData.title} variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          {/* date */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              // value={selectedDate}
              value={alertData.date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        
        
        <Grid item xs={6} md={12}>
          <TextField label="Description" value={alertData.description} variant="outlined" fullWidth multiline rows={4} />
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

export default Alert;