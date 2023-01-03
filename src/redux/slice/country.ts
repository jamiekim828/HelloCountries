import { createSlice } from '@reduxjs/toolkit';
import { CountryType } from '../../types/type';

type InitialStateType = {
  countries: CountryType[];
  country: CountryType[];
  favorite: CountryType[];
  like: boolean;
};

const initialState: InitialStateType = {
  countries: [],
  country: [],
  favorite: [],
  like: false,
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
    changeLike: (state, action) => {
      state.like = !state.like;
    },
  },
});

export const actions = countrySlice.actions;
export default countrySlice.reducer;
