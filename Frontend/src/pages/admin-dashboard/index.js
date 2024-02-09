import React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardMembership from '../../components/CardForum';
import { Doughnut } from 'react-chartjs-2';

const AdminDashboard = ({ issues }) => {
  // Function to get data for the category pie chart
  const getCategoryChartData = () => {
    const categoryCounts = {};
  
    // Check if issues is defined and not null
    if (issues && issues.length > 0) {
      // Count occurrences of each category
      issues.forEach((issue) => {
        const category = issue.category;
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      });
    }
  
    // Convert data to Chart.js format
    const data = {
      labels: Object.keys(categoryCounts),
      datasets: [
        {
          data: Object.values(categoryCounts),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#33cc33'], // Customize colors as needed
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#33cc33'],
        },
      ],
    };
  
    return data;
  };
  

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        {/* Display your issues using the CardMembership component */}
        <CardMembership issues={issues} />
      </Grid>
      <Grid item xs={12} md={4}>
        {/* Display the category pie chart */}
        <Card>
          <Doughnut data={getCategoryChartData()} />
        </Card>
      </Grid>
    </Grid>
  );
};

export default AdminDashboard
