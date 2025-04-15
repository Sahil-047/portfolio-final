import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Philosophy: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textElements = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    // Create pin for the section with shorter scroll distance
    const pinTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=200%", // Reduced from 400% to 200% for faster completion
      pin: true,
      pinSpacing: true
    });

    const ctx = gsap.context(() => {
      // Initial state for text container - make it visible but opacity 0 for children
      gsap.set(containerRef.current, { visibility: "visible", opacity: 1 });
      
      // Set initial state for all text elements
      textElements.current.forEach(element => {
        if (!element) return;
        gsap.set(element, { opacity: 0, y: 20 }); // Reduced initial offset
      });
      
      // Animate text elements based on scroll progress
      const animationTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%", // Match pin end distance
        scrub: 0.3, // Reduced from 0.5 for snappier response
        onUpdate: (self) => {
          const progress = self.progress;
          textElements.current.forEach((element, index) => {
            if (!element) return;
            
            const totalElements = textElements.current.length;
            // Adjusted to show elements more quickly
            const showThreshold = index / totalElements * 0.5; // Reduced from 0.7
            
            if (progress >= showThreshold) {
              const fadeInProgress = Math.min(1, (progress - showThreshold) * 15); // Increased from 10 for faster fade
              gsap.to(element, { 
                opacity: fadeInProgress, 
                y: 0,
                duration: 0.1 // Reduced from 0.2 for faster animation
              });
            } else {
              gsap.set(element, { opacity: 0, y: 20 }); // Reduced offset
            }
          });
        }
      });
    });

    return () => {
      ctx.revert();
      pinTrigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="min-h-screen bg-[#111111] flex items-center justify-center py-20 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-4xl w-full mx-auto">
        <div 
          ref={containerRef}
          className="w-full space-y-16"
        >
          {/* Combined text with highlighted portions */}
          <div>
            <p 
              ref={(el) => { textElements.current[0] = el; }}
              className="text-[#888888] text-xl md:text-2xl font-normal tracking-tight leading-relaxed"
            >
              The things we make and the <span className="text-white text-2xl md:text-4xl font-bold sf-bold">quality of the work</span> we do
              reveal something about <span className="text-white text-2xl md:text-4xl font-bold sf-bold">who we are,</span> so I always strive to
              put <span className="text-white text-2xl md:text-4xl font-bold sf-bold">my best</span> into it.
            </p>
          </div>

          <div>
            <p 
              ref={(el) => { textElements.current[1] = el; }}
              className="text-[#888888] text-xl md:text-2xl font-normal tracking-tight leading-relaxed"
            >
              From writing <span className="text-white text-2xl md:text-4xl font-bold sf-bold">clean and scalable code</span> for posterity sake, to
              using the most <span className="text-white text-2xl md:text-4xl font-bold sf-bold">efficient algorithms</span> to ensure
              <span className="text-white text-2xl md:text-4xl font-bold sf-bold"> optimal performance</span> because "Speed is king".
            </p>
          </div>

          <div>
            <p 
              ref={(el) => { textElements.current[2] = el; }}
              className="text-[#888888] text-xl md:text-2xl font-normal tracking-tight leading-relaxed"
            >
              There is just <span className="text-white text-2xl md:text-4xl font-bold sf-bold">one word</span> to describe what I do 
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy; 