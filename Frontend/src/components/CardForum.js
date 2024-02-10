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
import { DiscussionEmbed } from 'disqus-react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { left } from '@popperjs/core';
import styles from './CardForum.module.css'
import Link from 'next/link';

// Styled Box component
const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}));

const CardMembership = ({ issues = [] }) => {
  const [comments, setComments] = React.useState({});
  const [upvoteCounts, setUpvoteCounts] = React.useState({});

  const handleUpvote = (issueId) => {
    // Logic to handle upvote action
    setUpvoteCounts(prevCounts => ({
      ...prevCounts,
      [issueId]: (prevCounts[issueId] || 0) + 1,
    }));
  };

  const handleSubmit = (event, issueId) => {
    event.preventDefault();
    // Retrieve the comment text for the specific issue
    const commentText = comments[issueId];
    // Logic to submit the comment goes here
    // Clear the input for this specific issue after submission
    setComments(prevComments => ({
      ...prevComments,
      [issueId]: '', // Reset the comment text for this issue
    }));
  };
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Function to toggle the full description view
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Function to determine if the description is longer than the limit
  const isDescriptionLong = (description) => {
    const words = description?.split(' ');
    return words.length >  60;
  };

  // Render logic for the description
  const renderDescription = (description) => {
    const limit =  70;
    if (!showFullDescription && isDescriptionLong(description)) {
      return (
        <>
          {description.split(' ').slice(0, limit).join(' ')}...
          <a onClick={toggleDescription} style={{ cursor: 'pointer' }}>
            Read more
          </a>
        </>
      );
    }
    return description;
  };

  return (
    <>
      {issues.map((issue, index) => (
        <Link href={`/post-page?id=${issue.id}`}>
        <Card key={index} sx={{ marginBottom: 2 }}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={7}>
              
              <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5.75, 6.25)} !important` }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                      <Avatar alt='Name' src='/images/avatars/4.png' sx={{ width: 34, height: 34, marginRight: 2.75,marginTop: 5 }} />
                      <Typography variant='body5' sx={{marginTop:5}}>
                       {issue.user_name}
                      </Typography>
                    </Box>
                    </Box>
                    <br></br>
                <Typography sx={{ marginBottom: 3.5, fontSize: 20, fontWeight: 700 }}>
                  {issue.title}
                </Typography>
                <Typography variant='body2'>
                  {renderDescription(issue.description)}
                </Typography>
                <Divider sx={{ marginTop: 6.5, marginBottom: 6.75 }} />
                <Grid container spacing={4}>
  <Grid item xs={12} sm={5}>
    <StyledBox>
      <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
        <LockOpenOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
        <Typography variant='body2'>LOCATION: {issue.long}</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <AccountOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
        <Typography variant='body2'>DATE: {new Date(issue.created).toLocaleString()}</Typography>
      </Box>
    </StyledBox>
  </Grid>
  <Grid item xs={12} sm={7}>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Button onClick={() => handleUpvote(index)} color="primary" sx={{ marginRight: 1 }}>
          <StarOutline sx={{ color: 'primary.main', variant: 'outlined', alignSelf: left, marginTop:2 }} fontSize='small' />
          <Typography variant='body2' sx={{marginLeft:2, marginTop:1}}>Upvote {upvoteCounts[index] || issue.upvoteCount}</Typography>
        </Button>
        
      <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
        <TrendingUp sx={{ color: 'primary.main', marginRight: 2.75, marginTop:8 }} fontSize='small' />
        <Typography variant='body2' sx={{marginTop:8}}>Category: {issue.category}</Typography>
      </Box>
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
                  <Image className={styles.img1} src={issue.image} alt='card' width={'500%'} height={'400%'}/>
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
        </Link>
      ))}
    </>
  );
};

export default CardMembership;
