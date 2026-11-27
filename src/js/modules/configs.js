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
  carousel: {
    allowTouchMove: false,
    autoplay: {
      delay: 3000,
    },
    loop: true,
    slidesPerView: 1.8,
    spaceBetween: 0,
    effect: "coverflow",
    centeredSlides: true,
    speed: 750,
    coverflowEffect: {
      rotate: 0,
      stretch: 20,
      depth: 500,
      slideShadows: false,
      modifier: 1,
    },
  },
  fade: {
    loop: true,
    effect: 'fade',
    autoplay: {
      delay: 5000,
    },
    speed: 2500,
    allowTouchMove: false,
    fadeEffect: {
      crossFade: true,
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
    errorLabelCssClass: 'error-message',
    errorLabelStyle: {
      color: 'var(--error-color)',
      fontSize: '12px',
    },
    errorFormClass: 'shaked',
    errorTimeout: 1500,
  },
  errorTimeout: 1500,
  mask: {
    bodyMask: ' (___) ___ __ __',
  },
  minLength: 10,
  maxLength: 200,
  messages: {
    required: 'Поле обязательно для заполнения',
    email: 'Некорректный адрес электронной почты',
    phone: ( mask ) => `Введите телефон в формате ${mask}`,
    minLength: 'Слишком короткое сообщение',
    maxLength: ( maxLenght )=>`Длина сообщения превышает ${maxLenght} символов`,
    confirm: 'Подтвердите согласие на обработку персональных данных',
  }
};

const observerConfig = {
  scrollTop: {
    rootMargin: '600px',
    threshold: 1,
  },
};

export {
  sliderConfig,
  smoothScrollConfig,
  modalConfig,
  validateConfig,
  observerConfig,
};
