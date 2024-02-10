import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
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
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Garbage from '../../public/images/rimjhim/garbage.png';
import ColorsTimeline from './Timeline';

// Styled Box component
const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}));
const getUserInfo = () => {
  // ... fetch user info logic
  // Return user data, including the role
  return { role: 'admin' }; // Replace with your actual user data
};

const user = getUserInfo();


const CommentSection =() => {
  const [comments, setComments] = useState('');
  
    const router = useRouter();
    const [image,setImage]=useState('');
    const [issue, setIssue] = useState([]);
    const { id } =router.query;

  const handleSubmit = async(event) => {
    event.preventDefault();
    const token=localStorage.getItem('token')
    const response = await fetch(`http://127.0.0.1:8001/issue/comments/${id}/`, {
      method: 'POST',
      headers: {
        'Authorization':`Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"content":comments})
    });

    if (response.ok) {
      console.log('Text submitted successfully');
    } else {
      console.error('Failed to submit text');
    }
    console.log(comments)
    setComments('');
  };

  useEffect(() => {
    const token=localStorage.getItem('token')
    const fetchData = async () => {
      if (id) {
        const response = await fetch(`http://127.0.0.1:8001/issue/${id}/`,{
          headers:{
            'Authorization':`Token ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          if(data){
            setIssue(data?.data);
            setImage(data?.data.image)
            console.log(image)
          }
        } else {
          setError('Failed to fetch post data');
        }
      }
    };
    fetchData();
  }, [id]); 

  return (
    <Card sx={{ marginBottom: 2 }}>
      <Grid container spacing={6}>
        <Grid item xs={12} >
          <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5.75, 6.25)} !important` }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                <Avatar alt='Name' src='/images/avatars/4.png' sx={{ width: 34, height: 34, marginRight: 2.75 }} />
                <Typography variant='body5' sx={{ color: 'common.black' }}>
                  {issue.user_name}
                </Typography>
              </Box>
            </Box>
            <br />
            <Typography sx={{ marginBottom: 3.5, fontSize: 20, fontWeight: 700 }}>
              {issue.title}
            </Typography>
            <Typography variant='body2'>{issue.description}</Typography>
            <Box sx={{marginTop:5}}>
              <Image src={Garbage} width={'400%'} height={'300%'} alignItems = {'center'} alt='card' /></Box>
            <Divider sx={{ marginTop: 6.5, marginBottom: 6.75 }} />
            <Grid container spacing={4}>
              <Grid item xs={12} sm={5}>
                <StyledBox>
                  <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                    <LockOpenOutline sx={{ color: 'psrimary.main', marginRight: 2.75 }} fontSize='small' />
                    <Typography variant='body2'>LOCATION: Bhupindra Road, Patiala</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccountOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                    <Typography variant='body2'>DATE:{new Date(issue.created).toLocaleString()} </Typography>
                  </Box>
                </StyledBox>
              </Grid>
              <Grid item xs={12} sm={7}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  {/* <Button onClick={onUpvote} color="primary" sx={{ marginRight: 1 }}>
                    <StarOutline sx={{ color: 'primary.main', variant: 'outlined', alignSelf: 'left', marginLeft:-3 }} fontSize='small' />
                    <Typography variant='body2' sx={{marginLeft:3}}>Upvote {issue.like_count}</Typography>
                  </Button> */}
                  <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                    <TrendingUp sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                    <Typography variant='body2'>Category: {issue.category}</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <br />
            <Box>

<ColorsTimeline currentStatus={issue.status} orientation="horizontal" />
            </Box>
            <Typography variant='h6' sx={{ marginTop: 3.5 }}>
        Comments
      </Typography>
      {issue.comments && issue.comments.length > 0 ? (
        issue.comments.map((comment, index) => (
          <Box key={index} sx={{ marginTop: 1.5 }}>
            <Typography variant='body2' sx={{ fontWeight: 700 }}>
              {comment.username}:
            </Typography>
            <Typography variant='body2'>{comment.text}</Typography>
          </Box>
        ))
      ) : (
        <Typography variant='body2' sx={{ fontStyle: 'italic' }}>
          No comments yet.
        </Typography>
      )}
      <Typography variant='h6' sx={{ marginTop: 3.5 }}>
        Add Comments
      </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                rows={4}
                variant="outlined"
                placeholder="Add a comment..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                sx={{ width: '70%', marginBottom: 5.5 }}
              />
              <br />
              {user.role === 'admin' && (
              <Button
        variant="outlined"
        color="primary"
        sx={{marginRight:4}}
        onClick={() => router.push(`/edit-issue/`)}
      >
        Edit Issue Status
      </Button>)}
              <Button type="submit" variant="contained" color="primary" sx={{  }}>
                Submit
              </Button>
            </form>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CommentSection;
