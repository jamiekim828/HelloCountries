import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// MUI
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteIcon from '@mui/icons-material/Favorite';
// file
import { CountryType } from '../../types/type';
import { fetchOneCountry } from '../../redux/thunk/country';
import { AppDispatch } from '../../redux/store';

// prop type
type PropType = {
  country: CountryType;
  addFavoriteHandler: any;
  contents: object;
  favoriteCountries: CountryType[];
  handleClick: Function;
  handleFavoriteClose: Function;
  dark: boolean;
};

export default function CountryRow({
  country,
  addFavoriteHandler,
  contents,
  favoriteCountries,
  handleClick,
  handleFavoriteClose,
  dark,
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
        sx={{ fontSize: '37px' }}
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
        {country.capital ? country.capital : 'No information'}
      </TableCell>
      <TableCell align='right' sx={contents}>
        {country.population.toLocaleString('en-US')}
      </TableCell>
      <TableCell align='center' sx={contents}>
        <Link to={`/name/${country.name.common}`}>
          <MoreHorizIcon
            color={dark ? 'action' : 'primary'}
            sx={{ cursor: 'pointer', fontSize: '45px' }}
            onClick={() => {
              dispatch(fetchOneCountry(country.name.common));
            }}
          />
        </Link>
      </TableCell>
      <TableCell align='center' sx={contents}>
        {!favorite ? (
          <FavoriteBorderIcon
            sx={{ cursor: 'pointer', fontSize: '37px' }}
            color='error'
            onClick={() => {
              addFavoriteHandler(country);
              handleClick();
            }}
          />
        ) : (
          <FavoriteIcon
            sx={{ cursor: 'pointer', fontSize: '36px' }}
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
