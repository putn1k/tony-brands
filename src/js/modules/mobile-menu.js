import gsap from 'gsap';
import { lenisScroll } from "./settings.js";
import { startScroll, stopScroll } from "./utils.js";

const menuTriggerEl = document.querySelector('#mobile-menu-btn');
const menuEl = document.querySelector('.mobile-menu');

const showByStepItems = ( itemNodes, currentDelay = 0.3, stepTime = 0.1 ) => {
  itemNodes.forEach( ( item ) => {
    gsap.fromTo( item, {
      xPercent: 70,
      opacity: 0
    }, {
      delay: currentDelay,
      xPercent: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'expo.out',
    } );
    currentDelay = currentDelay + stepTime;
  } );
};

const openMenu = ( burger ) => {
  burger.classList.add('is-open');
  burger.disabled = true;
  stopScroll( lenisScroll );
  if (!menuEl) return;
  menuEl.classList.remove( 'mobile-menu--standby-default' );
  gsap.fromTo( menuEl, {
      xPercent: 100
    }, {
      xPercent: 0,
      duration: 0.4,
      onComplete: () => burger.disabled = false
    } );
  showByStepItems( menuEl.querySelectorAll( '.mobile-menu__nav>ul>li' ) );
  showByStepItems( menuEl.querySelectorAll( '.mobile-menu__action>button' ) );
};

const closeMenu = ( burger ) => {
  burger.classList.remove('is-open');
  if (!menuEl) return;
  burger.disabled = true;
    gsap.fromTo( menuEl, {
      xPercent: 0
    }, {
      xPercent: -100,
      duration: 0.25,
      onComplete: onCloseClick
    } );
};

const onCloseClick = () => {
  menuTriggerEl.disabled = false;
  menuEl.classList.add( 'mobile-menu--standby-default' );
  startScroll( lenisScroll );
};

const onBurgerClick = ( evt ) => {
  evt.preventDefault();

  ( evt.currentTarget.classList.contains('is-open') ) ? closeMenu( evt.currentTarget ) : openMenu( evt.currentTarget );
};

export const initMobileMenu = () => {
  if (!menuTriggerEl) return;

  menuTriggerEl.addEventListener('click', onBurgerClick);
};
