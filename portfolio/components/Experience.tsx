import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: React.ReactNode;
}

const experiences: ExperienceItem[] = [
  {
    company: "RedBrick AI",
    role: "Senior Frontend Engineer",
    period: "May 2023 - Present",
    description: "Working actively on RedBrick's rapid and collaborative web-based annotation platform that helps medical imaging (CT/PET/MRI/X-ray/Ultrasound etc.) AI companies/teams to accelerate their annotation and review workflows with several high-performance tools."
  },
  {
    company: "Prodeus",
    role: "Frontend Engineer",
    period: "2022 - 2023",
    description: "Led frontend development initiatives and implemented responsive designs."
  },
  {
    company: "Upwork/Freelancing",
    role: "Frontend Developer",
    period: "2019 - 2023",
    description: "Worked with M.Paccione Design & Development Agency to bring ideas to life. Also, I occasionally dive into side projects when the need arises since skilled hands are always needed. More freelance projects will be shown soon in the projects section."
  },
  {
    company: "Joyup",
    role: "Frontend Developer",
    period: "2020 - 2021",
    description: "Developed user interfaces for digital products."
  },
  {
    company: "Liveizy",
    role: "Web Developer",
    period: "2019 - 2020",
    description: "Created responsive web applications."
  },
  {
    company: "Sumosoft",
    role: "Junior Developer",
    period: "2018 - 2019",
    description: "Started career in web development."
  }
];

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const fadeTextRef = useRef<HTMLDivElement>(null);
  const [activeCompany, setActiveCompany] = useState<string>("RedBrick AI");
  const [hoveredCompany, setHoveredCompany] = useState<string | null>(null);
  const [fadeOpacity, setFadeOpacity] = useState<number>(0.05);
  const [textPosition, setTextPosition] = useState<number>(0);
  const triggers = useRef<Array<ScrollTrigger>>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    const setupScrollTrigger = () => {
      triggers.current.forEach(trigger => trigger.kill());
      triggers.current = [];

      if (!ScrollTrigger || !sectionRef.current || !fadeTextRef.current) return;

      const ctx = gsap.context(() => {
        const pinTrigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: window.innerWidth < 768 ? "+=200%" : "+=300%",
          pin: true,
          pinSpacing: true
        });
        
        triggers.current.push(pinTrigger);

        const progressTrigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: window.innerWidth < 768 ? "+=200%" : "+=300%",
          scrub: true,
          onUpdate: self => {
            const index = Math.min(
              Math.floor(self.progress * experiences.length),
              experiences.length - 1
            );
            setActiveCompany(experiences[index].company);
            setHoveredCompany(experiences[index].company);
            
            const opacity = 0.02 + Math.sin(self.progress * Math.PI) * 0.1;
            setFadeOpacity(opacity);
            
            const position = self.progress * (window.innerWidth < 768 ? -50 : -100);
            setTextPosition(position);
            
            if (fadeTextRef.current) {
              fadeTextRef.current.style.opacity = opacity.toString();
              fadeTextRef.current.style.transform = `translateY(${position}px)`;
            }
          }
        });
        
        triggers.current.push(progressTrigger);
      });

      return () => ctx.revert();
    };

    setupScrollTrigger();
    window.addEventListener('resize', setupScrollTrigger);

    return () => {
      window.removeEventListener('resize', setupScrollTrigger);
      triggers.current.forEach(trigger => trigger.kill());
    };
  }, []);

  // Find the current company's details
  const currentCompany = experiences.find(exp => exp.company === activeCompany) || experiences[0];

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="min-h-[100svh] bg-[#111111] flex items-center justify-center py-6 sm:py-10 md:py-20 px-4 sm:px-6 md:px-8 lg:px-16 relative overflow-hidden"
    >
      <div className="max-w-[1400px] w-full relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] gap-6 sm:gap-8 lg:gap-16 items-start sm:items-center">
          {/* Left column - Company list */}
          <div className="space-y-4 sm:space-y-6 relative">
            {/* Background text under companies section with inverse scrolling */}
            <div 
              ref={fadeTextRef}
              className="absolute -z-10 left-0 -bottom-10 sm:-bottom-20 text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] xl:text-[16rem] font-bold tracking-[-0.05em] leading-[0.8] pointer-events-none text-white opacity-5 whitespace-nowrap overflow-hidden transform-gpu"
            >
              WORK
            </div>
            
            {experiences.map((exp) => (
              <div
                key={exp.company}
                className={`relative text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-[0.9] tracking-[-0.02em] cursor-pointer sf-bold transition-colors duration-500 
                ${activeCompany === exp.company ? 'text-white' : 'text-[#333333]'}`}
                onClick={() => {
                  setActiveCompany(exp.company);
                  setHoveredCompany(exp.company);
                }}
                onMouseEnter={() => setHoveredCompany(exp.company)}
                onMouseLeave={() => {
                  if (hoveredCompany === exp.company && hoveredCompany !== activeCompany) {
                    setHoveredCompany(null);
                  }
                }}
              >
                {exp.company}
              </div>
            ))}
          </div>

          {/* Right column - Experience details */}
          <div className="self-start sm:self-center space-y-4 sm:space-y-6">
            <h3 className="text-white text-base sm:text-lg md:text-xl font-bold tracking-[-0.02em] leading-none">
              {currentCompany.company}
            </h3>
            
            <div className="space-y-3 sm:space-y-4">
              <p className="text-[#888888] text-sm sm:text-base">{currentCompany.role}</p>
              <p className="text-[#888888] text-sm sm:text-base">{currentCompany.period}</p>
              
              <div className="text-[#888888] text-sm sm:text-base leading-relaxed mt-4 sm:mt-8">
                {currentCompany.description}
              </div>

              {currentCompany.company === "RedBrick AI" && (
                <ul className="list-disc pl-4 sm:pl-5 mt-3 sm:mt-4 text-[#888888] space-y-1">
                  <li className="text-sm sm:text-base">Senior Frontend Engineer</li>
                  <li className="text-sm sm:text-base">Claymont, Delaware, United States</li>
                  <li className="text-sm sm:text-base hover:text-white transition-colors">
                    <a href="https://redbrickai.com/" target="_blank" rel="noopener noreferrer">
                      https://redbrickai.com/
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;