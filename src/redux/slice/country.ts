import { createSlice } from '@reduxjs/toolkit';
import { CountryType } from '../../types/type';
import { current } from '@reduxjs/toolkit';

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
    findFavorite: (state) => {
      const favoriteArr = current(state).favorite;
      const countriesArr = current(state).countries;

      if (favoriteArr.length > 0) {
        favoriteArr.forEach((f) => {
          const index = countriesArr.findIndex(
            (c) => c.name.common === f.name.common
          );
          console.log(index, countriesArr[index]);
          const newObj = { ...countriesArr[index], like: true };
          return newObj;
          // return (countriesArr[index].like = true);
        });
      }
    },
    getCountry: (state, action) => {
      state.country = action.payload;
    },
    addFavorite: (state, action) => {
      state.favorite.push({ ...action.payload, like: true });
    },
    removeFavorite: (state, action) => {
      state.favorite = action.payload;
    },
    changeLike: (state, action) => {
      const index = state.countries.findIndex(
        (country) =>
          country.name.common.toLowerCase() ===
          action.payload.name.common.toLowerCase()
      );
      if (index !== -1) {
        state.countries[index].like = true;
      } else {
        state.countries[index].like = false;
      }
    },
  },
});

export const actions = countrySlice.actions;
export default countrySlice.reducer;
