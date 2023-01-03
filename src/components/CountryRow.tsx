import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { CountryType } from '../types/type';
import { fetchOneCountry } from '../redux/thunk/country';
import { AppDispatch, RootState } from '../redux/store';

type PropType = {
  country: CountryType;
  addFavoriteHandler: any;
  contents: object;
};

export default function CountryRow({
  country,
  addFavoriteHandler,
  contents,
}: PropType) {
  // action dispatch
  const dispatch = useDispatch<AppDispatch>();

  // like state
  const like = useSelector((state: RootState) => state.country.like);

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
        {country.region}d
      </TableCell>
      <TableCell align='center' sx={contents}>
        {country.capital}
      </TableCell>
      <TableCell align='center' sx={contents}>
        {country.population}
      </TableCell>
      <TableCell align='center' sx={contents}>
        <Link to={`/name/${country.name.common}`}>
          <MoreHorizIcon
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              dispatch(fetchOneCountry(country.name.common));
            }}
          />
        </Link>
      </TableCell>
      <TableCell align='center' sx={contents}>
        {like ? (
          <FavoriteIcon sx={{ cursor: 'pointer' }} color='error' />
        ) : (
          <FavoriteBorderIcon
            sx={{ cursor: 'pointer' }}
            color='error'
            onClick={() => {
              addFavoriteHandler(country);
            }}
          />
        )}
      </TableCell>
    </TableRow>
  );
}
