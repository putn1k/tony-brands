export const initScrollDirectionObserver = () => {
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      document.documentElement.classList.add('scroll-down');
      document.documentElement.classList.remove('scroll-up');
    } else if (currentScrollY < lastScrollY) {
      document.documentElement.classList.add('scroll-up');
      document.documentElement.classList.remove('scroll-down');
    }

    lastScrollY = currentScrollY;
  });
};
