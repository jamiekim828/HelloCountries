import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

// MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import { AppDispatch, RootState } from '../redux/store';
import { fetchCountyData } from '../redux/thunk/country';
import { actions } from '../redux/slice/country';
import { CountryType } from '../types/type';
import CountryRow from './CountryRow';

// MUI table function
function createData(
  flag: string,
  name: { common: string; official: string },
  region: string,
  capital: string[],
  population: number,
  languages: object,
  currencies: { [key: string]: { name: string; symbol: string } },
  borders: string[],
  maps: { googleMaps: string },
  flags: { png: string; svg: string }
) {
  return {
    flag,
    name,
    region,
    capital,
    population,
    languages,
    currencies,
    borders,
    maps,
    flags,
  };
}

export default function CountryList() {
  // select store
  const countryList = useSelector(
    (state: RootState) => state.country.countries
  );
  const favoriteCountries = useSelector(
    (state: RootState) => state.country.favorite
  );

  // dispatch for action
  const dispatch = useDispatch<AppDispatch>();

  // fetch data with useEffect
  useEffect(() => {
    dispatch(fetchCountyData());
  }, [dispatch]);

  // MUI table rows
  const rows = countryList.map((country) =>
    createData(
      country.flag,
      country.name,
      country.region,
      country.capital,
      country.population,
      country.languages,
      country.currencies,
      country.borders,
      country.maps,
      country.flags
    )
  );

  // MUI
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const addFavoriteHandler = (favorite: CountryType) => {
    const hasDuplicate = favoriteCountries.some(
      (country) =>
        country.name.common.toLocaleLowerCase() ===
        favorite.name.common.toLocaleLowerCase()
    );
    if (hasDuplicate) {
      return alert('This country is already added.');
    } else {
      return dispatch(actions.addFavorite(favorite));
    }
  };

  // MUI style
  const style = { fontFamily: 'nunito', fontWeight: '900', fontSize: '18px' };
  const contents = {
    fontFamily: 'nunito',
    fontWeight: '300',
    fontSize: '20px',
  };

  return (
    <Paper
      sx={{
        width: '92%',
        overflow: 'hidden',
        margin: 'auto',
      }}
    >
      <TableContainer sx={{ maxHeight: 450 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell align='center' sx={style}>
                Flag
              </TableCell>
              <TableCell align='center' sx={style}>
                Name
              </TableCell>
              <TableCell align='center' sx={style}>
                Region
              </TableCell>
              <TableCell align='center' sx={style}>
                Capital
              </TableCell>
              <TableCell align='center' sx={style}>
                Population
              </TableCell>
              <TableCell align='center' sx={style}>
                More Info
              </TableCell>
              <TableCell align='center' sx={style}>
                Favorite
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <CountryRow
                  key={row.name.common}
                  country={row}
                  addFavoriteHandler={addFavoriteHandler}
                  contents={contents}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
