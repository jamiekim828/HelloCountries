import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import { fetchCountyData } from '../redux/thunk/country';
import { AppDispatch, RootState } from '../redux/store';
import { actions } from '../redux/slice/country';

export default function Search() {
  // get state
  const countryList = useSelector(
    (state: RootState) => state.country.countries
  );

  // set state
  const [region, setRegion] = useState('');
  const [userInput, setUserInput] = useState('');

  // region selection handle change
  const handleChange = (event: SelectChangeEvent) => {
    setRegion(event.target.value);
  };

  // search function on change
  const dispatch = useDispatch<AppDispatch>();
  const searchUserInput = (name: string) => {
    const result = countryList.filter((country) =>
      country.name.common.toLocaleLowerCase().includes(name.toLocaleLowerCase())
    );
    // filtered country list
    dispatch(actions.getCountryList(result));
  };

  // search handle change
  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
    searchUserInput(userInput);
  };

  // on delete input fetch data again
  useEffect(() => {
    if (userInput === '') {
      dispatch(fetchCountyData());
    }
  }, [dispatch, userInput]);

  return (
    <div className='search-div'>
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
          marginBottom: '10px',
        }}
        noValidate
        autoComplete='off'
      >
        <TextField
          id='standard-basic'
          label='Search by name'
          variant='standard'
          value={userInput}
          onChange={handleUserInput}
        />
      </Box>
      <div className='switch'>
        <FormControl component='fieldset'>
          <FormControlLabel
            value='end'
            control={<Switch color='primary' />}
            label='Sort A to Z'
            labelPlacement='end'
            sx={{ color: '#606470' }}
          />
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id='demo-simple-select-helper-label'>
            By Region
          </InputLabel>
          <Select
            labelId='demo-simple-select-helper-label'
            id='demo-simple-select-helper'
            value={region}
            label='Region'
            onChange={handleChange}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value={'africa'}>Africa</MenuItem>
            <MenuItem value={'america'}>Americas</MenuItem>
            <MenuItem value={'antartic'}>Antartic</MenuItem>
            <MenuItem value={'asia'}>Asia</MenuItem>
            <MenuItem value={'europe'}>Europe</MenuItem>
            <MenuItem value={'oceania'}>Oceania</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
