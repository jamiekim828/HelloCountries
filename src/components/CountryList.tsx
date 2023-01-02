import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { AppDispatch, RootState } from '../redux/store';
import { fetchCountyData } from '../redux/thunk/country';

// MUI table function
function createData(
  flag: string,
  name: { common: string; official: string },
  region: string,
  capital: string[],
  population: number
) {
  return { flag, name, region, capital, population };
}

export default function CountryList() {
  // select store
  const countryList = useSelector(
    (state: RootState) => state.country.countries
  );
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
      country.population
    )
  );

  // MUI pagination
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

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Flag</TableCell>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>Region</TableCell>
              <TableCell align='center'>Capital</TableCell>
              <TableCell align='center'>Population</TableCell>
              <TableCell align='center'>More Info</TableCell>
              <TableCell align='center'>Favorite</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell
                    component='th'
                    align='center'
                    scope='row'
                    sx={{ fontSize: '30px' }}
                  >
                    {row.flag}
                  </TableCell>
                  <TableCell align='center'>{row.name.common}</TableCell>
                  <TableCell align='center'>{row.region}</TableCell>
                  <TableCell align='center'>{row.capital}</TableCell>
                  <TableCell align='center'>{row.population}</TableCell>
                  <TableCell align='center'>
                    <MoreHorizIcon sx={{ cursor: 'pointer' }} />
                  </TableCell>
                  <TableCell align='center'>
                    <FavoriteBorderIcon sx={{ cursor: 'pointer' }} />
                  </TableCell>
                </TableRow>
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
