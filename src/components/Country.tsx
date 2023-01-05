import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Fragment } from 'react';

// MUI
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { AppDispatch, RootState } from '../redux/store';
import { actions } from '../redux/slice/country';
import { CountryType } from '../types/type';

export default function Country() {
  // select state
  const countryList = useSelector(
    (state: RootState) => state.country.countries
  );
  const countryInfo = useSelector((state: RootState) => state.country.country);
  const favoriteCountries = useSelector(
    (state: RootState) => state.country.favorite
  );
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  const like = location.state.like;

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

  // variables
  const country = countryInfo[0];

  // loading
  useEffect(() => {
    if (countryInfo.length !== 0) {
      setLoading(false);
    }
  }, [countryInfo.length]);

  // add favorite btn handler
  const dispatch = useDispatch<AppDispatch>();

  const handleFavoriteBtn = (favorite: CountryType) => {
    const hasDuplicate = favoriteCountries.some(
      (country) =>
        country.name.common.toLocaleLowerCase() ===
        favorite.name.common.toLocaleLowerCase()
    );

    if (hasDuplicate || like === true) {
      alert('This country is already added.');
    } else {
      dispatch(actions.addFavorite(favorite));
    }
  };

  // border name on click
  const neighbor = (border: string) => {
    const countryName = countryList.find((c) => c.cca3 === border)?.name.common;
    console.log(countryName);
  };

  return (
    <div className='container'>
      {loading && <div> loading... </div>}
      {!loading && (
        <Card
          sx={{
            minWidth: 275,
            width: '400px',
            height: '580px',
          }}
        >
          <CardMedia
            component='img'
            height='230'
            image={`${country?.flags.svg}`}
            alt={`${country?.name.common}`}
          />
          <CardContent>
            <Typography
              variant='h5'
              component='div'
              sx={{ fontFamily: 'nunito' }}
            >
              {country?.name.common}
            </Typography>
            <Typography
              sx={{ mb: 3, fontFamily: 'nunito' }}
              color='text.secondary'
            >
              {country?.name.official}
            </Typography>
            <Typography
              variant='body2'
              sx={{
                textAlign: 'left',
                marginLeft: '23%',
                fontFamily: 'nunito',
              }}
            >
              <b>Region : </b>
              {country?.region}
              <br />
              <b>Capital : </b>
              {country?.capital}
              <br />
              <b>Population : </b>
              {country?.population}
              <br />
              <b>Currency : </b>
              {Object.values(country?.currencies)[0]?.name}(
              {Object.values(country?.currencies)[0]?.symbol})
              <br />
              <b>Languages : </b>
              {Object.values(country?.languages)?.map((l) => l + ', ')}
              <br />
              <b>Border : </b>
              {country?.borders
                ? country?.borders.map((border, index) => (
                    <Button
                      variant='text'
                      key={index}
                      onClick={() => {
                        neighbor(border);
                      }}
                    >
                      {border}
                    </Button>
                  ))
                : 'No borders'}
              <br />
              <b>Map : </b>
              <a
                href={`${Object.values(country?.maps)[0]}`}
                target='_blank'
                rel='noreferrer'
                style={{ textDecoration: 'none' }}
              >
                Click here
              </a>
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Link to='/' style={{ textDecoration: 'none' }}>
              <Button size='small' sx={{ fontFamily: 'nunito' }}>
                Back
              </Button>
            </Link>

            <Button
              size='small'
              sx={{ fontFamily: 'nunito' }}
              onClick={() => {
                handleFavoriteBtn(country);
                handleClick();
              }}
            >
              Add Favorite
            </Button>
          </CardActions>
        </Card>
      )}
      <div>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          message='The country has added successfully'
          action={action}
        />
      </div>
    </div>
  );
}
