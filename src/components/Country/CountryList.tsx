import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';

// MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

// file
import { AppDispatch, RootState } from '../../redux/store';
import { fetchCountyData } from '../../redux/thunk/country';
import { actions } from '../../redux/slice/country';
import { CountryType } from '../../types/type';
import CountryRow from './CountryRow';
import Loading from '../Loading/Loading';

// MUI table function
function createData(
  flag: string,
  name: { common: string; official: string },
  region: string,
  capital: string[],
  cca3: string,
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
    cca3,
    population,
    languages,
    currencies,
    borders,
    maps,
    flags,
  };
}

// MUI Alert
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

// prop type
type PropType = {
  dark: boolean;
};

export default function CountryList({ dark }: PropType) {
  // select store
  const countryList = useSelector(
    (state: RootState) => state.country.countries
  );
  const favoriteCountries = useSelector(
    (state: RootState) => state.country.favorite
  );
  const loading = useSelector((state: RootState) => state.country.showLoading);

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
      country.cca3,
      country.population,
      country.languages,
      country.currencies,
      country.borders,
      country.maps,
      country.flags
    )
  );

  // MUI pagenation
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // MUI Snackbar
  const [open, setOpen] = useState<boolean>(false);
  const [openAlert, SetOpenAlert] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleFavoriteClose = () => {
    SetOpenAlert(true);
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

  const handleCloseAlert = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    SetOpenAlert(false);
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

  const actionAlert = (
    <Fragment>
      <IconButton
        size='small'
        aria-label='close'
        color='primary'
        onClick={handleCloseAlert}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </Fragment>
  );

  // MUI style
  const style = { fontFamily: 'nunito', fontWeight: '900', fontSize: '20px' };
  const contents = {
    fontFamily: 'nunito',
    fontWeight: '300',
    fontSize: '20px',
  };

  // favorite button on click function
  const addFavoriteHandler = (favorite: CountryType) => {
    const hasDuplicate = favoriteCountries.some(
      (country) =>
        country.name.common.toLocaleLowerCase() ===
        favorite.name.common.toLocaleLowerCase()
    );
    if (hasDuplicate) {
      return dispatch(actions.removeFavorite(favorite.name.common));
    } else {
      return dispatch(actions.addFavorite(favorite));
    }
  };

  return (
    <div>
      {loading === true ? (
        <div>
          <Loading />
        </div>
      ) : (
        <Paper
          sx={{
            width: '92%',
            overflow: 'hidden',
            margin: 'auto',
          }}
        >
          <TableContainer sx={{ maxHeight: 470 }}>
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
                {rows.length < rowsPerPage * (page + 1) &&
                  rows.map((row) => (
                    <CountryRow
                      key={row.name.common}
                      country={row}
                      addFavoriteHandler={addFavoriteHandler}
                      contents={contents}
                      favoriteCountries={favoriteCountries}
                      handleClick={handleClick}
                      handleFavoriteClose={handleFavoriteClose}
                      dark={dark}
                    />
                  ))}
                {rows.length >= rowsPerPage * (page + 1) &&
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <CountryRow
                        key={row.name.common}
                        country={row}
                        addFavoriteHandler={addFavoriteHandler}
                        contents={contents}
                        favoriteCountries={favoriteCountries}
                        handleClick={handleClick}
                        handleFavoriteClose={handleFavoriteClose}
                        dark={dark}
                      />
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          {rows.length < rowsPerPage * (page + 1) ? (
            <></>
          ) : (
            <TablePagination
              rowsPerPageOptions={[50, 100, 250]}
              component='div'
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Paper>
      )}
      <div>
        <Snackbar
          open={open}
          autoHideDuration={1600}
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
      <div>
        <Snackbar
          open={openAlert}
          autoHideDuration={1600}
          onClose={handleCloseAlert}
          action={actionAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity='warning'
            sx={{ width: '100%' }}
          >
            The country has removed from your favorite
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
