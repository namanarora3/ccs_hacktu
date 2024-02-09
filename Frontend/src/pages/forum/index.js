
import React, { useState, useEffect  } from 'react';
import CardMembership from '../../components/CardForum';
import Garbage from '../../../public/images/rimjhim/garbage.png';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from '@mui/material';

function Forum() {
  const [filter, setFilter] = useState({
    upvotes: 0,
    category: '',
    location: '',
    date: '',
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const handleSliderChange = (event, newValue) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      upvotes: newValue,
    }));
  };

  const [issues, setIssues] = useState([]);
  const fetchData = async () => {
    const token=localStorage.getItem('token')
    try {
      const response = await fetch('http://127.0.0.1:8001/issue/',{
        headers:{
          'Authorization':`Token ${token}`,
          'Content-Type':'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setIssues(jsonData);
      console.log(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
useEffect(() => {fetchData()}, []);

  return (
    <>
    <Typography variant='h4' sx={{ mb: 4 }}> 
      Forum
    </Typography>
    <div>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Date"
          type="date"
          name="date"
          value={filter.date}
          onChange={handleFilterChange}
          sx={{ marginRight: 2 }}
        />

        <TextField
          label="Location"
          name="location"
          value={filter.location}
          onChange={handleFilterChange}
          sx={{ marginRight: 2 }}
        />
        <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={filter.category}
            name="category"
            onChange={handleFilterChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="category1">railway</MenuItem>
            <MenuItem value="category2">electricity</MenuItem>
            <MenuItem value="category2">roadways</MenuItem>
            <MenuItem value="category2">garbage</MenuItem> 
            <MenuItem value="category2">water</MenuItem>
            <MenuItem value="category2">other</MenuItem>
            
            {/* Add more categories */}
          </Select>
        </FormControl>
        <Slider
          value={filter.upvotes}
          onChange={handleSliderChange}
          aria-labelledby="upvotes-slider"
          min={0}
          max={100}
          step={1}
          valueLabelDisplay="auto"
          sx={{ width: 200 }}
        />
      </Box>
      <CardMembership issues={issues.filter((issue) => {
        return (
          // issue.upvoteCount >= filter.upvotes &&
          (filter.category === '' || issue.category === filter.category) &&
          (filter.location === '' || issue.location === filter.location) &&
          (filter.date === '' || issue.date === filter.date)
        );
      })} />
    </div>
    </>
  );
}

export default Forum;
