import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

interface Project {
  name: string;
  type: string;
  link: string;
  image: string;
}

const projectsData: Project[] = [
  {
    name: "Sabzee",
    type: "Web Application",
    image: "/projects/project1.png",
    link: "/"
  },
  {
    name: "Notion Clone",
    type: "Web Application",
    image: "/projects/project3.png",
    link: "https://notes-puce-ten.vercel.app/"
  },
  {
    name: "EMS",
    type: "Web Application",
    image: "/projects/project2.png",
    link: "https://gamespeak.com"
  },
  {
    name: "3D Portfolio",
    type: "Web Application",
    image: "/projects/project4.png",
    link: "https://gamespeak.com"
  },
];

const Projects: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const titleX = useTransform(scrollYProgress, [0, 0.5], ["-100%", "0%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setTargetPos({
      x: e.clientX,
      y: e.clientY
    });
  };

  useEffect(() => {
    const updateMousePosition = () => {
      setMousePos(prev => ({
        x: prev.x + (targetPos.x - prev.x) * 0.20,
        y: prev.y + (targetPos.y - prev.y) * 0.20
      }));
    };

    const animationFrame = requestAnimationFrame(function animate() {
      updateMousePosition();
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [targetPos]);

  return (
    <motion.section 
      ref={sectionRef}
      id="projects" 
      className="min-h-[80vh] bg-[#111111] px-4 sm:px-8 md:px-16 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Title Section */}
        <motion.div 
          ref={titleRef}
          className="mb-12 sm:mb-16 pt-12 overflow-hidden"
        >
          <motion.div className="overflow-hidden">
            <motion.h2 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-sf tracking-tighter transform-gpu"
              style={{ x: titleX, opacity: titleOpacity }}
            >
              Projects
            </motion.h2>
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {projectsData.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                href={project.link}
                className="group relative border-t border-[#333333] last:border-b"
              >
                <div className="py-6 sm:py-8 md:py-12 relative">
                  <div 
                    className="flex justify-between items-center"
                    onMouseEnter={() => setHoveredProject(project.name)}
                    onMouseLeave={() => setHoveredProject(null)}
                    onMouseMove={handleMouseMove}
                  >
                    <motion.h2 
                      className="text-3xl sm:text-5xl md:text-7xl font-sf text-[#333333] group-hover:text-white"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.name}
                    </motion.h2>
                    <span className="text-sm sm:text-base text-[#666666]">
                      {project.type}
                    </span>
                  </div>

                  {/* Project Preview */}
                  <AnimatePresence>
                    {hoveredProject === project.name && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ 
                          duration: 0.5,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                        className="fixed pointer-events-none z-[9999]"
                        style={{
                          left: `${mousePos.x}px`,
                          top: `${mousePos.y}px`,
                          transform: 'translate(-50%, -50%)',
                          width: '320px',
                          height: '200px',
                        }}
                      >
                        <motion.div 
                          className="relative w-full h-full overflow-hidden rounded-lg shadow-2xl bg-black"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Projects;