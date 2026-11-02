import JustValidate from 'just-validate';
import JustPhoneMask from 'just-phone-mask';

import {
  validateConfig,
} from './configs.js';

import {
  formDataToJson,
  disableSubmitBtn,
  enableSubmitBtn,
} from './utils.js';

const justValidateConfig = validateConfig.justValidate;

const isSendOk = () => {
  window.hystmodal.siteModal.open( '#send-ok-modal' );
};

const isSendError = ( target ) => {
  target.classList.add( justValidateConfig.errorFormClass );
  setTimeout( () => {
    target.classList.remove( justValidateConfig.errorFormClass );
  }, validateConfig.errorTimeout );
};

const getRule = ( rule, message, value = true ) => {
  let config = {};

  config.rule = rule;
  config.errorMessage = message;

  if ( value ) {
    config.value = value;
  }

  return config;
};

const sendData = ( evt, url, isSendJSON = false, isOk, isError ) => {
  const errorNode = evt.target;
  const data = new FormData( evt.target );
  const params = {
    method: 'POST',
  };

  if ( isSendJSON ) {
    Object.assign( params, {
      headers: {
        'content-type': 'application/json'
      },
      body: formDataToJson( data ),
    } );
  } else {
    Object.assign( params, {
      body: data,
    } );
  }


  disableSubmitBtn( evt.target );
  fetch( url, params )
    .then( ( data ) => {
      if ( data.ok ) {
        isOk( evt.target );
        evt.target.reset();
      } else {
        isError( errorNode );
      }
    } )
    .catch( () => {
      isError( errorNode );
    } )
    .finally( () => {
      enableSubmitBtn( evt.target );
    } );
};

export const validateForms = () => {
  const forms = document.querySelectorAll( 'form[data-validate]' );

  if ( forms.length < 1 ) return;

  forms.forEach( ( form ) => {
    const formID = `#${form.id}`;
    const validationRules = new JustValidate( formID, justValidateConfig );
    const requiredFields = document.querySelectorAll( `${formID} [required]` );
    new JustPhoneMask( validateConfig.mask );

    requiredFields.forEach( ( input ) => {
      switch ( input.dataset.validate ) {
        case 'email':
          validationRules.addField( `${formID} [data-validate="email"]`, [
            getRule('required', validateConfig.messages.required ),
            getRule('email', validateConfig.messages.email, null ),
          ] );
          break;
        case 'phone':
          const mask = document.querySelector( `${formID} [data-validate="phone"]` ).dataset.mask;
          const lengthNumber = mask.length;
          validationRules.addField( `${formID} [data-validate="phone"]`, [
            getRule('required', validateConfig.messages.required ),
            getRule('minLength', validateConfig.messages.phone( mask ), lengthNumber),
          ] );
          break;
        case 'message':
          validationRules.addField( `${formID} [data-validate="message"]`, [
            getRule('required', validateConfig.messages.required ),
            getRule('minLength', validateConfig.messages.minLength, validateConfig.minLength ),
            getRule('maxLength', validateConfig.messages.maxLength( validateConfig.maxLength ), validateConfig.maxLength ),
          ] );
          break;
        case 'confirm':
          validationRules.addField( `${formID} [data-validate="confirm"]`, [
            getRule('required', validateConfig.messages.confirm ),
          ] );
          break;
        default:
          validationRules.addField( `${formID} [data-validate="${input.dataset.validate}"]`, [
            getRule('required', validateConfig.messages.required ),
          ] );
          break;
      }
    } );
    validationRules.onSuccess( ( evt ) => {
      sendData( evt, evt.target.action, false, isSendOk, isSendError );
    } );
  } );
};
