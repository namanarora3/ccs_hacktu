
import React, { useState } from 'react';
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

const issuesData = [
    {
      issueName: 'Garbage Collection Issue',
      issueDescription: 'I am writing to bring to your attention a pressing issue that affects our community deeply - the improper disposal of garbage in public areas. It has come to my attention, as well as that of many concerned citizens, that our streets, parks, and other public spaces are increasingly becoming dumping grounds for waste and litter. This irresponsible disposal of garbage not only poses a significant threat to public health but also tarnishes the beauty of our neighborhoods and harms the environment. The accumulation of garbage leads to foul odors, attracts pests and vermin, and creates breeding grounds for diseases. Furthermore, it contributes to pollution of our waterways and soil, endangering the delicate ecological balance upon which our ecosystem relies. As residents who take pride in our community, we find it unacceptable that our public spaces are being treated with such disregard. It is imperative that immediate action be taken to address this issue and implement effective waste management solutions.',
      location: 'Location A',
      date: '2024-02-09',
      upvoteCount: 10,
      category: 'garbage',
      image: Garbage, 
      username: 'Manoj Kumar'
    }, 
    {
      issueName: 'Second Issue',
      issueDescription: 'I am writing to bring to your attention a pressing issue that affects our community deeply - the improper disposal of garbage in public areas. It has come to my attention, as well as that of many concerned citizens, that our streets, parks, and other public spaces are increasingly becoming dumping grounds for waste and litter. This irresponsible disposal of garbage not only poses a significant threat to public health but also tarnishes the beauty of our neighborhoods and harms the environment. The accumulation of garbage leads to foul odors, attracts pests and vermin, and creates breeding grounds for diseases. Furthermore, it contributes to pollution of our waterways and soil, endangering the delicate ecological balance upon which our ecosystem relies. As residents who take pride in our community, we find it unacceptable that our public spaces are being treated with such disregard. It is imperative that immediate action be taken to address this issue and implement effective waste management solutions.',
      location: 'Location b',
      date: '2024-02-10',
      upvoteCount: 120,
      category: 'electricity',
      image: Garbage, 
      username: 'Manoj Kumar'
    }, 
    {
      issueName: 'Third Issue',
      issueDescription: 'I am writing to bring to your attention a pressing issue that affects our community deeply - the improper disposal of garbage in public areas. It has come to my attention, as well as that of many concerned citizens, that our streets, parks, and other public spaces are increasingly becoming dumping grounds for waste and litter. This irresponsible disposal of garbage not only poses a significant threat to public health but also tarnishes the beauty of our neighborhoods and harms the environment. The accumulation of garbage leads to foul odors, attracts pests and vermin, and creates breeding grounds for diseases. Furthermore, it contributes to pollution of our waterways and soil, endangering the delicate ecological balance upon which our ecosystem relies. As residents who take pride in our community, we find it unacceptable that our public spaces are being treated with such disregard. It is imperative that immediate action be taken to address this issue and implement effective waste management solutions.',
      location: 'Location c',
      date: '2024-02-11',
      upvoteCount: 100,
      category: 'railway',
      image: Garbage ,
      username: 'Manoj Kumar'
    }
  ];

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
      <CardMembership issues={issuesData.filter((issue) => {
        return (
          issue.upvoteCount >= filter.upvotes &&
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
