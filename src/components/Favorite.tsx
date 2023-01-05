import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';

// MUI
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';

import { actions } from '../redux/slice/country';

// MUI style
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
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

  return (
    <div>
      {favorite.length === 0 ? (
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
          <Paper
            elevation={10}
            sx={{ paddingTop: '10%', paddingBottom: '10%' }}
          >
            There are no favorite countries yet.
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
                    sx={{ width: 128, height: 128 }}
                    href={`/name/${country.name.common}`}
                  >
                    <Img alt='complex' src={`${country.flags.svg}`} />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction='column' spacing={2}>
                    <Grid item xs>
                      <Typography
                        gutterBottom
                        variant='subtitle1'
                        component='div'
                        sx={{ fontFamily: 'nunito' }}
                      >
                        <b>Country : </b>
                        {country.name.common}
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ fontFamily: 'nunito' }}
                        gutterBottom
                      >
                        <b>Capital : </b>
                        {country.capital}
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ fontFamily: 'nunito' }}
                        gutterBottom
                      >
                        <b>Region : </b>
                        {country.region}
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ fontFamily: 'nunito' }}
                        gutterBottom
                      >
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
    </div>
  );
}
