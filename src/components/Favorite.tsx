import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useState, Fragment } from 'react';

// MUI
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

// file
import { AppDispatch, RootState } from '../redux/store';
import { actions } from '../redux/slice/country';
import image from '../assets/images/world.png';

// MUI style
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

// MUI Alert
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function Favorite() {
  // get state
  const favorite = useSelector((state: RootState) => state.country.favorite);
  // dispatch for action
  const dispatch = useDispatch<AppDispatch>();

  // remove button function
  const handleRemove = (name: string) => {
    dispatch(actions.removeFavorite(name));
  };

  // MUI Snackbar
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  // MUI Snackbar action
  const action = (
    <Fragment>
      <IconButton
        size='small'
        aria-label='close'
        color='primary'
        onClick={handleClose}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </Fragment>
  );

  // flag on click -> to the country card
  const navigate = useNavigate();
  const goToCountry = (name: string) => {
    navigate(`/name/${name}`);
  };

  return (
    <div>
      {favorite.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            '& > :not(style)': {
              m: 1,
              width: 550,
              fontSize: '2rem',
              marginTop: '4%',
              marginBottom: '4%',
            },
          }}
        >
          <Paper elevation={10} sx={{ paddingTop: '3%' }}>
            There are no favorite countries.
            <Img alt='complex' src={image} />
          </Paper>
        </Box>
      ) : (
        favorite.map((country) => (
          <div key={country.name.common}>
            <Paper
              sx={{
                p: 2,
                margin: 'auto',
                marginTop: '1%',
                marginBottom: '1%',
                maxWidth: 500,
                flexGrow: 1,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
              }}
            >
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase
                    sx={{
                      width: 128,
                      height: 128,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Img
                      alt='complex'
                      src={`${country.flags.svg}`}
                      sx={{ border: 1 }}
                      onClick={() => {
                        goToCountry(country.name.common);
                      }}
                    />
                    Click for more information.
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction='column' spacing={2}>
                    <Grid item xs>
                      <Typography
                        gutterBottom
                        variant='subtitle1'
                        component='div'
                        sx={{ fontFamily: 'nunito', fontSize: '20px' }}
                      >
                        <b>Country : </b>
                        {country.name.common}
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{
                          fontFamily: 'nunito',
                          fontSize: '17px',
                          textAlign: 'left',
                          marginLeft: '28%',
                        }}
                        gutterBottom
                      >
                        <b>Capital : </b>
                        {country.capital}
                        <br />
                        <b>Region : </b>
                        {country.region}
                        <br />
                        <b>Languages : </b>
                        {Object.values(country.languages).map((l) => l + ', ')}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        sx={{
                          cursor: 'pointer',
                          color: '#3d5fa3',
                          fontFamily: 'nunito',
                          fontWeight: '800',
                        }}
                        variant='body2'
                        onClick={() => {
                          handleRemove(country.name.common);
                          handleClick();
                        }}
                      >
                        Remove
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </div>
        ))
      )}
      <div>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          action={action}
        >
          <Alert
            onClose={handleClose}
            severity='warning'
            sx={{ width: '100%' }}
          >
            The country has removed from your favorite
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
