import { AppDispatch } from '../store';
import { actions } from '../slice/country';

const url = 'https://restcountries.com/v3.1';

export function fetchCountyData() {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(`${url}/all`);
    const countryData = await response.json();

    if (countryData.length === 0 || countryData == null) {
      dispatch(actions.showLoadingToggle(true));
    }

    dispatch(actions.getCountryList(countryData));
  };
}

export function fetchOneCountry(name: string | undefined) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(`${url}/name/${name}`);
    const countryDetail = await response.json();

    if (countryDetail.length === 0 || countryDetail == null) {
      dispatch(actions.showLoadingToggle(true));
    }

    dispatch(actions.getCountry(countryDetail));
  };
}

export function fetchByRegion(name: string | undefined) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(`${url}/region/${name}`);
    const countryByRegion = await response.json();

    if (countryByRegion.length === 0 || countryByRegion == null) {
      dispatch(actions.showLoadingToggle(true));
    }
    dispatch(actions.getCountryList(countryByRegion));
  };
}
