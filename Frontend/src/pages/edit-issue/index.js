// pages/EditIssueStatus.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

const EditIssueStatus = () => {
  const router = useRouter();
  const { id } = router.query; // Assuming the issue ID is passed in the query params

  const [status, setStatus] = useState('');

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleUpdateStatus = async () => {
    // Perform the API call to update the issue status
    // You should replace this with your actual API endpoint and logic
    try {
      const response = await fetch(`http://127.0.0.1:8001/issue/update-status/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Add any necessary authorization headers
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        console.log('Issue status updated successfully');
        // Optionally, you can redirect the user to the issue details page
        router.push(`/issue-details/${id}`);
      } else {
        console.error('Failed to update issue status');
      }
    } catch (error) {
      console.error('Error updating issue status:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4">Edit Issue Status</Typography>
      <FormControl fullWidth sx={{ marginY: 2 }}>
        <InputLabel>Status</InputLabel>
        <Select value={status} onChange={handleStatusChange}>
          <MenuItem value="Created">Created</MenuItem>
          <MenuItem value="Accepted">Accepted by Authorities</MenuItem>
          <MenuItem value="InProcess">In Process</MenuItem>
          <MenuItem value="Fixed">Problem is Fixed</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleUpdateStatus}>
        Update Status
      </Button>
    </div>
  );
};

export default EditIssueStatus;
