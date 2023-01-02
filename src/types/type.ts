export type Country = {
  borders: string[];
  capital: string[];
  cca3: string;
  currencies: { name: string; symbol: string };
  flags: { png: string; svg: string };
  flag: string;
  independent: boolean;
  languages: {};
  name: { common: string; official: string };
  population: number;
  region: string;
  subregion: string;
  unMember: boolean;
};
