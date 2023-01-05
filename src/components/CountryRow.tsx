import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { CountryType } from '../types/type';
import { fetchOneCountry } from '../redux/thunk/country';
import { AppDispatch } from '../redux/store';

// prop type
type PropType = {
  country: CountryType;
  addFavoriteHandler: any;
  contents: object;
  like: boolean;
  favoriteCountries: CountryType[];
  handleClick: Function;
  handleFavoriteClose: Function;
};

export default function CountryRow({
  country,
  addFavoriteHandler,
  contents,
  like,
  favoriteCountries,
  handleClick,
  handleFavoriteClose,
}: PropType) {
  // action dispatch
  const dispatch = useDispatch<AppDispatch>();

  const favorite = favoriteCountries.some(
    (item) => item.name.common === country.name.common
  );

  return (
    <TableRow
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
      }}
      key={country.name.common}
    >
      <TableCell
        component='th'
        align='center'
        scope='row'
        sx={{ fontSize: '30px' }}
      >
        {country.flag}
      </TableCell>
      <TableCell align='center' sx={contents}>
        {country.name.common}
      </TableCell>
      <TableCell align='center' sx={contents}>
        {country.region}
      </TableCell>
      <TableCell align='center' sx={contents}>
        {country.capital}
      </TableCell>
      <TableCell align='center' sx={contents}>
        {country.population}
      </TableCell>
      <TableCell align='center' sx={contents}>
        <Link to={`/name/${country.name.common}`} state={{ like: like }}>
          <MoreHorizIcon
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              dispatch(fetchOneCountry(country.name.common));
            }}
          />
        </Link>
      </TableCell>
      <TableCell align='center' sx={contents}>
        {!favorite ? (
          <FavoriteBorderIcon
            sx={{ cursor: 'pointer' }}
            color='error'
            onClick={() => {
              addFavoriteHandler(country);
              handleClick();
            }}
          />
        ) : (
          <FavoriteIcon
            sx={{ cursor: 'pointer' }}
            color='error'
            onClick={() => {
              addFavoriteHandler(country);
              handleFavoriteClose();
            }}
          />
        )}
      </TableCell>
    </TableRow>
  );
}
