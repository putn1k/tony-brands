import ScrollTrigger from 'gsap/ScrollTrigger.js';
import { gsapMatchMedia } from './gsap.js';

const setupFilter = ( filter ) => {
  filter.addEventListener( 'click', ( evt ) => {
    evt.preventDefault();

    if ( evt.target && evt.target.hasAttribute( 'data-filter-item' ) ) {
      evt.currentTarget.querySelector( '.is-apply' ).classList.remove( 'is-apply' );
      evt.target.classList.add( 'is-apply' );
      filterList( evt.target.dataset.filterItem, evt.currentTarget.dataset.filters );
    }
  } );
};

const filterList = ( ID, filterName ) => {
  const lists = document.querySelectorAll( `[data-filter-list="${filterName}"]` ).forEach( (list) => {
    if ( ID === 'all' ) {
      Array.from( list.children ).map( item => item.classList.remove( 'is-hide' ) );
      ScrollTrigger.refresh();
    } else {
      Array.from( list.children ).filter( item => {
        item.dataset.filterItem === ID ? item.classList.remove( 'is-hide' ) : item.classList.add( 'is-hide' );
        ScrollTrigger.refresh();
      } );
    }
  });
};

const resetFilters = ( filtersName, defaultID = 'all' ) => {
  const list = document.querySelector(`[data-filters="${filtersName}"]`);

  if ( !list ) return;

  list.querySelectorAll('[data-filter-item]').forEach(item => item.classList.remove('is-apply'));
  const defaultTrigger = list.querySelector(`[data-filter-item="${defaultID}"]`);

  if( !defaultTrigger ) return;

  defaultTrigger.classList.add('is-apply');
  filterList( defaultID, filtersName );
};

export const initFilters = () => {
  document.querySelectorAll( '[data-filters]' ).forEach( setupFilter );
  gsapMatchMedia.add( '(max-width: 1299px)', () => {
    resetFilters('projects');
  } );
};
