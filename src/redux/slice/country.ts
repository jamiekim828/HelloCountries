import { createSlice } from '@reduxjs/toolkit';
import { CountryType } from '../../types/type';

type InitialStateType = {
  countries: CountryType[];
  country: CountryType[];
  favorite: CountryType[];
};

const initialState: InitialStateType = {
  countries: [],
  country: [],
  favorite: [],
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
    addFavorite: (state, action) => {
      state.favorite.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorite = action.payload;
    },
  },
});

export const actions = countrySlice.actions;
export default countrySlice.reducer;
