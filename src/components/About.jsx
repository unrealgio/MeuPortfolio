import { ChevronLeft, ChevronRight, Database, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  FaCss3Alt,
  FaDocker,
  FaGitAlt,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
import {
  SiElectron,
  SiExpress,
  SiJira,
  SiMongodb,
  SiNextdotjs,
  SiPostgresql,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVitest,
} from "react-icons/si";
import { useLanguage } from "../context/LanguageContext";

// EXPERIÊNCIA PROFISSIONAL
const experiences = [
  {
    period: { pt: "Jan 2024 - Dez 2025", en: "Jan 2024 - Dec 2025" },
    role: {
      pt: "Desenvolvedor Web Full Stack",
      en: "Full Stack Web Developer",
    },
    company: "Digital Boost",
    description: {
      pt: "Integrei o time de produto da Digital Boost desenvolvendo funcionalidades de ponta a ponta com React, Node.js e TypeScript, sobre bancos MongoDB. Escrevi testes automatizados com Vitest para entregar com segurança e padronizei ambientes com Docker. No dia a dia, organizava as tarefas no Jira em ciclos ágeis, alinhava requisitos com o time e participava de revisões de código, um ambiente em que desenvolvi comunicação clara, colaboração e autonomia para resolver problemas.",
      en: "I was part of Digital Boost's product team, building end-to-end features with React, Node.js and TypeScript on top of MongoDB. I wrote automated tests with Vitest to ship with confidence and standardized environments with Docker. Day to day, I managed tasks in Jira through agile cycles, aligned requirements with the team and took part in code reviews, an environment where I sharpened clear communication, collaboration and the autonomy to solve problems.",
    },
    technologies: [
      "React",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "Docker",
      "Vitest",
      "Jira",
    ],
  },
  {
    period: { pt: "Jun 2023 - atualmente", en: "Jun 2023 - present" },
    role: { pt: "Desenvolvedor Web Freelancer", en: "Freelance Web Developer" },
    description: {
      pt: "Atendo clientes diretamente, do primeiro briefing ao deploy: entendo as necessidades do negócio, proponho a solução, desenho as interfaces e construo a aplicação completa, do front-end às APIs e ao banco de dados. Também cuido da publicação e dos ajustes depois da entrega, com uma comunicação próxima para que o resultado final reflita a visão de cada cliente.",
      en: "I work directly with clients, from the first briefing to deployment: I understand the business needs, propose the solution, design the interfaces and build the complete application, from front end to APIs and database. I also handle publishing and post-launch adjustments, keeping close communication so the final result reflects each client's vision.",
    },
  },
];

// CERTIFICADOS

const certificates = [
  {
    title: "Ambientes Computacionais e Conectividade",
    issuer: "Universidade Potiguar + Cisco",
    duration: "160 horas · concluído em Dezembro de 2025",
    file: "Ambientes Computacionais e Conectividade.pdf",
  },
  {
    title: "Interação Humano Computador e UX",
    issuer: "Universidade Potiguar",
    duration: "160 horas · concluído em Julho de 2026",
    file: "Interação Humano Computador e UX.pdf",
  },
  {
    title: "JavaScript Essentials 1",
    issuer: "Cisco Networking Academy",
    duration: "60 horas · concluído em Setembro de 2024",
    file: "JavaScript_Essentials_1_Badge20240930-7-jol5ek (2).pdf",
  },
  {
    title: "Matemática Computacional Aplicada",
    issuer: "Universidade Potiguar",
    duration: "160 horas · concluído em Julho de 2026",
    file: "Matemática Computacional Aplicada.pdf",
  },
  {
    title: "Modelagem de Software",
    issuer: "Universidade Potiguar",
    duration: "160 horas · concluído em Julho de 2025",
    file: "Modelagem de Software.pdf",
  },
  {
    title: "Programação de Soluções Computacionais",
    issuer: "Universidade Potiguar",
    duration: "160 horas · concluído em Julho de 2025",
    file: "Programação de Soluções Computacionais.pdf",
  },
  {
    title: "Sistemas Computacionais e Segurança",
    issuer: "Universidade Potiguar",
    duration: "160 horas · concluído em Dezembro de 2025",
    file: "Sistemas Computacionais e Segurança.pdf",
  },
];

const certificatePages = certificates.reduce((pages, certificate, index) => {
  const pageIndex = Math.floor(index / 3);
  pages[pageIndex] ??= [];
  pages[pageIndex].push(certificate);
  return pages;
}, []);

// TRADUÇÃO DOS CERTIFICADOS
function certificateDuration(duration, isEnglish) {
  if (!isEnglish) return duration;

  const monthTranslations = {
    Janeiro: "January",
    Fevereiro: "February",
    Março: "March",
    Abril: "April",
    Maio: "May",
    Junho: "June",
    Julho: "July",
    Agosto: "August",
    Setembro: "September",
    Outubro: "October",
    Novembro: "November",
    Dezembro: "December",
  };

  return duration.replace(
    /horas · concluído em|Janeiro|Fevereiro|Março|Abril|Maio|Junho|Julho|Agosto|Setembro|Outubro|Novembro|Dezembro/g,
    (text) => monthTranslations[text] || "hours · completed in",
  );
}

const certificateTitlesInEnglish = {
  "Ambientes Computacionais e Conectividade":
    "Computational Environments and Connectivity",
  "Interação Humano Computador e UX": "Human Computer Interaction and UX",
  "Matemática Computacional Aplicada": "Applied Computational Mathematics",
  "Modelagem de Software": "Software Modeling",
  "Programação de Soluções Computacionais":
    "Computational Solutions Programming",
  "Sistemas Computacionais e Segurança": "Computer Systems and Security",
};

function certificateTitle(title, isEnglish) {
  return isEnglish ? certificateTitlesInEnglish[title] || title : title;
}

// CONHECIMENTOS TÉCNICOS

const technologyGroups = [
  {
    label: "Linguagens",
    technologies: [
      { name: "JavaScript", icon: FaJs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "HTML5", icon: FaHtml5 },
      { name: "CSS3", icon: FaCss3Alt },
    ],
  },
  {
    label: "Frameworks",
    technologies: [
      { name: "React", icon: FaReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Node.js", icon: FaNodeJs },
      { name: "Express", icon: SiExpress },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Electron", icon: SiElectron },
    ],
  },
  {
    label: "Infra, DB & Tools",
    technologies: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "SQL Server", icon: Database },
      { name: "Supabase", icon: SiSupabase },
      { name: "Git", icon: FaGitAlt },
      { name: "Docker", icon: FaDocker },
      { name: "Vitest", icon: SiVitest },
      { name: "Jira", icon: SiJira },
    ],
  },
];

