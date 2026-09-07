import Navbar from "./components/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </LanguageProvider>
  );
}

export default App;
