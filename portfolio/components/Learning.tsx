import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Philosophy: React.FC = () => {
    const sectionRef = React.useRef<HTMLElement>(null);

    // Scroll progress for parallax effect
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    // Text animation variants
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    // Container animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    return (
        <motion.section
            ref={sectionRef}
            id="philosophy"
            className="min-h-screen bg-[#111111] flex items-center justify-end py-20 px-4 md:px-8 lg:px-16 relative z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-4xl w-full mx-auto pl-0 md:pl-[10%] lg:pl-[20%]">
                <motion.div
                    className="w-full space-y-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {/* First Text Block */}
                    <motion.div variants={textVariants}>
                        <p className="text-[#888888] text-xl md:text-2xl font-normal tracking-tight leading-relaxed">
                            Truth is,{' '}
                            <motion.span
                                className="text-white text-2xl md:text-4xl font-bold sf-bold"
                                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -30]) }}
                            >
                                the life of a programmer{' '}
                            </motion.span>
                            requires one to{' '}
                            <motion.span
                                className="text-white text-2xl md:text-4xl font-bold sf-bold"
                                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -20]) }}
                            >
                                learn new things everyday,{' '}
                            </motion.span>
                            because technology{' '}
                            <motion.span
                                className="text-white text-2xl md:text-4xl font-bold sf-bold"
                                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -10]) }}
                            >
                                keeps changing at a{' '}
                            </motion.span>
                            very fast pace.
                        </p>
                    </motion.div>

                    {/* Second Text Block */}
                    <motion.div variants={textVariants}>
                        <p className="text-[#888888] text-xl md:text-2xl font-normal tracking-tight leading-relaxed">
                            I have therefore,{' '}
                            <motion.span
                                className="text-white text-2xl md:text-4xl font-bold sf-bold"
                                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -20]) }}
                            >
                                embraced{' '}
                            </motion.span>
                            the concept of being a{' '}
                            <motion.span
                                className="text-white text-2xl md:text-4xl font-bold sf-bold"
                                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -15]) }}
                            >
                                life long learner. Learning{' '}
                            </motion.span>
                            to solve whatever problem is encountered, ain't that why{' '}
                            <motion.span
                                className="text-white text-2xl md:text-4xl font-bold sf-bold"
                                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -10]) }}
                            >
                                Googling is a developers best friend
                            </motion.span>
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Philosophy;