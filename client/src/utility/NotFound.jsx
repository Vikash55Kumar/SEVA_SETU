import React from 'react';
import { Button } from '@mui/material';
import './notFound.css';

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h2>Page Not Found</h2>
      <Button href='/'>Go Back</Button>
    </div>
  );
}
