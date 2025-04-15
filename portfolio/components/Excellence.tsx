import React, { useEffect, useRef, JSX } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Excellence = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current || !textContainerRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(textContainerRef.current, {
        x: '100vw'
      });

      gsap.set(textRef.current, {
        opacity: 0
      });

      // Create responsive scroll-triggered animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          pin: containerRef.current,
          scrub: 1,
          invalidateOnRefresh: true // Handle resize events better
        }
      });

      // Responsive animations
      tl.to(textContainerRef.current, {
        x: 0,
        duration: 0.4,
        ease: "power1.inOut"
      });

      tl.to(textRef.current, {
        opacity: 1,
        duration: 0.3
      }, 0.2);

      // Responsive scaling based on viewport width
      tl.to(textContainerRef.current, {
        scale: window.innerWidth < 768 ? 1.1 : 1.2, // Smaller scale for mobile
        duration: 0.4
      }, ">-0.2");
    });

    // Cleanup
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-[200vh] sm:h-[250vh] md:h-[300vh] relative" // Responsive height
    >
      <div 
        ref={containerRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-[#111111] flex items-center justify-center px-4 sm:px-6 md:px-8" // Added responsive padding
      >
        <div 
          ref={textContainerRef}
          className="relative transition-transform will-change-transform"
        >
          <div 
            ref={textRef}
            className="relative"
          >
            <div 
              className="text-[3rem] sm:text-[5rem] md:text-[8rem] lg:text-[12rem] xl:text-[16rem] font-bold tracking-tighter sf-bold leading-none whitespace-nowrap excellence-text" // Responsive text sizes and prevent wrapping
            >
              EXCELLENCE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Excellence;