// ESTATISTICAS 

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function ScrambleNumber({ value, suffix = "", isActive, delay = 0 }) {
  const [display, setDisplay] = useState(() =>
    prefersReducedMotion() ? value : 0,
  );

  useEffect(() => {
    if (!isActive || prefersReducedMotion()) return undefined;

    const totalSteps = 18;
    const maxRandom = 10 ** String(value).length;
    let step = 0;
    let timeoutId;

    // ANIMAÇÃO EMBARALHAR VAI DIMINUINDO A SPEED ATÉ CHEGAR NO RESULTADO
    const tick = () => {
      step += 1;

      if (step >= totalSteps) {
        setDisplay(value);
        return;
      }

      setDisplay(Math.floor(Math.random() * maxRandom));
      timeoutId = setTimeout(tick, 40 + step * step * 0.6);
    };

    timeoutId = setTimeout(tick, delay);
    return () => clearTimeout(timeoutId);
  }, [isActive, value, delay]);

  return (
    <strong>
      <span aria-hidden="true">
        {display}
        {suffix}
      </span>
      <span className="visually-hidden">
        {value}
        {suffix}
      </span>
    </strong>
  );
}

function About() {
  const { isEnglish, language } = useLanguage();
  const [activeCertificate, setActiveCertificate] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("sobre");
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = aboutRef.current?.querySelectorAll("[data-about-section]");
    if (!sections?.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              second.intersectionRatio - first.intersectionRatio,
          )[0];

        if (visibleSection) {
          setActiveSection(visibleSection.target.dataset.aboutSection);
        }
      },
      { rootMargin: "-35% 0px -50%", threshold: [0.1, 0.35, 0.7] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function showPreviousCertificate() {
    setActiveCertificate((current) =>
      current === 0 ? certificatePages.length - 1 : current - 1,
    );
  }

  function showNextCertificate() {
    setActiveCertificate((current) => (current + 1) % certificatePages.length);
  }

  return (
    <section
      className={`about-section${isVisible ? " is-visible" : ""}`}
      id="sobre"
      ref={aboutRef}
      aria-label={isEnglish ? "About Giovanni Felipe" : "Sobre Giovanni Felipe"}
    >
      <div className="about-layout">
        <aside
          className="about-profile about-reveal"
          aria-label={isEnglish ? "Profile" : "Perfil"}
        >
          <img
            className="about-profile-image"
            src="/img/gio.webp"
            alt="Giovanni Felipe"
            loading="lazy"
            decoding="async"
          />
          <h3>Giovanni Felipe</h3>
          <p className="about-profile-location">
            <MapPin size={15} aria-hidden="true" /> Natal, RN - Lagoa Nova
          </p>
          <nav
            className="about-nav"
            aria-label={
              isEnglish
                ? "About section navigation"
                : "Navegação da seção Sobre"
            }
          >
            <a
              className={activeSection === "sobre" ? "about-nav-active" : ""}
              href="#sobre"
            >
              {isEnglish ? "About me" : "Sobre mim"}
            </a>
            <a
              className={
                activeSection === "experiencia" ? "about-nav-active" : ""
              }
              href="#experiencia"
            >
              {isEnglish ? "Experience" : "Experiência"}
            </a>
            <a
              className={
                activeSection === "certificacoes" ? "about-nav-active" : ""
              }
              href="#certificacoes"
            >
              {isEnglish ? "Certificates" : "Certificações"}
            </a>
            <a
              className={
                activeSection === "conhecimentos" ? "about-nav-active" : ""
              }
              href="#conhecimentos"
            >
              {isEnglish ? "Technical expertise" : "Expertise técnica"}
            </a>
          </nav>
        </aside>

        <div className="about-main">
          <div className="about-intro about-reveal" data-about-section="sobre">
            <div className="about-heading">
              <p className="section-label">
                {isEnglish ? "ABOUT ME" : "SOBRE MIM"}
              </p>

              <ul className="about-stats">
                <li>
                  <ScrambleNumber value={3} suffix="+" isActive={isVisible} />
                  <span>
                    {isEnglish ? "years of experience" : "anos de experiência"}
                  </span>
                </li>
                <li>
                  <ScrambleNumber
                    value={certificates.length}
                    isActive={isVisible}
                    delay={150}
                  />
                  <span>{isEnglish ? "certificates" : "certificações"}</span>
                </li>
                <li>
                  <ScrambleNumber value={2} isActive={isVisible} delay={300} />
                  <span>
                    {isEnglish
                      ? "registred softwares "
                      : "softwares registrados "}
                  </span>
                </li>
              </ul>
            </div>

            <div className="about-content">
              <p className="about-lead">
                {isEnglish
                  ? "Full stack developer turning ideas into clear, functional digital products."
                  : "Desenvolvedor full stack que transforma ideias em produtos digitais claros e funcionais."}
              </p>
              <p className="about-text">
                {isEnglish
                  ? "I like to understand the problem before writing code. From the first sketch to the published application, I combine thoughtful interfaces, sustainable code and experiences that make sense to the people using them."
                  : "Gosto de entender o problema antes de escrever código. Do primeiro rascunho à aplicação publicada, trabalho para unir boas decisões de interface, código sustentável e uma experiência que faça sentido para quem está do outro lado da tela."}
              </p>
              <p className="about-text">
                {isEnglish
                  ? "I started freelancing in 2023, then joined Digital Boost's product team, and I keep working with clients while studying Systems Analysis and Development at Universidade Potiguar, graduating in August 2027. That is where I built CIS UNP, a clinical management system registered with INPI."
                  : "Comecei em 2023 como freelancer, passei pelo time de produto da Digital Boost e sigo atendendo clientes enquanto curso Análise e Desenvolvimento de Sistemas na Universidade Potiguar, com formatura prevista para agosto de 2027. Foi lá que desenvolvi o CIS UNP, um sistema de gestão clínica registrado no INPI."}
              </p>
              <p className="about-text">
                {isEnglish
                  ? "Day to day I work with React, Node.js and TypeScript, and I care about the details that make a difference: performance, accessibility and interfaces with personality, like the three.js animation that opens this portfolio."
                  : "No dia a dia trabalho com React, Node.js e TypeScript, e gosto de cuidar dos detalhes que fazem diferença: performance, acessibilidade e interfaces com personalidade, como a animação em three.js que abre este portfólio."}
              </p>
            </div>
          </div>

          <div className="about-detail-grid about-reveal about-reveal-delayed">
            <section
              className="about-block experience-block"
              id="experiencia"
              data-about-section="experiencia"
            >
              <div className="block-heading">
                <p className="section-label">
                  {isEnglish
                    ? "PROFESSIONAL EXPERIENCE"
                    : "EXPERIÊNCIA PROFISSIONAL"}
                </p>
              </div>

              <div className="experience-list">
                {experiences.map((experience) => (
                  <article className="experience-item" key={experience.role.pt}>
                    <p className="experience-period">
                      {experience.period[language]}
                    </p>
                    <div>
                      <h4>{experience.role[language]}</h4>
                      {experience.company && (
                        <p className="experience-company">
                          {experience.company}
                        </p>
                      )}
                      <p className="experience-description">
                        {experience.description[language]}
                      </p>
                      {experience.technologies && (
                        <div className="experience-tags">
                          {experience.technologies.map((technology) => (
                            <span key={technology}>{technology}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section
              className="about-block certificates-block"
              id="certificacoes"
              data-about-section="certificacoes"
              aria-label={isEnglish ? "Certificates" : "Certificações"}
            >
              <div className="block-heading certificate-heading">
                <div>
                  <p className="section-label">
                    {isEnglish ? "CERTIFICATES" : "CERTIFICAÇÕES"}
                  </p>
                </div>
                <div className="carousel-controls">
                  <span className="carousel-counter" aria-live="polite">
                    {String(activeCertificate + 1).padStart(2, "0")} /{" "}
                    {String(certificatePages.length).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    onClick={showPreviousCertificate}
                    aria-label={
                      isEnglish
                        ? "Previous certificate"
                        : "Certificação anterior"
                    }
                  >
                    <ChevronLeft size={18} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={showNextCertificate}
                    aria-label={
                      isEnglish ? "Next certificate" : "Próxima certificação"
                    }
                  >
                    <ChevronRight size={18} aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="certificate-viewport">
                <div
                  className="certificate-track"
                  style={{
                    transform: `translateX(-${activeCertificate * 100}%)`,
                  }}
                >
                  {certificatePages.map((page, pageIndex) => (
                    <div className="certificate-page" key={pageIndex}>
                      {page.map((certificate) => (
                        <article
                          className="certificate-card"
                          key={certificate.title}
                        >
                          <a
                            className="certificate-image"
                            href={`/certificados/${encodeURIComponent(certificate.file)}`}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={
                              isEnglish
                                ? `Open ${certificateTitle(certificate.title, isEnglish)}`
                                : `Ampliar e abrir ${certificate.title}`
                            }
                          >
                            <img
                              src={`/certificado-previews/${encodeURIComponent(certificate.file.replace(/\.pdf$/i, ".webp"))}`}
                              alt={
                                isEnglish
                                  ? `First page of ${certificateTitle(certificate.title, isEnglish)}`
                                  : `Primeira página do certificado ${certificate.title}`
                              }
                              loading="lazy"
                              decoding="async"
                            />
                          </a>
                          <h4>
                            {certificateTitle(certificate.title, isEnglish)}
                          </h4>
                          <p>{certificate.issuer}</p>
                          <p>
                            {certificateDuration(
                              certificate.duration,
                              isEnglish,
                            )}
                          </p>
                          <a
                            className="certificate-link"
                            href={`/certificados/${encodeURIComponent(certificate.file)}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {isEnglish
                              ? "Open certificate"
                              : "Abrir certificado"}
                          </a>
                        </article>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <p className="carousel-hint">
                {isEnglish
                  ? "Use the arrows to browse the certificates."
                  : "Use as setas para navegar pelos certificados."}
              </p>
            </section>

            <section
              className="about-block knowledge-block"
              id="conhecimentos"
              data-about-section="conhecimentos"
              aria-label={
                isEnglish ? "Technical expertise" : "Conhecimentos técnicos"
              }
            >
              <div className="block-heading">
                <p className="section-label">
                  {isEnglish ? "TECHNICAL EXPERTISE" : "CONHECIMENTOS TÉCNICOS"}
                </p>
              </div>

              <div
                className="technology-groups"
                aria-label={
                  isEnglish ? "Technologies used" : "Tecnologias utilizadas"
                }
              >
                {technologyGroups.map(
                  ({ label, technologies: group }, groupIndex) => (
                    <div className="technology-group" key={label}>
                      <span className="technology-group-label">
                        {isEnglish
                          ? ["Languages", "Frameworks", "Infra, DB & Tools"][
                              groupIndex
                            ]
                          : label}
                      </span>
                      <div
                        className={`technology-marquee technology-marquee-${groupIndex + 1}`}
                      >
                        <div className="technology-track">
                          {[...group, ...group].map(
                            ({ name, icon: Icon }, index) => (
                              <span
                                className="technology-item"
                                key={`${name}-${index}`}
                                title={name}
                                aria-hidden={
                                  index >= group.length ? "true" : undefined
                                }
                              >
                                <Icon size={28} aria-hidden="true" />
                                <span>{name}</span>
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
