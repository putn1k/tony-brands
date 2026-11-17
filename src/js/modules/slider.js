import Swiper from 'swiper';
import {
  Navigation,
  Autoplay,
  EffectCoverflow,
} from 'swiper/modules';

import { sliderConfig } from './configs.js';
import { getRandomNumber } from "./utils.js";

const initSlider = ( name, options = {} ) => {
  const defaultConfig = Object.assign( {}, {
    modules: [ Navigation, Autoplay, EffectCoverflow ],
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
  document.querySelectorAll( '[ data-slider="carousel" ]' ).forEach( slider => {
    initSlider( slider, sliderConfig.carousel );
  } );
};

export {
  initSliders,
};
