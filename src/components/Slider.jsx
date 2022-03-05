import { Link } from 'react-router-dom';

import { Carousel } from 'antd';

const contentStyle = {};

function Slider({ films }) {
  return (
    <>
      {/* <div className='container'></div> */}
      <Carousel>
        {films.map((film) => (
          <Link to={`/films/${film._id}`} key={film._id}>
            <div className='sliderBlock'>
              <h3
                style={{
                  height: '600px',
                  color: '#0f7fff',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  // lineHeight: '600px',
                  textAlign: 'center',
                  background: `url("${film.banner}") no-repeat center ${
                    film._id === '6221d4bbdc5713a4b7e790af' ? 'top' : 'center'
                  }`,
                  backgroundSize: 'cover',
                  position: 'relative',
                }}
              >
                <p className='titleTooltipSlider'>{film.titleEn}</p>
              </h3>
            </div>
          </Link>
        ))}
      </Carousel>
    </>
  );
}

export default Slider;
