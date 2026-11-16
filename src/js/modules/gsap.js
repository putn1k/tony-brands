import gsap from 'gsap';
import { _horizontal } from 'gsap/Observer.js';
import ScrollTrigger from 'gsap/ScrollTrigger.js';
import { SplitText } from "gsap/SplitText.js";

gsap.registerPlugin( ScrollTrigger, SplitText );

const gsapMatchMedia = gsap.matchMedia();

const initGSAPAnimation = () => {
  // scroll animation
  document.querySelectorAll( '[data-anim]' ).forEach( ( element ) => {
    const delay = element.dataset.animDelay ? ( parseInt( element.dataset.animDelay, 10 ) / 1000 ) : '0.2';
    const duration = element.dataset.animDuration ? ( parseInt( element.dataset.animDuration, 10 ) / 1000 ) : '1.2';
    const trigger = element.dataset.animTrigger ? element.closest( element.dataset.animTrigger ) : element;

    const animConfig = {
      delay: delay,
      duration: duration,
      scrollTrigger: {
        trigger: trigger,
        start: 'top +=95%',
        end: 'center +=65%',
        scrub: element.hasAttribute( 'data-anim-scrub' )
      },
    };

    if (element.hasAttribute('data-loading')) {
      const maxLoadVal = element.dataset.loading !== '' ? Number(element.dataset.loading) : 100;

      animConfig.onStart = function () {
        element.style.setProperty('--loading-progress', '0%');
      };

      animConfig.onUpdate = function () {
        const progress = Math.min(Math.round(this.progress() * 100), maxLoadVal);
        element.style.setProperty('--loading-progress', progress + '%');
      };

      animConfig.onComplete = function () {
        element.style.setProperty('--loading-progress', maxLoadVal + '%');
      };
    }
    let isAnim;
    switch ( element.dataset.anim ) {
      case 'slide-left':
        isAnim = true;
        animConfig.xPercent = '50';
        break;
      case 'slide-right':
        isAnim = true;
        animConfig.xPercent = '-50';
        break;
      case 'slide-up':
        isAnim = true;
        animConfig.y = '100';
        break;
      case 'slide-down':
        isAnim = true;
        animConfig.y = '-100';
        break;
      case 'fade-left':
        isAnim = true;
        animConfig.xPercent = '50';
        animConfig.opacity = '0';
        break;
      case 'fade-right':
        isAnim = true;
        animConfig.xPercent = '-50';
        animConfig.opacity = '0';
        break;
      case 'fade-up':
        isAnim = true;
        animConfig.y = '100';
        animConfig.opacity = '0';
        break;
      case 'fade-down':
        isAnim = true;
        animConfig.y = '-100';
        animConfig.opacity = '0';
        break;
      case 'fade':
        isAnim = true;
        animConfig.opacity = '0';
        break;
      default:
        isAnim = false;
        break;
    }

    if ( isAnim ) {
      gsap.from( element, animConfig );
    }
  } );

  // split animation
  document.querySelectorAll('[data-split]').forEach( element => {
    const duration = element.dataset.animDuration ? ( parseInt( element.dataset.animDuration, 10 ) / 1000 ) : '2.5';

    SplitText.create(element, {
      type: "lines",
      mask: "lines",
      autoSplit: true,

      onSplit(self) {
        return gsap.from(self.lines, {
          yPercent: 120,
          duration: duration,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      },
    });
  });

  // marquee animation
  const createMarquee = (marquee) => {
    const track = marquee.querySelector('.gsap-marquee__track');
    const group = marquee.querySelector('.gsap-marquee__group');

    if (!track || !group) {
      console.warn('Marquee: track or group not found', marquee);
      return { init: () => {}, destroy: () => {} };
    }

    let initialized = false;
    let clone = null;
    let cleanupFns = [];
    let tickerFn = null;
    let returnTween = null;
    let resizeTimer = null;
    let observer = null;

    const addCleanup = (fn) => cleanupFns.push(fn);

    const createClone = () => {
      if (clone) return;
      clone = group.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    };

    const removeClone = () => {
      if (clone && clone.parentNode) clone.parentNode.removeChild(clone);
      clone = null;
    };

    const baseSpeed =
      marquee.dataset.marqueeSpeed && marquee.dataset.marqueeSpeed !== ''
        ? parseInt(marquee.dataset.marqueeSpeed, 10)
        : 60;

    const initBoosted = () => {
      const maxBoost =
        marquee.dataset.marqueeBoost && marquee.dataset.marqueeBoost !== ''
          ? parseFloat(marquee.dataset.marqueeBoost) * 100
          : 100;
      const returnDelay = 0.1;

      let groupWidth = 0;
      let x = 0;
      let direction = -1;
      let currentSpeed = baseSpeed;
      let lastScrollY = window.scrollY;
      let lastScrollTime = performance.now();

      const measure = () => {
        groupWidth = group.offsetWidth;
        if (groupWidth) {
          x = gsap.utils.wrap(-groupWidth, 0, x);
          gsap.set(track, { x });
        }
      };

      measure();

      tickerFn = (time, deltaTime) => {
        if (!groupWidth) return;
        x += direction * currentSpeed * (deltaTime / 1000);
        x = gsap.utils.wrap(-groupWidth, 0, x);
        gsap.set(track, { x });
      };
      gsap.ticker.add(tickerFn);
      addCleanup(() => gsap.ticker.remove(tickerFn));

      const scrollBoost = () => {
        const now = performance.now();
        const scrollY = window.scrollY;
        const deltaY = scrollY - lastScrollY;
        const deltaTime = now - lastScrollTime;

        if (deltaTime > 0 && Math.abs(deltaY) > 0) {
          const velocity = (deltaY / deltaTime) * 10 * maxBoost;
          direction = velocity > 0 ? -1 : 1;
          const boost = gsap.utils.clamp(1, maxBoost, 1 + Math.abs(velocity) / 100);
          currentSpeed = baseSpeed * boost;
          if (returnTween) returnTween.kill();
          returnTween = gsap.delayedCall(returnDelay, () => {
            currentSpeed = baseSpeed;
          });
        }

        lastScrollY = scrollY;
        lastScrollTime = now;
      };

      window.addEventListener('scroll', scrollBoost, { passive: true });
      addCleanup(() => window.removeEventListener('scroll', scrollBoost));

      const onLoad = () => measure();
      window.addEventListener('load', onLoad);
      addCleanup(() => window.removeEventListener('load', onLoad));

      observer = new ResizeObserver(() => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(measure, 200);
      });
      observer.observe(group);
      addCleanup(() => observer.disconnect());

      addCleanup(() => {
        if (returnTween) {
          returnTween.kill();
          returnTween = null;
        }
      });
    };

    const initDefault = () => {
      let killed = false;

      const run = () => {
        if (killed) return;
        const groupWidth = group.offsetWidth;
        if (!groupWidth) return;
        gsap.to(track, {
          xPercent: -50,
          duration: groupWidth / baseSpeed,
          ease: 'none',
          repeat: -1,
          overwrite: true,
        });
      };

      const images = marquee.querySelectorAll('img');
      const loaded = Array.from(images).map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              img.addEventListener('load', resolve, { once: true });
              img.addEventListener('error', resolve, { once: true });
            })
      );

      Promise.all(loaded).then(run);

      observer = new ResizeObserver(() => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          if (killed) return;
          gsap.killTweensOf(track);
          gsap.set(track, { xPercent: 0 });
          run();
        }, 200);
      });
      observer.observe(marquee);

      addCleanup(() => {
        killed = true;
        if (observer) observer.disconnect();
        clearTimeout(resizeTimer);
        gsap.killTweensOf(track);
        gsap.set(track, { xPercent: 0 });
      });
    };

    const destroy = () => {
      if (!initialized) return;

      cleanupFns.forEach((fn) => fn());
      cleanupFns = [];

      gsap.killTweensOf(track);
      gsap.set(track, { x: 0, xPercent: 0 });

      removeClone();

      clearTimeout(resizeTimer);
      resizeTimer = null;
      tickerFn = null;
      observer = null;

      initialized = false;
    };

    const init = () => {
      if (initialized) return;
      createClone();

      if (marquee.classList.contains('is-boosted-marquee')) {
        initBoosted();
      } else {
        initDefault();
      }
      initialized = true;
    };

    return { init, destroy };
  };

  const marqueeRegistry = new WeakMap();

  const getMarqueeInstance = (el) => {
    if (!marqueeRegistry.has(el)) {
      marqueeRegistry.set(el, createMarquee(el));
    }
    return marqueeRegistry.get(el);
  };

  document.querySelectorAll('.gsap-marquee').forEach((marquee) => {
    const instance = getMarqueeInstance(marquee);

    const startAttr = marquee.dataset.marqueeStart;
    const stopAttr = marquee.dataset.marqueeStop;

    if (stopAttr) {
      const stopPx = parseInt(stopAttr, 10);
      if (!Number.isFinite(stopPx)) return;

      gsapMatchMedia.add(`(max-width: ${stopPx - 1}px)`, () => {
        instance.init();
        return () => instance.destroy();
      });
      return;
    }

    if (startAttr) {
      const startPx = parseInt(startAttr, 10);
      if (!Number.isFinite(startPx)) return;

      gsapMatchMedia.add(`(max-width: ${startPx}px)`, () => {
        instance.init();
        return () => instance.destroy();
      });
      return;
    }

    instance.init();
  });


  // custom horizontal scroll
  (function () {
    const block = document.querySelector('.main-production');
    if ( !block ) return;
    const cards = block.querySelector('.main-production__cards');
    const track = block.querySelector('.main-production__cards-track');

    if ( !cards || !track) return;

    const getScrollDistance = () => {
      const overflow = track.scrollWidth - cards.clientWidth;
      return overflow > 0 ? overflow : 0;
    };

    gsap.to(track, {
      x: () => -getScrollDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: block,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        start: 'center center',
        end: () => '+=' + getScrollDistance(),
        pinSpacing: true,
      },
    });
  })();
};

export {
  gsapMatchMedia,
  initGSAPAnimation,
  ScrollTrigger,
};
