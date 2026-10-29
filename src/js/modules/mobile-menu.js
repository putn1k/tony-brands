import gsap from 'gsap';
import { lenisScroll } from "./settings.js";
import { startScroll, stopScroll, isEscKey } from "./utils.js";

const menuOpenEl = document.querySelector('#burger-menu-btn');
const menuCloseEl = document.querySelector('#close-menu-btn');
const menuEl = document.querySelector('.burger-menu');
const menuWindowEl = document.querySelector('.burger-menu__window');

const onBurgerClick = () => {
  menuOpenEl.disabled = true;
  document.documentElement.classList.add('is-show-menu');
  stopScroll( lenisScroll );

  menuEl.classList.remove( 'is-standby-default' );
  gsap.fromTo( menuEl, {
      backgroundColor: 'transparent'
    }, {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      duration: 0.4,
    }
  );
  gsap.fromTo( menuWindowEl, {
      xPercent: -100
    }, {
      xPercent: 0,
      duration: 0.4,
    }
  );
};

const onCloseClick = () => {
  document.documentElement.classList.remove('is-show-menu');
  gsap.fromTo( menuEl, {
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  }, {
      backgroundColor: 'transparent',
      duration: 0.25,
    }
  );
  gsap.fromTo( menuWindowEl, {
    xPercent: 0
  }, {
    xPercent: -100,
    duration: 0.25,
    onComplete: onCloseComplete
  } );
};

const onCloseComplete = () => {
  menuEl.classList.add( 'is-standby-default' );
  startScroll( lenisScroll );
  menuOpenEl.disabled = false;
};

const onMenuClick = ( evt ) => {
  if ( !evt.target.classList.contains('burger-menu') ) return;
  onCloseClick();
};

export const initMobileMenu = () => {
  if (!menuOpenEl || !menuCloseEl || !menuEl) return;

  menuOpenEl.addEventListener('click', onBurgerClick);
  menuCloseEl.addEventListener('click', onCloseClick);
  menuEl.addEventListener('click', onMenuClick);

  document.addEventListener( 'keydown', ( evt ) => {
    if ( isEscKey( evt ) && document.documentElement.classList.contains( 'is-show-menu' ) ) {
      onCloseClick();
    }
  } );
};
