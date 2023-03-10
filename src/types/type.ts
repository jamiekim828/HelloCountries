export type CountryType = {
  borders: string[];
  capital: string[];
  cca3: string;
  currencies: { [key: string]: { name: string; symbol: string } };
  flags: { png: string; svg: string };
  flag: string;
  languages: object;
  name: { common: string; official: string };
  maps: { googleMaps: string };
  population: number;
  region: string;
};
