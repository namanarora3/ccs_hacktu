import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import DotsVertical from 'mdi-material-ui/DotsVertical';
import ReactApexcharts from 'src/@core/components/react-apexcharts';

const PieChart = () => {
  const theme = useTheme();

  const issueCategories = ['Water', 'Infra', 'Electrical', 'Road', 'Other'];
  const categoryData = [30, 20, 15, 25, 10]; // Sample data, replace it with your actual data

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
            },
            value: {
              show: true,
              formatter: function (val) {
                return val + '%';
              }
            }
          },
        }
      },
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      verticalAlign: 'middle',
      markers: {
        radius: 12
      },
    },
    labels: issueCategories, // Add this line to provide labels for each category
    colors: [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.info.main,
      theme.palette.success.main,
      theme.palette.warning.main,
    ],
  };

  return (
    <Card>
      <CardHeader
        title='Category Overview'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' },
        }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent>
        <ReactApexcharts type='donut' height={300} options={options} series={categoryData} />
        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant='body2'>Total issues by category</Typography>
          
        </Box>
      </CardContent>
    </Card>
  );
};

export default PieChart;
