import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger.js';
import { SplitText } from "gsap/SplitText.js";

gsap.registerPlugin( ScrollTrigger );
gsap.registerPlugin( SplitText );

const initGSAPAnimation = () => {
  document.querySelectorAll( '[data-anim]' ).forEach( ( element ) => {
    const delayAnim = element.dataset.animDelay ? ( parseInt( element.dataset.animDelay, 10 ) / 1000 ) : '0.2';
    const durationAnim = element.dataset.animDuration ? ( parseInt( element.dataset.animDuration, 10 ) / 1000 ) : '0.6';
    const trigger = element.dataset.animTrigger ? element.closest( element.dataset.animTrigger ) : element;

    const animConfig = {
      delay: delayAnim,
      duration: durationAnim,
      scrollTrigger: {
        trigger: trigger,
        start: 'top +=95%',
        end: 'center +=65%',
        scrub: element.hasAttribute( 'data-anim-scrub' )
      },
    };
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

  document.querySelectorAll('[data-split]').forEach( element => {

    SplitText.create(element, {
      type: "lines",
      mask: "lines",
      autoSplit: true,

      onSplit(self) {
        return gsap.from(self.lines, {
          yPercent: 100,
          duration: 1.4,
          stagger: 0.15,
          ease: "power3.out",
          onComplete: () => {
            element.classList.add("is-complete");
          },
        });
      },
    });
  })
};

export {
  initGSAPAnimation,
  ScrollTrigger,
};
