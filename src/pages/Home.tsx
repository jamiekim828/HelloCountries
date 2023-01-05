import Search from '../components/Search';
import CountryList from '../components/CountryList';

export default function Home() {
  return (
    <div className='container'>
      <Search />
      <CountryList />
    </div>
  );
}
