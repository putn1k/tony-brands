import './modules/libsCss.js';
import 'focus-visible';
import {
  initSiteSettings
} from './modules/settings.js';
import { initMobileMenu } from './modules/mobile-menu.js';
import {
  initSliders
} from './modules/slider.js';
import {
  validateForms
} from './modules/validate.js';

document.addEventListener( 'DOMContentLoaded', () => {
  initSiteSettings();
  initMobileMenu();

  window.addEventListener( 'load', () => {
    validateForms();
    initSliders();
  } );
} );
