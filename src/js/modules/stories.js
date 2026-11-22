const setupStory = ( story ) => {
  const segs = +story.dataset.segments;
  const read = +story.dataset.read;
  const coverSrc = story.dataset.cover;
  story.style.setProperty('--segments', segs);
  story.style.setProperty('--read-count', read);

  const C = 345.5;
  const gap = segs == 1 ? 0 : 12;
  const segPx = C / segs;
  const dash = segPx - gap;

  let paths = '';

  for (let i = 0; i < segs; i++) {
    const offset = -(i * segPx) - 2.5;
    const color = i < read ? 'var(--color-read)' : 'var(--color-unread)';

    paths += `<circle cx="60" cy="60" r="55" stroke="${color}" stroke-dasharray="${dash} ${C}" stroke-dashoffset="${offset}"></circle>`;
  }
  if ( coverSrc ) {
    story.innerHTML = `
    <div class="story__bg">
      <img class="story__cover" src="${coverSrc}" alt="">
    </div>
    <svg class="story__ring" viewBox="0 0 120 120">${paths}</svg>
  `;

  } else {
    story.innerHTML = `
    <div class="story__bg"></div>
    <svg class="story__ring" viewBox="0 0 120 120">${paths}</svg>
  `;
  }

  story.classList.add('is-inited');
};

export const initStories = () => {
  document.querySelectorAll('.story').forEach( setupStory );
}

