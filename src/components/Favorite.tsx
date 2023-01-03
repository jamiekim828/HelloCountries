import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';

// MUI
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

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
    dispatch(
      actions.removeFavorite(
        favorite.filter(
          (country) =>
            country.name.common.toLocaleLowerCase() !== name.toLocaleLowerCase()
        )
      )
    );
  };

  return (
    <div>
      {favorite.map((country) => (
        <div key={country.name.common}>
          <Paper
            sx={{
              p: 2,
              margin: 'auto',
              maxWidth: 500,
              flexGrow: 1,
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
          >
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase sx={{ width: 128, height: 128 }}>
                  <Img alt='complex' src={`${country.flag}`} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction='column' spacing={2}>
                  <Grid item xs>
                    <Typography
                      gutterBottom
                      variant='subtitle1'
                      component='div'
                    >
                      <b>Country : </b>
                      {country.name.common}
                    </Typography>
                    <Typography variant='body2' gutterBottom>
                      <b>Capital : </b>
                      {country.capital}
                    </Typography>
                    <Typography variant='body2' gutterBottom>
                      <b>Region : </b>
                      {country.region}
                    </Typography>
                    <Typography variant='body2' gutterBottom>
                      <b>Languages : </b>
                      {Object.values(country.languages).map((l) => l + ', ')}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{ cursor: 'pointer' }}
                      variant='body2'
                      onClick={() => {
                        handleRemove(country.name.common);
                        console.log(favorite);
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
      ))}
    </div>
  );
}
