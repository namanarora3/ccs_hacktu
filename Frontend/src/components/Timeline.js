import React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

const ColorsTimeline = ({ currentStatus, orientation = 'vertical' }) => {
  const statusMap = {
    1: 'Created',
    2: 'Accepted by Authorities',
    3: 'In Process',
    4: 'Problem is Fixed',
  };

  const getStatusText = (statusNumber) => {
    return statusMap[statusNumber] || 'Unknown Status';
  };

  return (
    <Timeline position="alternate" orientation={orientation}>
      {[1, 2, 3, 4].map((statusNumber) => (
        <TimelineItem key={statusNumber}>
          <TimelineSeparator>
            <TimelineDot color={currentStatus >= statusNumber ? 'primary' : 'grey'} />
            {statusNumber < 4 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>{getStatusText(statusNumber)}</TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default ColorsTimeline;