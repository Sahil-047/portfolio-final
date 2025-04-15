import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        if (titleRef.current && nameRef.current && scrollRef.current) {
            // Initial state
            gsap.set([titleRef.current, nameRef.current, scrollRef.current], { 
                opacity: 0,
                y: 20 
            });

            // Animate in sequence
            tl.to(titleRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.5
            })
            .to(nameRef.current, {
                opacity: 1,
                y: 0,
                duration: 1
            }, "-=0.5")
            .to(scrollRef.current, {
                opacity: 1,
                y: 0,
                duration: 1
            }, "-=0.5");
        }

        // Create scroll-triggered animation for hero section
        if (containerRef.current) {
            gsap.to(containerRef.current, {
                yPercent: -100,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "bottom bottom",
                    end: "bottom top",
                    scrub: true,
                    pin: true,
                    pinSpacing: false
                }
            });
        }
    }, []);

    return (
        <section 
            ref={containerRef} 
            className="relative min-h-screen bg-[#f5f5f5] flex flex-col justify-between py-20 px-4 md:px-8 lg:px-16 z-20"
        >
            {/* Left Content */}
            <div className="flex-1 max-w-[55%]">
                {/* Top Title Section */}
                <div ref={titleRef} className="mb-8">
                    <h1 className="text-[4rem] md:text-[6rem] lg:text-[8rem] font-bold leading-none tracking-tighter text-black">
                        SOFTWARE
                        <br />
                        DEVELOPER
                    </h1>
                    <p className="text-lg md:text-xl mt-4 text-black/80">
                        — WEB DEVELOPER & DESIGNER
                    </p>
                </div>
            </div>

            {/* Right Content */}
            <div className="absolute right-0 top-0 w-[45%] h-full">
                <div className="relative w-full h-full flex flex-col items-end">
                    {/* Profile Image Container */}
                    <div className="relative mt-20 mr-4 md:mr-8 lg:mr-16">
                     
                        
                        {/* Image */}
                        <div className="w-[280px] h-[380px] bg-[#1c1c1c] overflow-hidden">
                            <img 
                                src="/profile.png" 
                                alt="David Obodo"
                                className="w-full h-full object-cover object-center"
                            />
                        </div>

                        {/* Name Section */}
                        <div ref={nameRef} className="absolute mt-8 right-0 text-right" style={{ top: '100%' }}>
                            <p className="text-sm md:text-base text-black/80 mb-2">
                                — FULL STACK CAPABLE
                            </p>
                            <h2 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-bold leading-none tracking-tighter text-black">
                                SAHIL
                                <br />
                                GOLDER
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div 
                ref={scrollRef}
                className="absolute bottom-8 left-4 md:left-8 lg:left-16 flex items-center space-x-2"
            >
                <span className="text-black text-sm uppercase">SCROLL</span>
                <span className="text-black">↓</span>
            </div>
        </section>
    );
};

export default Hero; 