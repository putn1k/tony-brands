import {
  isEscKey
} from './utils.js';

const OPEN_CLASS_NAME = 'is-show';
const POPUP_SELECTOR = '[data-popup]';

const openPopup = () => {
  const widget = document.querySelector( window.openPopupSelector );

  if ( !widget ) return;

  widget.classList.add( OPEN_CLASS_NAME );

  document.addEventListener( 'click', onWidgetMissclick );
  document.addEventListener( 'keydown', onEscKeydown );
};

const closePopup = () => {
  const widget = document.querySelector( window.openPopupSelector );

  if ( !widget ) return;

  widget.classList.remove( OPEN_CLASS_NAME );
  window.openPopupSelector = null;

  document.removeEventListener( 'click', onWidgetMissclick );
  document.removeEventListener( 'keydown', onEscKeydown );
};

const onWidgetMissclick = ( evt ) => {
  const widget = document.querySelector( window.openPopupSelector );
  if ( !widget ) {
    closePopup();
    return;
  }

  const isClickOnClose = evt.target.closest( '[data-popup-close]' );
  if ( isClickOnClose ) {
    closePopup();
    return;
  }

  const isClickInsidePopup = evt.target.closest( window.openPopupSelector );
  const isClickOnStarter = evt.target.closest( POPUP_SELECTOR );
  if ( isClickInsidePopup || isClickOnStarter ) return;

  closePopup();
};

const onEscKeydown = ( evt ) => {
  if ( isEscKey( evt ) ) {
    closePopup();
  }
};

const onStarterClick = ( evt ) => {
  evt.preventDefault();

  const selector = evt.currentTarget.dataset.popup;
  if ( !selector || selector=="") return;

  window.openPopupSelector = selector;
  openPopup();
};

const setupPopup = ( popup ) => {
  popup.addEventListener( 'click', onStarterClick )
};

export const initPopups = () => {
  document.querySelectorAll( POPUP_SELECTOR ).forEach( setupPopup );
};
