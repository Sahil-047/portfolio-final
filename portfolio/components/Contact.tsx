import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current || !textContainerRef.current || !bgTextRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Mobile-only animations (screen width < 768px)
      mm.add("(max-width: 767px)", () => {
        // Set initial states
        gsap.set(textContainerRef.current, {
          y: '-80vh'
        });

        gsap.set(bgTextRef.current, {
          opacity: 0.03,
          y: '80vh'
        });

        // Create scrolling animation for mobile
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            pinSpacing: true,
            anticipatePin: 1
          }
        });

        // Mobile animation timing
        tl.to(textContainerRef.current, {
          y: '0',
          ease: "none",
          duration: 0.8
        })
        .to(bgTextRef.current, {
          y: '0',
          opacity: 0.05,
          ease: "none",
          duration: 0.8
        }, "<");
      });

      // Desktop layout - no animation
      mm.add("(min-width: 768px)", () => {
        gsap.set([textContainerRef.current, bgTextRef.current], {
          clearProps: "all"
        });
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-[90vh] bg-[#111111] relative overflow-hidden"
      style={{ zIndex: 1 }} // Added explicit z-index
    >
      {/* Background Text */}
      <div
        ref={bgTextRef}
        className="absolute top-0 left-0 w-full text-[20vw] text-white opacity-[0.03] font-bold pointer-events-none"
        style={{ writingMode: 'vertical-rl', zIndex: 0 }}
      >
        CONTACT
      </div>

      {/* Main Content Container */}
      <div
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center"
        style={{ zIndex: 2 }}
      >
        {/* Content Wrapper */}
        <div
          ref={textContainerRef}
          className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 md:px-16 pt-20 lg:pt-32"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
            {/* Left Column - Navigation Links */}
            <div className="space-y-8 lg:space-y-12">
              {/* Quick Links */}
              <div>
                <h3 className="text-sm font-medium text-[#666666] mb-4">QUICK LINKS</h3>
                <div className="flex flex-wrap gap-2 text-sm">
                  <Link href="/" className="text-white hover:text-[#666666] transition-colors">
                    HOME
                  </Link>
                  <span className="text-[#333333]">—</span>
                  <button 
                    onClick={() => scrollToSection('projects')} 
                    className="text-white hover:text-[#666666] transition-colors cursor-pointer bg-transparent border-none"
                  >
                    PROJECTS
                  </button>
                  <span className="text-[#333333]">—</span>
                  <Link href="/blog" className="text-white hover:text-[#666666] transition-colors">
                    BLOG
                  </Link>
                </div>
              </div>

              {/* Extras */}
              <div>
                <h3 className="text-sm font-medium text-[#666666] mb-4">EXTRAS</h3>
                <div className="flex flex-wrap gap-2 text-sm">
                  <Link href="/resume" className="text-white hover:text-[#666666] transition-colors">
                    RESUME
                  </Link>
                  <span className="text-[#333333]">—</span>
                  <Link href="/instagram" className="text-white hover:text-[#666666] transition-colors">
                    INSTAGRAM
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Section */}
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white font-bold leading-tight">
                Would love to hear from you ↓
              </h2>
              <p className="text-[#666666] text-base sm:text-lg">
                If you have requests or questions, kindly do not hesitate to contact me.
              </p>
              <Link 
                href="mailto:sgolder40@gmail.com" 
                className="text-white hover:text-[#666666] transition-colors inline-block text-base sm:text-lg"
              >
                sgolder40@gmail.com
              </Link>
            </div>
          </div>

          {/* Footer Links */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-8 border-t border-[#333333] mt-20">
            <div className="flex flex-wrap gap-6 text-xs mb-4 sm:mb-0">
              <Link href="https://linkedin.com/in/sahil-golder" target="_blank" rel="noopener noreferrer" className="text-[#666666] hover:text-white transition-colors">
                LINKEDIN
              </Link>
              <Link href="https://github.com/Sahil-047" target="_blank" rel="noopener noreferrer" className="text-[#666666] hover:text-white transition-colors">
                GITHUB
              </Link>
              <Link href="mailto:sgolder40@gmail.com" className="text-[#666666] hover:text-white transition-colors">
                EMAIL
              </Link>
            </div>
            <div className="text-xs text-[#666666]">
              © 2025 Sahil Golder. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;