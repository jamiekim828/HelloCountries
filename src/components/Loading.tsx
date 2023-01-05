import React from 'react';
// MUI
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10%',
      }}
    >
      <CircularProgress size='5rem' />
    </Box>
  );
}
