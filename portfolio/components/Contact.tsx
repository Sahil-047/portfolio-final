import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.from(sectionRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center+=100",
          toggleActions: "play none none reverse"
        }
      });
    }
  }, []);

  return (
    <section id="contact" className="min-h-screen bg-black text-white py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <div ref={sectionRef}>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Get in Touch</h2>
          <p className="text-xl text-gray-400 mb-12">
            Would love to hear from you. If you have requests or questions, feel free to reach out.
          </p>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
                placeholder="Your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
            >
              Send Message
            </button>
          </form>

          <div className="mt-16 flex flex-wrap gap-6 justify-center">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Twitter
            </a>
            <a
              href="mailto:contact@example.com"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 