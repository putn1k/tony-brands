import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger.js';
import { SplitText } from "gsap/SplitText.js";

gsap.registerPlugin( ScrollTrigger, SplitText );

const gsapMatchMedia = gsap.matchMedia();

const initGSAPAnimation = () => {
  // scroll animation
  document.querySelectorAll( '[data-anim]' ).forEach( ( element ) => {
    const delay = element.dataset.animDelay ? ( parseInt( element.dataset.animDelay, 10 ) / 1000 ) : '0.2';
    const duration = element.dataset.animDuration ? ( parseInt( element.dataset.animDuration, 10 ) / 1000 ) : '0.6';
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
  document.querySelectorAll('.gsap-marquee').forEach((marquee) => {
    const track = marquee.querySelector('.gsap-marquee__track');
    const group = marquee.querySelector('.gsap-marquee__group');

    const clone = group.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);

    const baseSpeed = (marquee.dataset.marqueeSpeed && marquee.dataset.marqueeSpeed != '') ? parseInt( marquee.dataset.marqueeSpeed, 10 ) : 60;

    if (marquee.classList.contains('is-boosted-marquee')) {
      const maxBoost = 100;
      const returnDelay = 0.7;

      let groupWidth = 0;
      let x = 0;
      let direction = -1;
      let currentSpeed = baseSpeed;
      let returnTween;
      let resizeTimer;

      function measure() {
        groupWidth = group.offsetWidth;

        if (groupWidth) {
          x = gsap.utils.wrap(-groupWidth, 0, x);
          gsap.set(track, { x: x });
        }
      }

      measure();

      window.addEventListener('load', measure);

      gsap.ticker.add((time, deltaTime) => {
        if (!groupWidth) return;

        x += direction * currentSpeed * (deltaTime / 1000);

        x = gsap.utils.wrap(-groupWidth, 0, x);

        gsap.set(track, { x: x });
      });

      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const velocity = self.getVelocity();

          if (Math.abs(velocity) < 5) return;

          direction = velocity > 0 ? -1 : 1;

          const boost = gsap.utils.clamp( 1, maxBoost, 1 + Math.abs(velocity) / 100 );

          currentSpeed = baseSpeed * boost;

          if (returnTween) returnTween.kill();

          returnTween = gsap.delayedCall(returnDelay, () => {
            currentSpeed = baseSpeed;
          });
        }
      });

      const observer = new ResizeObserver(() => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(measure, 200);
      });

      observer.observe(document.documentElement);
    } else {
      let resizeTimer;

      const init = () => {
        const groupWidth = group.offsetWidth;
        gsap.to(track, {
          xPercent: -50,
          duration: groupWidth / baseSpeed,
          ease: 'none',
          repeat: -1,
          overwrite: true
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

      Promise.all(loaded).then(init);

      const observer = new ResizeObserver(() => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          gsap.killTweensOf(track);
          gsap.set(track, { xPercent: 0 });
          init();
        }, 200);
      });

      observer.observe(marquee);
    }

  });

  (function () {
    const cards = document.querySelector('.about-production__cards');
    const track = document.querySelector('.about-production__cards-track');
    let trackOffsetRight = 15;

    if (!cards || !track) return;

    gsapMatchMedia.add( '(min-width: 1300px)', () => {
      trackOffsetRight = 64;
    } );

    const getScrollDistance = () => {
      const overflow = track.scrollWidth - cards.clientWidth;
      return overflow > 0 ? overflow : 0;
    };

    gsap.to(track, {
      x: () => -getScrollDistance() - trackOffsetRight,
      ease: 'none',
      scrollTrigger: {
        trigger: document.querySelector('.about-production'),
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
  initGSAPAnimation,
  ScrollTrigger,
};
