import { useEffect, useState } from "react";
import { Languages } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function Navbar() {
  const { isEnglish, toggleLanguage } = useLanguage();
  const [activeSection, setActiveSection] = useState("inicio");

  // Marca a ultima secao que ja ultrapassou a linha de leitura da viewport.
  useEffect(() => {
    const sections = ["inicio", "sobre", "projetos", "contato"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    let frameId;

    const updateActiveSection = () => {
      const readingLine = window.innerHeight * 0.35;
      let currentSection = sections[0]?.id || "inicio";

      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= readingLine) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    const handleScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links = [
    { label: isEnglish ? "Home" : "Início", href: "#inicio" },
    { label: isEnglish ? "About" : "Sobre", href: "#sobre" },
    { label: isEnglish ? "Projects" : "Projetos", href: "#projetos" },
    { label: isEnglish ? "Contact" : "Contato", href: "#contato" },
  ];

  return (
    <nav
      className="navbar"
      aria-label={isEnglish ? "Main navigation" : "Navegação principal"}
    >
      <div className="navbar-links">
        {links.map((link) => {
          const sectionId = link.href.slice(1);
          const isActive = activeSection === sectionId;

          return (
            <a
              href={link.href}
              key={link.href}
              className={isActive ? "navbar-link-active" : ""}
              aria-current={isActive ? "page" : undefined}
              onClick={() => setActiveSection(sectionId)}
            >
              {link.label}
            </a>
          );
        })}
      </div>
      <button
        className="language-toggle"
        type="button"
        onClick={toggleLanguage}
        aria-label={isEnglish ? "Switch to Portuguese" : "Mudar para inglês"}
        title={isEnglish ? "Portuguese" : "English"}
      >
        <Languages size={14} aria-hidden="true" />
        <span>{isEnglish ? "PT" : "EN"}</span>
      </button>
    </nav>
  );
}

export default Navbar;
