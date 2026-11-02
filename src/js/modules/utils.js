const debounce = ( cb, delay ) => {
  let timer;
  return function( ...args ) {
    clearTimeout( timer );
    timer = setTimeout( () => {
      cb.apply( this, args );
    }, delay );
  };
};

const iosChecker = () => {
  return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes( navigator.platform )
    // iPad on iOS 13 detection
    ||
    ( navigator.userAgent.includes( 'Mac' ) && 'ontouchend' in document );
};

const iosVhFix = () => {
  if ( !( !!window.MSInputMethodContext && !!document.documentMode ) ) {
    if ( iosChecker() ) {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty( '--vh', `${vh}px` );

      window.addEventListener( 'resize', function() {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty( '--vh', `${vh}px` );
      } );
    }
  }
};

const isEscKey = ( evt ) => evt.key === 'Escape';

const disableSubmitBtn = ( form ) => {
  if ( !form.querySelector( '[type="submit"]' ) ) return;
  form.querySelector( '[type="submit"]' ).setAttribute( 'disabled', 'disabled' );
};

const enableSubmitBtn = ( form ) => {
  if ( !form.querySelector( '[type="submit"]' ) ) return;
  form.querySelector( '[type="submit"]' ).removeAttribute( 'disabled' );
};

const formDataToJson = ( formData ) => {
  const object = {};
  formData.forEach( ( value, key ) => {
    if ( !Object.prototype.hasOwnProperty.call( object, key ) ) {
      object[ key ] = value;
    } else {
      if ( !Array.isArray( object[ key ] ) ) {
        object[ key ] = [ object[ key ] ];
      }
      object[ key ].push( value );
    }
  } );
  return JSON.stringify( object );
};

const setOffsetRight = () => {
  const offset = window.innerWidth - document.documentElement.offsetWidth;
  document.documentElement.style.setProperty('--offset-right', `${offset}px`);
  document.documentElement.style.marginRight = `${offset}px`;
};

const resetOffsetRight = () => {
  const offset = 0;
  document.documentElement.style.setProperty('--offset-right', `${offset}`);
  document.documentElement.style.marginRight = `${offset}`;
};

const stopScroll = ( lenis ) => {
  lenis.stop();
  setOffsetRight();
  document.documentElement.style.overflow = 'hidden';
  document.body.style.position = 'relative';
  document.body.style.height = '100%';
};

const startScroll = ( lenis ) => {
  lenis.start();
  resetOffsetRight();
  document.documentElement.style.overflow = '';
  document.body.style.position = '';
  document.body.style.height = '';
};

export {
  debounce,
  iosVhFix,
  isEscKey,
  stopScroll,
  startScroll,
  formDataToJson,
  disableSubmitBtn,
  enableSubmitBtn,
};
