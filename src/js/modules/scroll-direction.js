export const initScrollDirectionObserver = () => {
  let lastScrollY = window.scrollY;

  const getScrollTop = () => window.scrollY || document.documentElement.scrollTop || 0;

  const getMaxScrollTop = () => document.documentElement.scrollHeight - window.innerHeight;

  window.addEventListener('scroll', () => {
    const currentScrollY = getScrollTop();
    const maxScrollTop = getMaxScrollTop();

    const atTop = currentScrollY <= 0;
    const atBottom = currentScrollY >= maxScrollTop;

    if (!atTop && !atBottom) {
      if (currentScrollY > lastScrollY) {
        document.documentElement.classList.add('scroll-down');
        document.documentElement.classList.remove('scroll-up');
      } else if (currentScrollY < lastScrollY) {
        document.documentElement.classList.add('scroll-up');
        document.documentElement.classList.remove('scroll-down');
      }
    }

    lastScrollY = currentScrollY;
  }, { passive: true });
};
