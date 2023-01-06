import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// MUI
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function Home() {
  return (
    <div className='home'>
      <ImageList
        sx={{ width: 500, height: 450 }}
        variant='quilted'
        cols={4}
        rowHeight={121}
      >
        {itemData.map((item) => (
          <ImageListItem
            key={uuidv4()}
            cols={item.cols || 1}
            rows={item.rows || 1}
          >
            <img
              {...srcset(item.img, 121, item.rows, item.cols)}
              alt={item.title}
              loading='lazy'
            />
          </ImageListItem>
        ))}
      </ImageList>
      <div>
        {' '}
        <Link to='/countries' style={{ textDecoration: 'none' }}>
          <Button
            variant='text'
            color='success'
            sx={{
              color: 'black',
              fontFamily: 'nunito',
              fontSize: '15px',
              fontWeight: '600',
            }}
          >
            Let's explore the countries !
          </Button>
        </Link>
      </div>
    </div>
  );
}

const itemData = [
  {
    img: 'https://images.pexels.com/photos/4713691/pexels-photo-4713691.jpeg?cs=srgb&dl=pexels-nothing-ahead-4713691.jpg&fm=jpg',
    title: 'globe',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://thumbs.dreamstime.com/b/globe-sepia-focus-northern-europe-31376177.jpg',
    title: 'Burger',
  },
  {
    img: 'https://static5.depositphotos.com/1006009/414/i/950/depositphotos_4145270-stock-photo-florida-vintage-map.jpg',
    title: 'Camera',
  },
  {
    img: 'https://cdn1.photostockeditor.com/t/0512/closeup-photo-of-world-globe-document-travel.jpg',
    title: 'Coffee',
    cols: 2,
  },
  {
    img: 'https://thumbs.dreamstime.com/b/world-globe-rustic-wood-background-33222820.jpg',
    title: 'Hats',
    cols: 2,
  },
  {
    img: 'https://images.pexels.com/photos/4713691/pexels-photo-4713691.jpeg?cs=srgb&dl=pexels-nothing-ahead-4713691.jpg&fm=jpg',
    title: 'globe',
    author: '@google',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://thumbs.dreamstime.com/b/globe-sepia-focus-northern-europe-31376177.jpg',
    title: 'Basketball',
  },
  {
    img: 'https://static5.depositphotos.com/1006009/414/i/950/depositphotos_4145270-stock-photo-florida-vintage-map.jpg',
    title: 'Fern',
  },
];
