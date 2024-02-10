// Update the Timeline.js file

import React from 'react';
import { Timeline as MuiTimeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/material';

const Timeline = ({ status }) => {
  const statuses = ['Created', 'Accepted by Authorities', 'In Process', 'Problem is Fixed'];

  const getStatusIndex = (status) => {
    return statuses.indexOf(status);
  };

  return (
    <MuiTimeline align="alternate">
      {statuses.map((timelineStatus, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot color={getStatusIndex(status) >= index ? 'primary' : 'grey'} />
            {index < statuses.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>{timelineStatus}</TimelineContent>
        </TimelineItem>
      ))}
    </MuiTimeline>
  );
};

export default Timeline;
