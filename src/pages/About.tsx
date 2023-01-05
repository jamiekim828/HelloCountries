import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function About() {
  return (
    <div className='container'>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        '& > :not(style)': {
          m: 1,
          width: 600,
          height: '60%',
          fontSize: '2rem',
          marginTop: '12%',
          marginBottom: '12%',
        },
      }}
    >
      <Paper elevation={10} sx={{ paddingTop: '15%' }}></Paper>
    </Box>
    </div>
  );
}
