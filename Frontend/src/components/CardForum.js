import React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Image from 'next/image';
import TrendingUp from 'mdi-material-ui/TrendingUp';
import StarOutline from 'mdi-material-ui/StarOutline';
import AccountOutline from 'mdi-material-ui/AccountOutline';
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline';
import Avatar from '@mui/material/Avatar';
import { Heart, ShareVariant } from 'mdi-material-ui';


// Styled Box component
const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}));

const CardMembership = ({ issues = [] }) => {
  return (
    <>
      {issues.map((issue, index) => (
        <Card key={index} sx={{ marginBottom: 2 }}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={7}>
              <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5.75, 6.25)} !important` }}>
                <Typography variant='h6' sx={{ marginBottom: 3.5 }}>
                  {issue.issueName}
                </Typography>
                <Typography variant='body2'>
                  {issue.issueDescription}
                </Typography>
                <Divider sx={{ marginTop: 6.5, marginBottom: 6.75 }} />
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={5}>
                    <StyledBox>
                      <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                        <LockOpenOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                        <Typography variant='body2'>LOCATION: {issue.location}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AccountOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                        <Typography variant='body2'>DATE: {issue.date}</Typography>
                      </Box>
                    </StyledBox>
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                      <StarOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                      <Typography variant='body2'>UPVOTE: {issue.upvoteCount}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TrendingUp sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                      <Typography variant='body2'>Category: {issue.category}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Grid>
            <Grid
              item
              sm={5}
              xs={12}
              sx={{ paddingTop: ['0 !important', '1.5rem !important'], paddingLeft: ['1.5rem !important', '0 !important'] }}
            >
              <CardContent
                sx={{
                  height: '100%',
                  display: 'flex',
                  textAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'action.hover',
                  padding: theme => `${theme.spacing(18, 5, 16)} !important`
                }}
              >
                <Box>
                  <Image src= {issue.image} alt='card' />
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            <Avatar alt='Mary Vaughn' src='/images/avatars/4.png' sx={{ width: 34, height: 34, marginRight: 2.75 }} />
            <Typography variant='body2' sx={{ color: 'common.black' }}>
              Mary Vaughn
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 3.5 }}>
              <Heart sx={{ marginRight: 1.25 }} />
              <Typography variant='body2' sx={{ color: 'common.black' }}>
                1.2k
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ShareVariant sx={{ marginRight: 1.25 }} />
              <Typography variant='body2' sx={{ color: 'common.black' }}>
                80
              </Typography>
            </Box>
          </Box>
        </Box>
                </Box>
              </CardContent>
            </Grid>
          </Grid>
         
        </Card>
      ))}
    </>
  );
};

export default CardMembership;
