import {
  initSlider
} from './utils.js';

import {
  sliderConfig
} from './configs.js';


const initSliders = () => {
  document.querySelectorAll( '.slider' ).forEach( slider => {
    const slides = slider.querySelectorAll( '.swiper-slide' );
    const config = ( slides.length < 4 ) ? sliderConfig.gallery : sliderConfig.galleryCentered;
    initSlider( slider, config );
  } );
};

export {
  initSliders,
};
