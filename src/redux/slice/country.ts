import { createSlice } from '@reduxjs/toolkit';
import { CountryType } from '../../types/type';

type InitialStateType = {
  loading: boolean;
  countries: CountryType[];
  country: CountryType[];
  favorite: CountryType[];
};

const initialState: InitialStateType = {
  loading: false,
  countries: [],
  country: [],
  favorite: [],
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    getCountryList: (state, action) => {
      state.countries = action.payload.map((country: CountryType) =>
        Object.assign({}, country, { like: false })
      );
    },
    getCountry: (state, action) => {
      state.country = action.payload;
    },
    addFavorite: (state, action) => {
      state.favorite.push({ ...action.payload, like: true });
    },
    removeFavorite: (state, action) => {
      const filter = state.favorite.filter(
        (country) =>
          country.name.common.toLocaleLowerCase() !==
          action.payload.toLocaleLowerCase()
      );
      state.favorite = filter;
    },
  },
});

export const actions = countrySlice.actions;
export default countrySlice.reducer;
