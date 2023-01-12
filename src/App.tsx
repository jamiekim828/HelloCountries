import { Routes, Route } from 'react-router-dom';

// MUI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// file
import './App.css';
import Navbar from './components/Navbar/Navbar';
import About from './pages/About';
import FavoritePage from './pages/FavoritePage';
import Home from './pages/Home';
import Main from './pages/Main';
import Footer from './components/Footer/Footer';
import Country from './components/Country/Country';
import { useState } from 'react';

// MUI dark mode
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  const [dark, setDark] = useState<boolean>(false);
  const handleDarkMode = () => {
    setDark((prev) => !prev);
  };
  return (
    <div className='App'>
      <ThemeProvider theme={dark ? darkTheme : lightTheme}>
        <CssBaseline />
        <Navbar dark={dark} handleDarkMode={handleDarkMode} />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/countries' element={<Main dark={dark} />}></Route>
          <Route path='/name/:name' element={<Country />}></Route>
          <Route path='/favorite' element={<FavoritePage />}></Route>
          <Route path='/about' element={<About />}></Route>
        </Routes>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
