import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
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
import MuiAlert, { AlertProps } from '@mui/material/Alert';

// file
import { AppDispatch, RootState } from '../../redux/store';
import { actions } from '../../redux/slice/country';
import { CountryType } from '../../types/type';
import { fetchOneCountry } from '../../redux/thunk/country';

// MUI Alert
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function Country() {
  // select state
  const countryInfo = useSelector((state: RootState) => state.country.country);
  const favoriteCountries = useSelector(
    (state: RootState) => state.country.favorite
  );
  const allCountries = useSelector(
    (state: RootState) => state.country.allCountries
  );
  // set state
  const [loading, setLoading] = useState<boolean>(true);

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

    if (hasDuplicate) {
      alert('This country is already added.');
    } else {
      dispatch(actions.addFavorite(favorite));
    }
  };

  // border name on click
  const navigate = useNavigate();
  const neighbor = (border: string) => {
    const countryInfo = allCountries.find((c) => c.cca3 === border);
    const countryName = countryInfo?.name.common;
    dispatch(fetchOneCountry(countryName));
    navigate(`/name/${countryName}`);
  };

  return (
    <div className='container'>
      {loading && <div> loading... </div>}
      {!loading && (
        <Card
          sx={{
            minWidth: 275,
            width: '400px',
            height: 'auto',
            border: 1,
          }}
        >
          <CardMedia
            component='img'
            height='230'
            image={`${country?.flags.svg}`}
            alt={`${country?.name.common}`}
            sx={{ borderBottom: 1 }}
          />
          <CardContent>
            <Typography
              variant='h5'
              component='div'
              sx={{ fontFamily: 'nunito', fontWeight: '800' }}
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
                marginLeft: '22%',
                fontFamily: 'nunito',
                fontSize: '17px',
              }}
            >
              <b>Region : </b>
              {country?.region}
              <br />
              <b>Capital : </b>
              {country?.capital ? country?.capital : 'No capital'}
              <br />
              <b>Population : </b>
              {country?.population.toLocaleString('en-US')}
              <br />
              <b>Currency : </b>
              {country?.currencies
                ? Object.values(country?.currencies)[0]?.name
                : 'No information'}
              (
              {country?.currencies
                ? Object.values(country?.currencies)[0]?.symbol
                : '?'}
              )
              <br />
              <b>Languages : </b>
              {country?.languages
                ? Object.values(country?.languages)?.map(
                    (l, index) =>
                      l +
                      `${
                        index === Object.values(country.languages).length - 1
                          ? ' '
                          : ', '
                      }`
                  )
                : 'No information'}
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
            <Link to='/countries' style={{ textDecoration: 'none' }}>
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
          autoHideDuration={3000}
          onClose={handleClose}
          action={action}
        >
          <Alert
            onClose={handleClose}
            severity='success'
            sx={{ width: '100%' }}
          >
            The country has successfully added to your favorite
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
