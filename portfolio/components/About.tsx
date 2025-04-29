import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.from(sectionRef.current.children, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    }
  }, []);

  // Updated text styles with more responsive font sizes and padding
  const textStyle = "text-[1.25rem] sm:text-[1.5rem] md:text-[2rem] lg:text-[2.75rem] xl:text-[3.25rem] leading-snug sm:leading-tight text-[#333333] transition-colors duration-300 hover:text-[#666666] sf-bold text-left";

  return (
    <section 
      id="about" 
      className="relative min-h-screen bg-[#111111] flex items-center justify-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-16 z-10"
    >
      <div 
        ref={sectionRef} 
        className="max-w-[90%] sm:max-w-[85%] md:max-w-4xl w-full flex justify-center"
      >
        {/* Text Content */}
        <div className="w-full max-w-full sm:max-w-2xl space-y-1 sm:space-y-2 cursor-pointer ">
          <p className={textStyle}>
            Over the years I have spent time converting designs into
          </p>
          <p className={textStyle}>
            real life,
          </p>
          <p className={textStyle}>
            real time,
          </p>
          <p className={textStyle}>
            accessible
          </p>
          <p className={textStyle}>
            and responsive websites.
          </p>
          <p className={textStyle}>
            I have always been excited about the entire development spectrum,
          </p>
          <p className={textStyle}>
            so I frequently engage in backend.
          </p>
          <p className={textStyle}>
            Well what can I say,
          </p>
          <p className={textStyle}>
            I sincerely simply love working on ambitious projects with positive people
          </p>
          <p className={textStyle}>
            in a conducive work environment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;