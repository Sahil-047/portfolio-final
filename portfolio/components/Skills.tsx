import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const usedByRef = useRef<HTMLDivElement>(null);
  const myHandsRef = useRef<HTMLDivElement>(null);
  const andMindRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Define skill lists here
  const languages = [
    "HTML",
    "CSS",
    "SASS/SCSS",
    "Vanilla Javascript",
    "Typescript",
    "Solidity"
  ];

  const frameworks = [
    "React.js",
    "Node.js",
    "Jest",
    "GSAP",
    "Three.js",
    "React Query",
    "Next.js",
    "Express.js",
    "React Testing Library",
    "Web3",
    "Redux",
    "Tailwind CSS"
  ];

  useEffect(() => {
    if (!sectionRef.current || !imageContainerRef.current || !titleRef.current || !contentRef.current || 
        !usedByRef.current || !myHandsRef.current || !andMindRef.current) return;

    // Create GSAP context
    const ctx = gsap.context(() => {
      // Text animation when scrolling into the section
      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "top 20%", 
          scrub: 1,
        }
      });

      // Move "Used by" slightly to the right
      titleTl.to(usedByRef.current, {
        x: 100, // Move right
        duration: 1
      }, 0);

      // Move "my hands" to the left
      titleTl.to(myHandsRef.current, {
        x: -150, // Move more to the left
        duration: 1
      }, 0);

      // Move "and mind" with "Used by" (to the right)
      titleTl.to(andMindRef.current, {
        x: 100, // Same as "Used by"
        duration: 1
      }, 0);

      // Content sections fade in
      if (contentRef.current) {
        gsap.from(contentRef.current.querySelectorAll('section'), {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#111111]"
    >
      {/* Image Section */}
      <div 
        ref={imageContainerRef}
        className="absolute left-0 top-[5%] w-full md:w-1/3 h-full"
      >
        <Image
          src="/skills-image.jpg"
          alt="Developer workspace"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Title Section - Positioned at top right of image section */}
      <div 
        ref={titleRef}
        className="absolute top-[5%] left-[28%] z-10 md:left-[20%] lg:left-[15%]"
      >
        <h1 className="text-[3rem] md:text-[5rem] lg:text-[6rem] leading-[1.1] font-bold text-left">
          <div ref={usedByRef} className="text-gray-400/80 inline-block">Used by</div>
          <div ref={myHandsRef} className="text-white block">my hands</div>
          <div ref={andMindRef} className="text-gray-400/80 inline-block">and mind</div>
        </h1>
      </div>

      {/* Content Section - Right Side */}
      <div className="absolute right-0 top-[10%] w-full md:w-2/3 h-full flex items-center">
        <div 
          ref={contentRef}
          className="pl-4 md:pl-16 pr-4 md:pr-20 w-full"
        >
          {/* Grid layout for sections */}
          <div className="grid grid-cols-12 gap-x-4 md:gap-x-8 gap-y-8 pt-[10%]">
            {/* Languages Section - Top left */}
            <section className="col-span-12 md:col-span-5 pl-4 md:pl-[30%]">
              <h3 className="text-white text-xl md:text-2xl font-bold mb-4 uppercase">Languages</h3>
              <ul className="space-y-2">
                {languages.map((lang, index) => (
                  <li key={index} className="flex items-start text-lg md:text-xl">
                    <span className="text-gray-400 mr-2">•</span>
                    <span className="text-gray-400">{lang}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Frameworks Section - Top right */}
            <section className="col-span-12 md:col-span-7">
              <h3 className="text-white text-xl md:text-2xl font-bold mb-4 uppercase">Frameworks/ Libraries/ Others</h3>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10">
                {/* First column */}
                <div className="flex-1">
                  <ul className="space-y-2">
                    {frameworks.slice(0, 6).map((fw, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span className="text-gray-400">{fw}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Second column */}
                <div className="flex-1">
                  <ul className="space-y-2">
                    {frameworks.slice(6).map((fw, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span className="text-gray-400">{fw}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Special Section - Bottom area, positioned under Languages and aligned with Frameworks width */}
            <section className="col-span-12">
              <div className="grid grid-cols-12">
                <div className="col-span-12 md:col-span-5 pl-4 md:pl-[30%]">
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-4 uppercase">Special</h3>
                  <div className="mb-4 flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <span className="text-gray-400">Googling 😅</span>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-7">
                  <p className="text-gray-400 text-lg md:text-xl mt-4">
                    Developers need <span className="text-white">to learn everyday</span> so this list could get really long 😊.
                    <br />
                    See <span className="text-white cursor-pointer hover:underline">more frameworks/libraries here</span>.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 