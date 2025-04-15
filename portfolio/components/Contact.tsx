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

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current || !textContainerRef.current || !bgTextRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(textContainerRef.current, {
        y: '-80vh' // Reduced from -100vh
      });

      gsap.set(bgTextRef.current, {
        opacity: 0.03,
        y: '80vh' // Reduced from 100vh
      });

      // Create scrolling animation with reduced scroll length
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%", // Reduced from 200%
          pin: true,
          scrub: 0.8, // Slightly reduced for smoother motion
          invalidateOnRefresh: true
        }
      });

      // Adjust animation timing
      tl.to(textContainerRef.current, {
        y: '0',
        ease: "none",
        duration: 0.8 // Added duration for smoother movement
      })
      .to(bgTextRef.current, {
        y: '0',
        opacity: 0.05,
        ease: "none",
        duration: 0.8 // Added duration for smoother movement
      }, "<");
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-[90vh] bg-[#111111] relative overflow-hidden" // Reduced from min-h-screen
    >
      {/* Background Text */}
      <div
        ref={bgTextRef}
        className="fixed top-0 left-0 w-full text-[20vw] text-white opacity-[0.03] font-bold pointer-events-none z-0 whitespace-nowrap"
        style={{ writingMode: 'vertical-rl' }}
      >
        CONTACT CONTACT CONTACT
      </div>

      {/* Main Content Container */}
      <div
        ref={containerRef}
        className="relative z-10 min-h-screen flex items-center justify-center"
      >
        {/* Content Wrapper */}
        <div
          ref={textContainerRef}
          className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 md:px-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Navigation Links */}
            <div className="space-y-4">
              {/* Quick Links */}
              <div className="mb-8">
                <h3 className="text-l font-bold text-[#666666] mb-4">QUICK LINKS</h3>
                <div className="flex items-center space-x-2 text-sm">
                  <Link href="/" className="text-white hover:text-[#666666] transition-colors">
                    HOME
                  </Link>
                  <span className="text-[#333333]">—</span>
                  <Link href="/projects" className="text-white hover:text-[#666666] transition-colors">
                    PROJECTS
                  </Link>
                  <span className="text-[#333333]">—</span>
                  <Link href="/blog" className="text-white hover:text-[#666666] transition-colors">
                    BLOG
                  </Link>
                </div>
              </div>

              {/* Extras */}
              <div className="mb-16">
                <h3 className="text-l font-bold text-[#666666] mb-4">EXTRAS</h3>
                <div className="flex items-center space-x-2 text-sm">
                  <Link href="/resume" className="text-white hover:text-[#666666] transition-colors">
                    RESUME
                  </Link>
                  <span className="text-[#333333]">—</span>
                  <Link href="/credits" className="text-white hover:text-[#666666] transition-colors">
                    INSTAGRAM
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Section */}
            <div className="space-y-4 md:pl-8">
              <h2 className="text-4xl sm:text-5xl md:text-6xl text-white font-bold">
                Would love to hear from you ↓.
              </h2>
              <p className="text-[#666666]">
                If you have requests or questions, kindly do not hesitate to contact me.
              </p>
              <Link 
                href="mailto:sgolder40@gmail.com" 
                className="text-white hover:text-[#666666] transition-colors inline-block"
              >
                sgolder40@gmail.com
              </Link>
            </div>
          </div>

          {/* Footer Links */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-8 border-t border-[#333333] mt-20">
            <div className="flex gap-6 text-xs mb-4 sm:mb-0">
              <Link href="linkedin.com/in/sahil-golder" target="_blank" rel="noopener noreferrer" className="text-[#666666] hover:text-white transition-colors">
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