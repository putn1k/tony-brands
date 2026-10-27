import ScrollTrigger from 'gsap/ScrollTrigger.js';

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
  const list = document.querySelector( `[data-filter-list="${filterName}"]` );
  if ( ID === 'all' ) {
    Array.from( list.children ).map( item => item.classList.remove( 'is-hide' ) );
    ScrollTrigger.refresh();
  } else {
    Array.from( list.children ).filter( item => {
      item.dataset.filterItem === ID ? item.classList.remove( 'is-hide' ) : item.classList.add( 'is-hide' );
      ScrollTrigger.refresh();
    } );
  }
};

export const initFilters = () => {
  document.querySelectorAll( '[data-filters]' ).forEach( setupFilter );
};