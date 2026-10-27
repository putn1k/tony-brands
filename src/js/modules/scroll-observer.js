import {
  observerConfig,
} from './configs.js';
import { initItemObserver } from './utils.js';

const scrollTopEl = document.querySelector( '#scroll-top' );
const siteTopEl = document.querySelector( '#site-top' );
const headerBanner = document.querySelector('.site-header__banner');
const headerMain = document.querySelector('.site-header__main');

const tr = () => {
  headerMain.classList.add('is-fixed');

}
const fs = () => {
  headerMain.classList.remove('is-fixed');
}

const showScrolTop = () => {
  scrollTopEl.classList.add( 'scroll-top--show' );
};

const hideScrolTop = () => {
  scrollTopEl.classList.remove( 'scroll-top--show' );
};

export const initScrollObserver = () => {
  initItemObserver( scrollTopEl, siteTopEl, showScrolTop, hideScrolTop, observerConfig.scrollTop );
  initItemObserver( headerMain, headerBanner, tr, fs, observerConfig.headerBanner );
};
