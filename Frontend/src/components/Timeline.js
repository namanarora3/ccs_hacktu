// ColorsTimeline.js
import React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

const ColorsTimeline = ({ currentStatus, orientation = 'vertical' }) => {
  const statuses = ['Created', 'Accepted by Authorities', 'In Process', 'Problem is Fixed'];

  const getStatusIndex = (status) => {
    return statuses.indexOf(status);
  };

  return (
    <Timeline position="alternate" orientation={orientation}>
      {statuses.map((status, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot color={getStatusIndex(currentStatus) >= index ? 'primary' : 'grey'} />
            {index < statuses.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>{status}</TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default ColorsTimeline;
