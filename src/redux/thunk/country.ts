import { AppDispatch } from '../store';
import { actions } from '../slice/country';

const url = 'https://restcountries.com/v3.1/all';

export function fetchCountyData() {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(url);
    const countryData = await response.json();

    dispatch(actions.getCountryList(countryData));
  };
}
