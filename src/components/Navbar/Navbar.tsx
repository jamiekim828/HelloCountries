import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
import ListIcon from '@mui/icons-material/List';
import Brightness6Icon from '@mui/icons-material/Brightness6';

//file
import { RootState } from '../../redux/store';

type PropType = {
  dark: boolean;
  handleDarkMode: Function;
};
export default function Navbar({ dark, handleDarkMode }: PropType) {
  // get favorite state
  const favorite = useSelector((state: RootState) => state.country.favorite);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position='static'
          sx={{
            md: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            bgcolor: 'black',
            alignItems: 'center',
            height: '60px',
          }}
        >
          <Box
            sx={{
              letterSpacing: 6,
              fontSize: '30px',
              fontWeight: '900',
              textTransform: 'uppercase',
              marginLeft: '7%',
              fontFamily: 'nunito',
            }}
          >
            <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
              {' '}
              Hello countries
            </Link>
          </Box>

          <Box
            sx={{
              display: {
                xs: 'none',
                md: 'flex',
                justifyContent: 'flex-end',
                paddingRight: '3%',
              },
            }}
          >
            <IconButton
              size='large'
              aria-label='show 4 new mails'
              color='inherit'
              component={Link}
              to='/'
            >
              <HomeIcon />
            </IconButton>
            <IconButton
              size='large'
              aria-label='show 4 new mails'
              color='inherit'
              component={Link}
              to='/countries'
            >
              <ListIcon />
            </IconButton>
            <IconButton
              size='large'
              aria-label='show 17 new notifications'
              color='inherit'
              component={Link}
              to='/favorite'
            >
              <Badge badgeContent={favorite.length} color='error'>
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <IconButton
              size='large'
              aria-label='show 4 new mails'
              color='inherit'
              component={Link}
              to='/about'
            >
              <InfoIcon />
            </IconButton>
            <IconButton
              size='large'
              aria-label='show 4 new mails'
              color='inherit'
              onClick={() => handleDarkMode()}
            >
              <Brightness6Icon />
            </IconButton>
          </Box>
        </AppBar>
      </Box>
    </div>
  );
}
