import React from 'react';
import CommentSection from '../../components/Post'; 
import Garbage from '../../../public/images/rimjhim/garbage.png';
import { useState } from 'react';
const dummyData = [
    {
      username: 'John Doe',
      status: 'In Process',
      issueName: 'Lorem Ipsum Issue',
      issueDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      location: 'City A',
      date: '2024-02-10',
      upvoteCount: 10,
      category: 'Technology',
      image: Garbage,
      comments: [
        { username: 'Alice', text: 'Great issue!' },
        { username: 'Bob', text: 'I agree, this needs attention.' },
      ],
    },
  ];
  
  
const IssuesPage = () => {
  // You should replace dummyData with your actual data
  const issuesData = dummyData;

  const handleUpvote = (issueId) => {
    // Logic to handle upvote action
    console.log(`Upvoted issue ${issueId}`);
  };

  const handleSubmitComment = (comment, issueId) => {
    // Logic to handle submitting comments
    console.log(`Comment submitted for issue ${issueId}: ${comment}`);
  };

  
  return (
    <div>
      <h1>Issues Page</h1>
      {issuesData.map((issue, index) => (
        <CommentSection
          key={index}
          issue={issue}
          onUpvote={() => handleUpvote(index)}
          onCommentSubmit={(comment) => handleSubmitComment(comment, index)}
        />
      ))}
    </div>
  );
};

export default IssuesPage;
