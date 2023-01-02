import { createSlice } from '@reduxjs/toolkit';
import { Country } from '../../types/type';

type InitialStateType = {
  countries: Country[];
};

const initialState: InitialStateType = {
  countries: [],
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    getCountryList: (state, action) => {
      state.countries = action.payload;
    },
  },
});

export const actions = countrySlice.actions;
export default countrySlice.reducer;
