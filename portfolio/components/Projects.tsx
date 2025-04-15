import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  name: string;
  type: string;
  link: string;
  image: string;
}

const projectsData: Project[] = [
  {
    name: "Gamespeak",
    type: "Web Application",
    image: "/projects/gamespeak.jpg",
    link: "https://gamespeak.com"
  },
  {
    name: "Prodeus",
    type: "Web Application",
    image: "/projects/prodeus.jpg",
    link: "https://prodeus.com"
  }
];

const Projects: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const titleRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    setTargetPos({
      x: e.clientX,
      y: e.clientY
    });
  };

  useEffect(() => {
    const updateMousePosition = () => {
      setMousePos(prev => ({
        x: prev.x + (targetPos.x - prev.x) * 0.15, // Increased from 0.05 for faster motion
        y: prev.y + (targetPos.y - prev.y) * 0.15
      }));
    };

    const animationFrame = requestAnimationFrame(function animate() {
      updateMousePosition();
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [targetPos]);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current.querySelector('h2'),
        {
          opacity: 0,
          x: '-100%',
        },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  return (
    <section className="min-h-[80vh] bg-[#111111] px-4 sm:px-8 md:px-16 py-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Title Section */}
        <div 
          ref={titleRef}
          className="mb-12 sm:mb-16 pt-12 overflow-hidden" // Reduced margins and padding
        >
          <div className="overflow-hidden">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-bold tracking-tighter transform-gpu">
              Projects
            </h2>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1">
          {projectsData.map((project) => (
            <Link
              href={project.link}
              key={project.name}
              className="group relative border-t border-[#333333] last:border-b"
            >
              <div className="py-6 sm:py-8 md:py-12 relative"> {/* Reduced padding */}
                <div 
                  className="flex justify-between items-center"
                  onMouseEnter={() => setHoveredProject(project.name)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onMouseMove={handleMouseMove}
                >
                  <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold text-[#333333] transition-colors duration-700 group-hover:text-white">
                    {project.name}
                  </h2>
                  <span className="text-sm sm:text-base text-[#666666]">
                    {project.type}
                  </span>
                </div>

                {/* Project Preview - slightly smaller size */}
                <AnimatePresence>
                  {hoveredProject === project.name && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ 
                        duration: 0.5, // Reduced from 0.8
                        ease: [0.16, 1, 0.3, 1], // Custom bezier curve for smoother motion
                      }}
                      className="fixed pointer-events-none z-[9999]"
                      style={{
                        left: `${mousePos.x}px`,
                        top: `${mousePos.y}px`,
                        transform: 'translate(-50%, -50%)',
                        width: '320px', // Reduced from 400px
                        height: '200px', // Reduced from 240px
                      }}
                    >
                      <motion.div 
                        className="relative w-full h-full overflow-hidden rounded-lg shadow-2xl bg-black"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ 
                          duration: 0.4, // Reduced from 0.6
                          delay: 0.1, // Reduced from 0.2
                          ease: "easeOut"
                        }}
                      >
                        <Image
                          src={project.image}
                          alt={project.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority
                        />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;