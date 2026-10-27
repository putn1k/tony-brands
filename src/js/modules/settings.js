import baguetteBox from 'baguettebox.js';
import SmoothScroll from 'smooth-scroll';
import AcceptCookiePopup from 'accept-cookie-popup';
import Lenis from 'lenis';
import {
  smoothScrollConfig
} from './configs.js';
import {
  iosVhFix,
} from './utils.js';
import {
  initScrollObserver,
} from './scroll-observer.js';
import {
  initModals
} from './modal.js';
import {
  initGSAPAnimation
} from './gsap.js';
import { initFilters } from './filter-list.js';


const lenisScroll = new Lenis( smoothScrollConfig.lenis );

const initSiteSettings = () => {

  function reloadScroll( time ) {
    lenisScroll.raf( time );
    requestAnimationFrame( reloadScroll );
  }

  iosVhFix();
  initScrollObserver();
  initModals();
  new SmoothScroll( 'a[href*="#"]', smoothScrollConfig );
  new AcceptCookiePopup();
  [ '[data-gallery]' ].map( ( item ) => baguetteBox.run( item ) );
  initGSAPAnimation();
  requestAnimationFrame( reloadScroll );
  initFilters();
};

export {
  lenisScroll,
  initSiteSettings,
};
