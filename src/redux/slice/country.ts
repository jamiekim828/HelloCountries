import { createSlice } from '@reduxjs/toolkit';
import { CountryType } from '../../types/type';

type InitialStateType = {
  countries: CountryType[];
  country: CountryType[];
  favorite: CountryType[];
  showLoading: boolean;
};

const initialState: InitialStateType = {
  countries: [],
  country: [],
  favorite: [],
  showLoading: false,
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
    getAlphabeticalOrder: (state, action) => {
      const sorted = action.payload
        .map((country: CountryType) =>
          Object.assign({}, country, { like: false })
        )
        .sort((a: CountryType, b: CountryType) => {
          if (a.name.common < b.name.common) {
            return -1;
          }
          if (a.name.common > b.name.common) {
            return 1;
          }
          return 0;
        });
      state.countries = sorted;
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
    showLoadingToggle: (state, action) => {
      state.showLoading = action.payload;
    },
  },
});

export const actions = countrySlice.actions;
export default countrySlice.reducer;
