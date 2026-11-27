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

export const initScrollObserver = () => {};
