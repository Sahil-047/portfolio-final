import type { NextPage } from 'next';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Philosophy from '../components/Philosophy';
import Excellence from '../components/Excellence';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Learning from '@/components/Learning';

const Home: NextPage = () => {
  return (
    <div className="bg-black">
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Philosophy />
      <Excellence />
      <Skills />
      <Learning />
      <Projects />
      <Contact />
    </div>
  );
};

export default Home; 