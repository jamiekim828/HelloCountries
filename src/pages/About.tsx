// MUI
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

//file
import image from '../assets/images/countries.png';

// MUI style
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '40%',
  maxHeight: '40%',
});

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
            marginTop: '4.7%',
            marginBottom: '4.7%',
          },
        }}
      >
        <Paper elevation={10} sx={{ paddingTop: '5%', paddingBottom: '5%' }}>
          <Typography
            gutterBottom
            variant='subtitle1'
            component='div'
            sx={{ fontFamily: 'nunito', fontSize: '28px', marginBottom: '5%' }}
          >
            <b>HELLO COUNTRIES</b>
          </Typography>
          <Typography
            variant='body2'
            sx={{
              fontFamily: 'nunito',
              fontSize: '18px',
              textAlign: 'left',
              marginLeft: '20%',
            }}
            gutterBottom
          >
            <b>This site is made by Soo in 2023 </b>
            <br />
            <b>for the Front End Project at Integrify.</b>
            <br />
            <b>React, Redux ToolKit and TypeScript are used</b>
            <br />
            <b>with MUI style.</b>
            <br />
            <br />
            <b>You can search by country name or region </b>
            <br />
            <b>and sort by alphabetical order.</b>
            <br />
            <br />
            <b>Fetched data from REST COUNTRIES API.</b>
          </Typography>
          <a href='https://restcountries.com/' target='_blank' rel='noreferrer'>
            <Img alt='RESTCOUNTRIES' src={image} />
          </a>
        </Paper>
      </Box>
    </div>
  );
}
