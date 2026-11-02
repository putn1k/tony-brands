import Swiper from 'swiper';
import {
  Navigation,
  Autoplay,
} from 'swiper/modules';

import {
  sliderConfig
} from './configs.js';

const initSlider = ( name, options = {} ) => {
  const defaultConfig = Object.assign( {}, {
    modules: [ Navigation, Autoplay, ],
  }, sliderConfig.default );
  const customConfig = Object.assign( defaultConfig, options );

  if ( typeof name === 'string' ) {
    const sliderElement = document.querySelector( name );

    if ( !sliderElement ) return;
    return new Swiper( sliderElement, customConfig );
  }

  return new Swiper( name, customConfig );
};

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
