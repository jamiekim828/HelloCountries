import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

// MUI
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { AppDispatch, RootState } from '../redux/store';
import { actions } from '../redux/slice/country';
import { CountryType } from '../types/type';

export default function Country() {
  // select state
  const countryInfo = useSelector((state: RootState) => state.country.country);
  const favoriteCountries = useSelector(
    (state: RootState) => state.country.favorite
  );
  const location = useLocation();
  const like = location.state.like;

  // variables
  const country = countryInfo[0];
  const money = Object.values(country.currencies)[0];
  const lingua = Object.values(country.languages);
  const maps = Object.values(country.maps)[0];

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

  console.log('this', country);

  return (
    <div>
      <Card
        sx={{
          minWidth: 275,
          width: '400px',
          height: '600px',
        }}
      >
        <CardMedia
          component='img'
          height='230'
          image={`${country?.flags.svg}`}
          alt={`${country?.name.common}`}
        />
        <CardContent>
          <Typography variant='h5' component='div'>
            {country?.name.common}
          </Typography>
          <Typography sx={{ mb: 3 }} color='text.secondary'>
            {country?.name.official}
          </Typography>
          <Typography
            variant='body2'
            sx={{ textAlign: 'left', marginLeft: '23%' }}
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
            {money?.name}({money?.symbol})
            <br />
            <b>Languages : </b>
            {lingua?.map((l) => l + ', ')}
            <br />
            <b>Border : </b>
            {country?.borders.map((b) => b + ', ')}
            <br />
            <b>Map : </b>
            <a href={`${maps}`} target='_blank' rel='noreferrer'>
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
          <Link to='/'>
            <Button size='small'>Back</Button>
          </Link>

          <Button size='small' onClick={() => handleFavoriteBtn(country)}>
            Add Favorite
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
