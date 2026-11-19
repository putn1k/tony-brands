import ScrollTrigger from 'gsap/ScrollTrigger.js';
import Swiper from 'swiper';
import {
  Navigation,
  Autoplay,
  EffectFade,
  EffectCoverflow,
} from 'swiper/modules';

import { sliderConfig } from './configs.js';
import { getRandomNumber } from "./utils.js";

const initSlider = ( name, options = {} ) => {
  const defaultConfig = Object.assign( {}, {
    modules: [ Navigation, Autoplay, EffectFade, EffectCoverflow ],
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
  document.querySelectorAll( '[ data-slider="fade" ]' ).forEach( slider => {
    initSlider( slider, sliderConfig.fade );
  } );
  ScrollTrigger.refresh();
};

export {
  initSliders,
};
