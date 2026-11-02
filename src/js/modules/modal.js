import HystModal from 'hystmodal';
import {
  modalConfig
} from './configs.js';

const initModal = ( name, handler = 'data-hystmodal', options = {} ) => {
  if ( !name ) return;

  const config = Object.assign( {}, modalConfig, {
    config: {
      linkAttributeName: handler
    }
  }, options );

  const modal = new HystModal( config );

  modal.config.linkAttributeName = handler;

  if ( window.hystmodal !== undefined ) {
    window.hystmodal[ name ] = modal;
  } else {
    window.hystmodal = {};
    window.hystmodal[ name ] = modal;
  }

  return modal;
};

const beforeOpenCallback = ( modal ) => {
  switch ( modal.openedWindow.id ) {
    default:
      return;
  }
};
const afterCloseCallback = ( modal ) => {
  switch ( modal.openedWindow.id ) {
    default:
      return;
  }
};
const initModals = () => {
  initModal( 'siteModal', 'data-hystmodal', {
    beforeOpen: beforeOpenCallback,
    afterClose: afterCloseCallback,
  } );
};

export {
  initModals,
};
