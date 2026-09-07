import { Languages } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function Navbar() {
  const { isEnglish, toggleLanguage } = useLanguage();
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
        {links.map((link) => (
          <a href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
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
