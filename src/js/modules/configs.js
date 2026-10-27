const sliderConfig = {
  default: {
    slidesPerView: 1,
    spaceBetween: 20,
    watchSlidesProgress: true,
    speed: 600,
    navigation: {
      prevEl: '[data-to-slide="prev"]',
      nextEl: '[data-to-slide="next"]',
    }
  },
  banner: {
    spaceBetween: 0,
    rewind: true,
  },
  gallery: {
    slidesPerView: 1.2,
    spaceBetween: 2,
    rewind: true,
    breakpoints: {
      1024: {
        slidesPerView: 1.5,
      },
    },
  },
  galleryCentered: {
    slidesPerView: 1.1,
    spaceBetween: 2,
    centeredSlides: true,
    loop: true,
    breakpoints: {
      1024: {
        slidesPerView: 1.5,
      },
    },
  },
};

const smoothScrollConfig = {
  speed: 900,
  speedAsDuration: true,
  updateURL: false,
  lenis: {
    duration: 1.1,
    easing: ( x ) => x === 1 ? 1 : 1 - Math.pow( 2, -10 * x )
  }
};

const modalConfig = {
  linkAttributeName: false,
  catchFocus: true,
  closeOnEsc: true,
  backscroll: true,
};

const validateConfig = {
  justValidate: {
    errorFieldCssClass: 'is-invalid',
    errorLabelCssClass: 'error-massage',
    errorLabelStyle: {
      color: 'var(--error)',
      fontSize: '12px',
    },
    errorFormClass: 'shaked',
    errorTimeout: 1500,
  },
  errorTimeout: 1500,
  mask: {
    bodyMask: ' (___) ___ __ __',
  }
};

const observerConfig = {
  scrollTop: {
    rootMargin: '600px',
    threshold: 1,
  },
  headerBanner: {
    rootMargin: '0px',
    threshold: 0,
  },
};

export {
  sliderConfig,
  smoothScrollConfig,
  modalConfig,
  validateConfig,
  observerConfig,
};
