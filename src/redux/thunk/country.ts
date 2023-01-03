import { AppDispatch } from '../store';
import { actions } from '../slice/country';

const url = 'https://restcountries.com/v3.1';

export function fetchCountyData() {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(`${url}/all`);
    const countryData = await response.json();

    dispatch(actions.getCountryList(countryData));
  };
}

export function fetchOneCountry(name: string | undefined) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(`${url}/name/${name}`);
    const countryDetail = await response.json();

    dispatch(actions.getCountry(countryDetail));
  };
}
