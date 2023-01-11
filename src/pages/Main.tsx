import Search from '../components/Search/Search';
import CountryList from '../components/Country/CountryList';

export default function Main() {
  return (
    <div className='container'>
      <Search />
      <CountryList />
    </div>
  );
}
