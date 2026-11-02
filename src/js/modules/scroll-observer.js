import {
  observerConfig,
} from './configs.js';

const initItemObserver = ( targetNode, observeNode, isTrueFn, isFalseFn, config ) => {
  if ( !targetNode || !observeNode ) return;
  const callback = ( entries ) => {
    entries.forEach( ( entry ) => {
      ( !entry.isIntersecting ) ? isTrueFn( targetNode, observeNode ) : isFalseFn( targetNode, observeNode );
    } );
  };
  new IntersectionObserver( callback, config ).observe( observeNode );
};

const scrollTopEl = document.querySelector( '#scroll-top' );
const siteTopEl = document.querySelector( '#site-top' );
const headerBanner = document.querySelector('.site-header__banner');
const headerMain = document.querySelector('.site-header__main');

const fixHeader = () => {
  headerMain.classList.add('is-fixed');

}
const unfixHeader = () => {
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
  initItemObserver( headerMain, headerBanner, fixHeader, unfixHeader, observerConfig.headerBanner );
};
