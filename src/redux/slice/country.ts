import { createSlice } from '@reduxjs/toolkit';
import { CountryType } from '../../types/type';

type InitialStateType = {
  countries: CountryType[];
  country: CountryType[];
};

const initialState: InitialStateType = {
  countries: [],
  country: [],
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    getCountryList: (state, action) => {
      state.countries = action.payload;
    },
    getCountry: (state, action) => {
      state.country = action.payload;
    },
  },
});

export const actions = countrySlice.actions;
export default countrySlice.reducer;
