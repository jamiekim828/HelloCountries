import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
import { Country } from '../types/type';

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

  // MUI style
  const style = { fontFamily: 'nunito', fontWeight: '900', fontSize: '18px' };
  const contents = {
    fontFamily: 'nunito',
    fontWeight: '300',
    fontSize: '20px',
  };

  // navigation on click icon
  const navigate = useNavigate();

  const navigateToCountry = (country: Country) => {
    navigate(`/${country.name.common}`);
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
                <TableRow
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell
                    component='th'
                    align='center'
                    scope='row'
                    sx={{ fontSize: '30px' }}
                  >
                    {row.flag}
                  </TableCell>
                  <TableCell align='center' sx={contents}>
                    {row.name.common}
                  </TableCell>
                  <TableCell align='center' sx={contents}>
                    {row.region}d
                  </TableCell>
                  <TableCell align='center' sx={contents}>
                    {row.capital}
                  </TableCell>
                  <TableCell align='center' sx={contents}>
                    {row.population}
                  </TableCell>
                  <TableCell align='center' sx={contents}>
                    <MoreHorizIcon
                      sx={{ cursor: 'pointer' }}
                      // onClick={() => navigateToCountry(row)}
                    />
                  </TableCell>
                  <TableCell align='center' sx={contents}>
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
