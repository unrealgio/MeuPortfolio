import { ArrowDown, Download } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

const Stack = {
  frontend: ["React", "Next.js", "TailwindCSS"],
  backend: ["Node.js", "Express"],
  database: ["PostgreSQL", "MongoDB", "SQL Server"],
  tools: ["Git", "Docker", "Vite", ],
};

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/unrealgio",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/giovanni-felipe-dev/",
    icon: FaLinkedinIn,
  },
];

function Hero() {
  const { isEnglish } = useLanguage();
  return (
    <main className="hero" id="inicio">
      <div className="ambient-background" aria-hidden="true">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/videos/background.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay" />
      </div>

      <div className="hero-content">
        <p className="hero-label">
          {isEnglish ? "WEB DEVELOPER" : "DESENVOLVEDOR WEB"}
        </p>

        <h1>
          {isEnglish ? "Hello, I'm " : "Olá, eu sou "}
          <span className="hero-name">
            <span className="hero-prompt" aria-hidden="true">
              &gt;{" "}
            </span>
            Giovanni Felipe.
            <span className="hero-cursor" aria-hidden="true" />
          </span>
        </h1>

        <p className="hero-description">
          {isEnglish
            ? "Web Developer focused on creating modern, functional and visually striking digital experiences. I combine development, design and technology to turn ideas into intuitive, efficient solutions."
            : "Desenvolvedor Web focado na criação de experiências digitais modernas, funcionais e visualmente marcantes. Busco combinar desenvolvimento, design e tecnologia para transformar ideias em soluções intuitivas, eficientes e alinhadas às necessidades de cada projeto."}
        </p>

        <div
          className="hero-links"
          aria-label={isEnglish ? "Professional links" : "Links profissionais"}
        >
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              className="icon-link"
              href={href}
              key={label}
              target="_blank"
              rel="noreferrer"
              aria-label={`${isEnglish ? "Open" : "Abrir"} ${label}`}
              title={label}
            >
              <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
            </a>
          ))}

          <a
            className="resume-link"
            href="/curriculo.pdf"
            download
            aria-label={
              isEnglish ? "Download resume as PDF" : "Baixar currículo em PDF"
            }
          >
            <Download size={19} strokeWidth={1.8} aria-hidden="true" />
            <span>{isEnglish ? "Resume" : "Currículo"}</span>
          </a>
        </div>
      </div>

      <section
        className="stack-card"
        aria-label={isEnglish ? "Developer profile" : "Perfil do desenvolvedor"}
      >
        <header className="card-header">
          <div className="window-controls" aria-hidden="true">
            <span className="window-control control-red" />
            <span className="window-control control-yellow" />
            <span className="window-control control-green" />
          </div>

          <div
            className="card-title"
            aria-label={
              isEnglish ? "developer.js file" : "Arquivo developer.js"
            }
          >
            <span className="file-name">developer.js</span>
            <span className="file-type">JavaScript</span>
          </div>
        </header>

        <div
          className="code-block"
          aria-label={
            isEnglish ? "Developer summary" : "Resumo do desenvolvedor"
          }
        >
          <p>
            <span className="purple">const</span>{" "}
            <span className="blue">developer</span> = {"{"}
          </p>
          <p className="indent">
            <span className="green">name:</span>{" "}
            <span className="orange">&quot;Giovanni Felipe&quot;</span>,
          </p>
          <p className="indent">
            <span className="green">role:</span>{" "}
            <span className="orange">
              &quot;{isEnglish ? "Web Developer" : "Desenvolvedor Web"}&quot;
            </span>
            ,
          </p>
          <p className="indent">
            <span className="green">experience:</span>{" "}
            <span className="orange">&quot;+3 anos&quot;</span>,
          </p>
          <p className="indent">
            <span className="green">location:</span>{" "}
            <span className="orange">&quot;Natal/RN&quot;</span>,
          </p>
          <p className="indent">
            <span className="green">available:</span>{" "}
            <span className="yellow">true</span>,
          </p>
          <p>{"}"}</p>
        </div>

        <div
          className="code-block stack-code"
          aria-label={isEnglish ? "Developer stack" : "Stack do desenvolvedor"}
        >
          <p>
            <span className="purple">const</span>{" "}
            <span className="blue">stack</span> = {"{"}
          </p>
          {Object.entries(Stack).map(([category, technologies]) => (
            <p className="indent" key={category}>
              <span className="green">{category}:</span>{" "}
              <span className="orange">
                [&quot;{technologies.join('", "')}&quot;]
              </span>
              ,
            </p>
          ))}
          <p>{"}"}</p>
        </div>
      </section>

      <a className="meet-link" href="#sobre">
        <span>{isEnglish ? "Click to meet" : "Conheça meu trabalho"}</span>
        <ArrowDown size={17} strokeWidth={1.8} aria-hidden="true" />
      </a>
    </main>
  );
}

export default Hero;
