import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--bg)] transition-colors duration-300">
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
        <ChatBot />
      </div>
    </ThemeProvider>
  );
}

export default App;
