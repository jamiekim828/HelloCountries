import { Routes, Route } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import About from './pages/About';
import FavoritePage from './pages/FavoritePage';
import Home from './pages/Home';
import Main from './pages/Main';
import Footer from './components/Footer/Footer';
import Country from './components/Country/Country';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/countries' element={<Main />}></Route>
        <Route path='/name/:name' element={<Country />}></Route>
        <Route path='/favorite' element={<FavoritePage />}></Route>
        <Route path='/about' element={<About />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
