import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navigation: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navRef.current) {
      // Set initial state to hidden
      gsap.set(navRef.current, { 
        scaleY: 0, 
        transformOrigin: 'top',
        height: '5rem'
      });

      // Create scroll-triggered animation for the initial reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#about",
          start: "top bottom",
          end: "top center",
          scrub: true,
        }
      });

      // First phase: reveal the nav bar
      tl.to(navRef.current, {
        scaleY: 1,
        duration: 1
      });

      // Second phase: grow the height to meet About section
      gsap.to(navRef.current, {
        height: window.innerHeight,
        ease: "none",
        scrollTrigger: {
          trigger: "#about",
          start: "top bottom",
          end: "top top",
          scrub: true,
          onUpdate: (self) => {
            // Calculate the distance to About section
            const aboutSection = document.querySelector("#about");
            if (aboutSection) {
              const aboutRect = aboutSection.getBoundingClientRect();
              const navHeight = Math.min(window.innerHeight, aboutRect.top);
              navRef.current!.style.height = `${Math.max(80, navHeight)}px`;
            }
          }
        }
      });
    }
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed w-full z-30 bg-[#111111]"
      style={{ transformOrigin: 'top' }}
    >
      <div ref={contentRef} className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-white font-bold text-xl"
          >
             
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 