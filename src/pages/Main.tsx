import Search from '../components/Search/Search';
import CountryList from '../components/Country/CountryList';

type PropType = {
  dark: boolean;
};

export default function Main({ dark }: PropType) {
  return (
    <div className='container'>
      <Search />
      <CountryList dark={dark} />
    </div>
  );
}
