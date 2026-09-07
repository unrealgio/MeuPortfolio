import { ArrowUpRight, Mail, MapPin, MessageCircle } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

function Contact() {
  const { isEnglish } = useLanguage();
  return (
    <section
      className="contact-section"
      id="contato"
      aria-labelledby="contact-title"
    >
      <div className="section-shell contact-shell">
        <div>
          <p className="section-label">| {isEnglish ? "CONTACT" : "CONTATO"}</p>
          <h2 id="contact-title">
            {isEnglish
              ? "Let’s build something useful."
              : "Vamos construir algo útil?"}
          </h2>
          <p className="contact-description">
            {isEnglish
              ? "I am available to talk about projects, opportunities and digital solutions."
              : "Estou disponível para conversar sobre projetos, oportunidades e soluções digitais."}
          </p>
          <div className="contact-status">
            <span className="status-dot" />
            <span>
              {isEnglish
                ? "Available for new projects"
                : "Disponível para novos projetos"}
            </span>
          </div>
        </div>

        <div className="contact-links">
          <a
            href="mailto:giovannifelipedev@gmail.com"
            aria-label={isEnglish ? "Send an email" : "Enviar e-mail"}
          >
            <Mail size={19} aria-hidden="true" />
            <span>giovannifelipedev@gmail.com</span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <a
            href="https://wa.me/5584998756010"
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={19} aria-hidden="true" />
            <span>
              {isEnglish ? "Talk on WhatsApp" : "Falar pelo WhatsApp"}
            </span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <div className="contact-location">
            <MapPin size={17} aria-hidden="true" />
            <span>
              {isEnglish ? "Natal, RN · Brazil" : "Natal, RN · Brasil"}
            </span>
          </div>
        </div>

        <div
          className="contact-map"
          aria-label={
            isEnglish
              ? "Location in Natal, Rio Grande do Norte"
              : "Localização em Natal, Rio Grande do Norte"
          }
        >
          <iframe
            title={
              isEnglish
                ? "Map of Natal, Rio Grande do Norte"
                : "Mapa de Natal, Rio Grande do Norte"
            }
            src="https://www.google.com/maps?q=Natal%2C%20RN%2C%20Brasil&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <footer className="site-footer section-shell">
        <span>
          © {new Date().getFullYear()} Giovanni Felipe.{" "}
          {isEnglish ? "All rights reserved." : "Todos os direitos reservados."}
        </span>
        <div className="footer-links">
          <a
            className="footer-icon-link"
            href="https://github.com/unrealgio"
            target="_blank"
            rel="noreferrer"
            aria-label={isEnglish ? "Open GitHub" : "Abrir GitHub"}
            title="GitHub"
          >
            <FaGithub size={18} aria-hidden="true" />
          </a>
          <a
            className="footer-icon-link"
            href="https://www.linkedin.com/in/giovanni-felipe-dev/"
            target="_blank"
            rel="noreferrer"
            aria-label={isEnglish ? "Open LinkedIn" : "Abrir LinkedIn"}
            title="LinkedIn"
          >
            <FaLinkedinIn size={18} aria-hidden="true" />
          </a>
          <a
            className="footer-icon-link"
            href="mailto:giovannifelipedev@gmail.com?subject=Contato%20pelo%20portf%C3%B3lio"
            aria-label={
              isEnglish
                ? "Email giovannifelipedev@gmail.com"
                : "Enviar e-mail para giovannifelipedev@gmail.com"
            }
            title={
              isEnglish
                ? "Email giovannifelipedev@gmail.com"
                : "Enviar e-mail para giovannifelipedev@gmail.com"
            }
          >
            <Mail size={18} aria-hidden="true" />
          </a>
        </div>
      </footer>
    </section>
  );
}

export default Contact;
