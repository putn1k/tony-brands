import ScrollTrigger from 'gsap/ScrollTrigger.js';
import Swiper from 'swiper';
import {
  Navigation,
  Autoplay,
  EffectFade,
  EffectCoverflow,
} from 'swiper/modules';

import { sliderConfig } from './configs.js';

const getStartDelay = (element) => {
  const delay = parseInt(element.getAttribute('data-start-delay'), 10);

  return Number.isFinite(delay) && delay > 0 ? delay : 0;
};

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
  const disabledFadeSliders = [];


  document.querySelectorAll( '[ data-slider="carousel" ]' ).forEach( slider => {
    initSlider( slider, sliderConfig.carousel );
  } );

  document.querySelectorAll( '[ data-slider="fade" ]' ).forEach( slider => {

    const swiper = initSlider(slider, {
      ...sliderConfig.fade,
      autoplay: {
        disableOnInteraction: false,
      },
    });

    if ( swiper ) {
      swiper.autoplay.stop();
      disabledFadeSliders.push(swiper);
    }
  } );

  disabledFadeSliders.forEach( ( swiper ) => {
    const delay = getStartDelay( swiper.el );

    if (delay === 0) {
      swiper.autoplay.start();
      return;
    }

    setTimeout(() => {
      swiper.autoplay.start();
    }, delay );
  });
  ScrollTrigger.refresh();
};

export {
  initSliders,
};
