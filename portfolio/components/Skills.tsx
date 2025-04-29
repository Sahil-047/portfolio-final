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

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Only apply animations on large screens (≥1024px)
      mm.add("(min-width: 1024px)", () => {
        const titleTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "top 20%", 
            scrub: 1,
          }
        });

        titleTl.to(usedByRef.current, { x: 100, duration: 1 }, 0)
              .to(myHandsRef.current, { x: -150, duration: 1 }, 0)
              .to(andMindRef.current, { x: 100, duration: 1 }, 0);
      });

      // Content fade in for all devices
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
      className="relative min-h-screen bg-[#111111] overflow-hidden" // Changed from overflow-x-hidden
    >
      {/* Title Section */}
      <div 
        ref={titleRef}
        className="relative pt-8 px-4 lg:absolute lg:top-[5%] lg:left-[20%] xl:left-[15%] z-10"
      >
        <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem] leading-[1.1] font-bold">
          <div ref={usedByRef} className="text-gray-400/80 block lg:inline-block">Used by</div>
          <div ref={myHandsRef} className="text-white block my-2 lg:my-0">my hands</div>
          <div ref={andMindRef} className="text-gray-400/80 block lg:inline-block">and mind</div>
        </h1>
      </div>

      {/* Content wrapper */}
      <div className="relative lg:absolute right-0 w-full lg:w-2/3 mt-12 lg:mt-0 lg:top-[10%] min-h-[60vh] lg:h-full">
        <div 
          ref={contentRef}
          className="px-4 sm:px-8 lg:pl-16 lg:pr-20 w-full h-full scrollbar-hide" // Added scrollbar-hide and h-full
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-4 pt-[5%]">
            {/* Languages Section */}
            <section className="sm:col-span-1 lg:col-span-5 lg:pl-[30%]">
              <h3 className="text-white text-xl sm:text-2xl font-bold mb-6 uppercase">Languages</h3>
              <ul className="space-y-3">
                {languages.map((lang, index) => (
                  <li key={index} className="flex items-start text-base sm:text-lg">
                    <span className="text-gray-400 mr-2">•</span>
                    <span className="text-gray-400">{lang}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Frameworks Section */}
            <section className="sm:col-span-1 lg:col-span-7">
              <h3 className="text-white text-xl sm:text-2xl font-bold mb-6 uppercase">
                Frameworks/ Libraries/ Others
              </h3>
              <ul className="space-y-3">
                {frameworks.map((fw, index) => (
                  <li key={index} className="flex items-start text-base sm:text-lg">
                    <span className="text-gray-400 mr-2">•</span>
                    <span className="text-gray-400">{fw}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Special Section */}
            <section className="col-span-full mt-8 lg:mt-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">
                <div className="sm:col-span-1 lg:col-span-5 lg:pl-[30%]">
                  <h3 className="text-white text-xl sm:text-2xl font-bold mb-4 uppercase">Special</h3>
                  <div className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <span className="text-gray-400">Googling 😅</span>
                  </div>
                </div>
                <div className="sm:col-span-1 lg:col-span-7 mt-4 sm:mt-0">
                  <p className="text-gray-400 text-base sm:text-lg">
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

      {/* Image Section */}
      <div 
        ref={imageContainerRef}
        className="hidden lg:block absolute left-0 top-[5%] w-1/3 h-full"
      >
        <Image
          src="/skills-image.jpg"
          alt="Developer workspace"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
    </section>
  );
};

export default Skills;