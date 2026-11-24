const createBgEl = () => {
  const el = document.createElement('DIV');
  el.classList.add('story__bg');
  return el;
};

const createCoverEl = ( src ) => {
  if ( src && typeof( src ) === 'string' ) {
    const el = document.createElement('IMG');
    el.classList.add('story__cover');
    el.src = src;
    return el;
  }

  return null;
}

const createSvgEl = () => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('story__ring');
  svg.setAttribute('viewBox', '0 0 120 120');
  return svg;
};

const createSegments = ( story ) => {
  const segs = +story.dataset.segments;
  const read = (story.dataset.read && story.dataset.read != '') ? +story.dataset.read : 0;

  const C = 345.5;
  const gap = segs == 1 ? 0 : 8;
  const segPx = C / segs;
  const dash = segPx - gap;

  let paths = '';

  for (let i = 0; i < segs; i++) {
    const offset = segs == 1 ? 0 : -(i * segPx) - 2.5;
    const color = i < read ? 'var(--color-read)' : 'var(--color-unread)';


    paths += `<circle cx="60" cy="60" r="55" stroke="${color}" stroke-dasharray="${dash} ${C}" stroke-dashoffset="${offset}"></circle>`;
  }

  return paths;
};

const setupStory = ( story ) => {
  const bgEl = createBgEl();
  const coverEl = createCoverEl( story.dataset.cover );
  const svgEl = createSvgEl();

  if ( coverEl ) {
    bgEl.appendChild( coverEl );
  }

  story.appendChild(bgEl);
  story.appendChild(svgEl);

  svgEl.innerHTML = '';
  svgEl.innerHTML = createSegments( story );

  story.classList.add('is-inited');

  story.addEventListener('click', (evt) => {

  })
};

export const initStories = () => {
  document.querySelectorAll('.story').forEach( setupStory );
}

