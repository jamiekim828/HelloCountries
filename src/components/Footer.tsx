import React from 'react';
import { Link } from 'react-router-dom';
// MUI
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Footer() {
  return (
    <div className='footer'>
      <div className='icon'>
        <FacebookIcon />
        <InstagramIcon sx={{ marginLeft: '22px', marginRight: '22px' }} />
        <TwitterIcon />
      </div>
      <div className='marketing-div'>
        <Link to='/' className='link'>
          Info
        </Link>
        <Link to='/' className='link'>
          Support
        </Link>
        <Link to='/' className='link'>
          Marketing
        </Link>
      </div>
      <div>Terms of Use . Privacy Policy</div>
      <div>@2023 Soo</div>
    </div>
  );
}
