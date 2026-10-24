import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger.js';
import { SplitText } from "gsap/SplitText.js";

gsap.registerPlugin( ScrollTrigger, SplitText );

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

    const speed = (marquee.dataset.marqueeSpeed && marquee.dataset.marqueeSpeed != '') ? parseInt( marquee.dataset.marqueeSpeed, 10 ) : 60;

    const init = () => {
      const groupWidth = group.offsetWidth;

      gsap.to(track, {
        xPercent: -50,
        duration: groupWidth / speed,
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

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        gsap.killTweensOf(track);
        gsap.set(track, { xPercent: 0 });
        init();
      }, 200);
    });
  });

};

export {
  initGSAPAnimation,
  ScrollTrigger,
};
