import React from 'react';

import { Carousel } from 'antd';

const contentStyle = {};

function Slider({ films }) {
  return (
    <>
      <Carousel>
        {films.map((film) => (
          <div key={film._id}>
            <h3
              style={{
                height: '450px',
                color: '#fff',
                lineHeight: '450px',
                textAlign: 'center',
                background: `#ffffff url("${film.banner}") no-repeat right top`,
              }}
            ></h3>
          </div>
        ))}
      </Carousel>
    </>
  );
}

export default Slider;
