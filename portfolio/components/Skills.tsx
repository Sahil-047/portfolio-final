import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const Skills = () => {
  // Remove GSAP-related refs and keep only necessary ones
  const sectionRef = React.useRef<HTMLElement>(null);

  // Define your skill lists
  const languages = ["HTML", "CSS", "Typescript", "Java"];
  const frameworks = [
    "React.js", "Node.js", "Express.js", "Next.js", "GSAP",
    "Three.js", "React Query", "Express.js", "React Testing Library",
    "Redux", "Tailwind CSS"
  ];

  // Framer Motion scroll animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end start"]
  });

  // Transform values for title animations
  const usedByX = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const myHandsX = useTransform(scrollYProgress, [0, 0.5], [0, -150]);
  const andMindX = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#111111] overflow-hidden z-10"
    >
      {/* Title Section */}
      <div className="relative pt-8 px-4 lg:absolute lg:top-[5%] lg:left-[20%] xl:left-[15%] z-10">
        <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem] leading-[1.1] font-bold">
          <motion.div 
            style={{ x: usedByX }}
            className="text-gray-400/80 block lg:inline-block"
          >
            Used by
          </motion.div>
          <motion.div 
            style={{ x: myHandsX }}
            className="text-white block my-2 lg:my-0"
          >
            my hands
          </motion.div>
          <motion.div 
            style={{ x: andMindX }}
            className="text-gray-400/80 block lg:inline-block"
          >
            and mind
          </motion.div>
        </h1>
      </div>

      {/* Content wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative lg:absolute right-0 w-full lg:w-2/3 mt-12 lg:mt-0 lg:top-[10%] min-h-[60vh] lg:h-full"
      >
        <div className="px-4 sm:px-8 lg:pl-16 lg:pr-20 w-full h-full scrollbar-hide max-h-screen overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-4 pt-[5%]">
            {/* Languages Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="sm:col-span-1 lg:col-span-5 lg:pl-[30%]"
            >
              <h3 className="text-white text-xl sm:text-2xl font-bold mb-6 uppercase">Languages</h3>
              <ul className="space-y-3">
                {languages.map((lang, index) => (
                  <li key={index} className="flex items-start text-base sm:text-lg">
                    <span className="text-gray-400 mr-2">•</span>
                    <span className="text-gray-400">{lang}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Frameworks Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="sm:col-span-1 lg:col-span-7"
            >
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
            </motion.section>

            {/* Special Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="col-span-full mt-8 lg:mt-12"
            >
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
            </motion.section>
          </div>
        </div>
      </motion.div>

      {/* Image Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:block absolute left-0 top-[5%] w-1/3 h-full"
      >
        <Image
          src="/excellence-bg.jpg"
          alt="Pixel art developer setup"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain object-center"
          priority
          style={{ 
            filter: 'brightness(0.9) contrast(1.1)',
            mixBlendMode: 'lighten'
          }}
        />
        <div className="absolute inset-0 bg-[#111111]/40 mix-blend-overlay"></div>
      </motion.div>
    </section>
  );
};

export default Skills;