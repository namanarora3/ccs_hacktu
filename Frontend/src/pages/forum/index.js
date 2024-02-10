
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

  const [issues, setIssues] = useState([]);
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

  const fetchData = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch('http://127.0.0.1:8001/issue/', {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const jsonData = await response.json();
    console.log(jsonData); 
    setIssues(jsonData);
      // Corrected to log jsonData
    
    console.log(jsonData); // Corrected to log jsonData
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
useEffect(() => {
  console.log(issues); // Log the updated state
}, []);
useEffect(() => {fetchData()}, []);

  return (
    <>
    <Typography variant='h4' sx={{ mb: 4 }}> 
      Forum
    </Typography>
    <div>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
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
            <MenuItem value="water">water</MenuItem>
            <MenuItem value="infra">infra</MenuItem>
            <MenuItem value="electrical">electrical</MenuItem>
            <MenuItem value="social_justice">social_justice</MenuItem> 
            <MenuItem value="other">other</MenuItem>
            
            {/* Add more categories */}
          </Select>
        </FormControl>
      </Box>
      {issues.length === 0 ? (
          // Handle the case when issues are still being fetched
          <Typography>Loading issues...</Typography>
        ) : (
          // Render the CardMembership component when issues are available
          <CardMembership
            issues={issues?.filter((issue) => {
              return (
                // issue.upvoteCount >= filter.upvotes &&
                (filter.category === '' || issue.category === filter.category) &&
                (filter.location === '' || issue.location === filter.location) &&
                (filter.date === '' || issue.date === filter.date)
              );
            })}
          />
          // <CardMembership issues={issues}/>
        )}
    </div>
    </>
  );
}

export default Forum;
