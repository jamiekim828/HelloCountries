import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

// MUI
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { AppDispatch, RootState } from '../redux/store';
import { fetchOneCountry } from '../redux/thunk/country';

export default function Country() {
  // select state
  const countryInfo = useSelector((state: RootState) => state.country.country);

  // variables
  const country = countryInfo[0];

  // const dispatch = useDispatch<AppDispatch>();

  // get country name
  // const params = useParams();
  // const paramsName = params.name;
  // const countryName = paramsName?.toLocaleLowerCase();

  // const money = Object.values(country.currencies)[0];
  // const lang = Object.values(country.languages);

  // const [isLoading, setIsLoading] = useState<boolean>(true);

  // fetch data by name
  // useEffect(() => {
  //   dispatch(fetchOneCountry(countryName));
  // }, [dispatch, countryName]);

  // if (countryInfo.length > 0) {
  //   setIsLoading(false);
  // }

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
            {/* {money?.name}({money?.symbol}) */}
            <br />
            <b>Languages : </b>
            {/* {lang.map((language) => (
                <span>{language}</span>
              ))} */}
            <br />
            <b>Border : </b>
            {}
            <br />
            <b>Map : </b>
            <Link to='/'>Click here</Link>
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

          <Button size='small'>Add Favorite</Button>
        </CardActions>
      </Card>
    </div>
  );
}
