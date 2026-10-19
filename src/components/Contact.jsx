import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Mail,
  MessageCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

const email = "giovannifelipedev@gmail.com";

function formatNatalTime() {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Fortaleza",
  }).format(new Date());
}

function Contact() {
  const { isEnglish } = useLanguage();
  const [localTime, setLocalTime] = useState(formatNatalTime);
  const [copyStatus, setCopyStatus] = useState("idle");
  const copyTimeoutRef = useRef();

  useEffect(() => {
    const intervalId = setInterval(
      () => setLocalTime(formatNatalTime()),
      15000,
    );

    return () => {
      clearInterval(intervalId);
      clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }

    clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = setTimeout(() => setCopyStatus("idle"), 2000);
  }

  const copyLabels = {
    idle: isEnglish ? "Copy" : "Copiar",
    copied: isEnglish ? "Copied!" : "Copiado!",
    error: isEnglish ? "Copy failed" : "Não copiou",
  };

  const availability = [
    {
      label: "status",
      value: isEnglish
        ? "Open to new projects"
        : "Disponível para novos projetos",
      isStatus: true,
    },
    {
      label: isEnglish ? "work" : "modelo",
      value: isEnglish
        ? "Remote · Hybrid · On site"
        : "Remoto · Híbrido · Presencial",
    },
    {
      label: isEnglish ? "reply" : "resposta",
      value: isEnglish ? "Within 24h" : "Em até 24h",
    },
    {
      label: isEnglish ? "location" : "local",
      value: isEnglish ? "Natal, RN · Brazil" : "Natal, RN · Brasil",
    },
    {
      label: isEnglish ? "local time" : "horário",
      value: `${localTime} (GMT-3)`,
    },
  ];

  const channels = [
    {
      label: "WhatsApp",
      value: isEnglish ? "Send a message" : "Mandar mensagem",
      href: "https://wa.me/5584998756010",
      icon: MessageCircle,
    },
    {
      label: "LinkedIn",
      value: "giovanni-felipe-dev",
      href: "https://www.linkedin.com/in/giovanni-felipe-dev/",
      icon: FaLinkedinIn,
    },
    {
      label: "GitHub",
      value: "unrealgio",
      href: "https://github.com/unrealgio",
      icon: FaGithub,
    },
  ];

  return (
    <section
      className="contact-section"
      id="contato"
      aria-labelledby="contact-title"
    >
      <div className="section-shell contact-shell">
        <div className="contact-intro">
          <p className="section-label">{isEnglish ? "CONTACT" : "CONTATO"}</p>
          <h2 id="contact-title">
            {isEnglish
              ? "Shall we build something useful?"
              : "Vamos construir algo útil?"}
          </h2>
          <p className="contact-description">
            {isEnglish
              ? "I am available to talk about projects, opportunities and digital solutions."
              : "Estou disponível para conversar sobre projetos, oportunidades e soluções digitais."}
          </p>

          <div className="contact-terminal">
            <header className="card-header">
              <div className="window-controls" aria-hidden="true">
                <span className="window-control control-red" />
                <span className="window-control control-yellow" />
                <span className="window-control control-green" />
              </div>
              <span className="file-name">availability.sh</span>
            </header>
            <p className="contact-terminal-command" aria-hidden="true">
              <span className="hero-console-prompt">$</span> ./availability
            </p>
            <dl className="contact-availability">
              {availability.map(({ label, value, isStatus }) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>
                    {isStatus && <span className="status-dot" />}
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="contact-cards">
          <div className="contact-card contact-card-email">
            <div className="contact-card-top">
              <Mail size={20} aria-hidden="true" />
              <button
                className="contact-copy"
                type="button"
                onClick={copyEmail}
                aria-label={
                  isEnglish ? "Copy email address" : "Copiar endereço de e-mail"
                }
              >
                {copyStatus === "copied" ? (
                  <Check size={14} aria-hidden="true" />
                ) : (
                  <Copy size={14} aria-hidden="true" />
                )}
                <span aria-live="polite">{copyLabels[copyStatus]}</span>
              </button>
            </div>
            <span className="contact-card-label">E-mail</span>
            <a className="contact-card-value" href={`mailto:${email}`}>
              {email}
            </a>
          </div>

          {channels.map(({ label, value, href, icon: Icon }) => (
            <a
              className="contact-card"
              href={href}
              key={label}
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-card-top">
                <Icon size={20} aria-hidden="true" />
                <ArrowUpRight size={17} aria-hidden="true" />
              </span>
              <span className="contact-card-label">{label}</span>
              <span className="contact-card-value">{value}</span>
            </a>
          ))}

          <a className="contact-card" href="/curriculo.pdf" download>
            <span className="contact-card-top">
              <Download size={20} aria-hidden="true" />
              <ArrowUpRight size={17} aria-hidden="true" />
            </span>
            <span className="contact-card-label">
              {isEnglish ? "Resume" : "Currículo"}
            </span>
            <span className="contact-card-value">
              {isEnglish ? "Download PDF" : "Baixar PDF"}
            </span>
          </a>
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
