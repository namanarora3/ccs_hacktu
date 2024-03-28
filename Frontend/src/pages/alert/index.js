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

  const [title, setTitle] = useState('');

  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      "title": title,
      "area": "india",
      "discription": description,
      "duration": "01 01:05:00"
  };
    const token=localStorage.getItem('token')
    const response = await fetch('http://127.0.0.1:8001/alerts/create/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    console.log(response)
    if (response.ok) {
      console.log('Data posted successfully');
      // Reset form fields
      setTitle('');
      setDescription('');
    } else {
      console.error('Failed to post data');
    }
  };

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
      <form onSubmit={handleSubmit}>
      <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <TextField label="Title" value={title} variant="outlined" fullWidth onChange={(event) => setTitle(event.target.value)} />
        </Grid>
        <Grid item xs={6} md={12}>
          <TextField label="Description" value={description} variant="outlined" fullWidth multiline rows={4} onChange={(event) => setDescription(event.target.value)} />
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