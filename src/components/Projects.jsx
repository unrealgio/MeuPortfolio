import { ArrowUpRight, MessageCircle } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

const projects = (isEnglish) => [
  {
    number: "01",
    name: "CIS UNP",
    image: "/img/cis-unp.webp",
    eyebrow: isEnglish
      ? "Scientific research · INPI registration"
      : "Iniciação científica · Registro INPI",
    description: isEnglish
      ? "Clinical management system developed as scientific research at Universidade Potiguar, organizing appointments, patients, dental records, prescriptions and the routines of the Integrated Health Center. The project is registered with INPI."
      : "Sistema de gestão clínica odontológica desenvolvido como iniciação científica na Universidade Potiguar (UnP), criado para organizar agendamentos, pacientes, prontuários odontológicos, prescrições e rotinas do Centro Integrado de Saúde. O projeto é registrado no INPI.",
    technologies: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "Sequelize",
      "PostgreSQL",
      "JWT",
      "Bcrypt",
      "PDFKit",
      "Jimp",
    ],
    href: "https://github.com/unrealgio/CISUNP",
  },
  {
    number: "02",
    name: "Class Manager",
    image: "/img/class-manager.webp",
    eyebrow: isEnglish
      ? "Training project · Senac RN"
      : "Projeto de formação · Senac RN",
    description: isEnglish
      ? "School management web system built during Senac RN's Fullstack Programming course. Teachers and students get secure sign-up and login with JWT and Bcrypt, and the platform organizes classes, tracks grades and attendance and issues PDF report cards. Teachers have an exclusive admin panel to view classes, edit academic records and check cycles, with an interface designed to simplify the school's routine."
      : "Sistema web de gestão escolar desenvolvido no curso de Programação Fullstack do Senac RN. Professores e alunos têm cadastro e login seguros, com JWT e Bcrypt, e a plataforma organiza turmas, controla notas e frequência e emite boletins em PDF. Os professores contam com um painel administrativo exclusivo para visualizar turmas, editar dados acadêmicos e consultar ciclos, com uma interface pensada para simplificar a rotina da escola.",
    technologies: [
      "JavaScript",
      "React",
      "Node.js",
      "Express",
      "Sequelize",
      "PostgreSQL",
      "JWT",
      "Bcrypt",
      "Axios",
      "CORS",
      "HTML",
      "CSS",
    ],
    href: "https://github.com/unrealgio/Class_Manager",
  },
  {
    number: "03",
    name: "Habithos",
    image: "/img/habithos.webp",
    eyebrow: isEnglish
      ? "Personal project · In development"
      : "Projeto pessoal · Em desenvolvimento",
    inProgress: true,
    description: isEnglish
      ? "A gamified habit app with a stoic theme: every completed habit sculpts your marble statue, and every miss leaves cracks that only consistency can restore. With four virtue archetypes and chained routines, it is also my TypeScript and fullstack architecture lab: a monorepo with shared, tested game rules, JWT authentication and PostgreSQL with Drizzle ORM."
      : "App de hábitos gamificado com tema estoico: cada hábito cumprido esculpe sua estátua de mármore, e cada falha deixa rachaduras que só a constância restaura. Com quatro arquétipos de virtude e rotinas encadeadas, é também meu laboratório de TypeScript e arquitetura fullstack: monorepo com regras de jogo compartilhadas e testadas, autenticação com JWT e PostgreSQL com Drizzle ORM.",
    technologies: [
      "TypeScript",
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Drizzle ORM",
      "Docker",
      "Vitest",
    ],

    href: null,
  },
];

function Projects() {
  const { isEnglish } = useLanguage();
  const translatedProjects = projects(isEnglish);
  return (
    <section
      className="projects-section"
      id="projetos"
      aria-labelledby="projects-title"
    >
      <div className="section-shell">
        <div className="section-intro">
          <div>
            <p className="section-label">
              {isEnglish ? "SELECTED PROJECTS" : "PROJETOS SELECIONADOS"}
            </p>
            <h2 id="projects-title">
              {isEnglish
                ? "Real solutions for real problems."
                : "Soluções reais para problemas reais."}
            </h2>
          </div>
          <p className="projects-intro">
            {isEnglish
              ? "A selection of fullstack systems created for real academic and professional contexts. Each project combines product thinking, reliable architecture and clear interfaces to turn complex routines into practical digital experiences."
              : "Uma seleção de sistemas fullstack criados para contextos acadêmicos e profissionais reais. Cada projeto combina visão de produto, arquitetura confiável e interfaces claras para transformar rotinas complexas em experiências digitais práticas e eficientes."}
          </p>
        </div>

        <div className="projects-list">
          {translatedProjects.map((project) => {
            const image = (
              <img
                className="project-image"
                src={project.image}
                alt={
                  isEnglish
                    ? `Preview of ${project.name}`
                    : `Prévia do projeto ${project.name}`
                }
                loading="lazy"
                decoding="async"
              />
            );

            return (
              <article className="project-item" key={project.name}>
                {project.href ? (
                  <a
                    className="project-image-link"
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={
                      isEnglish
                        ? `Open ${project.name} project`
                        : `Abrir projeto ${project.name}`
                    }
                  >
                    {image}
                  </a>
                ) : (
                  <div className="project-image-link">
                    {image}
                    {project.inProgress && (
                      <span className="project-status">
                        <span
                          className="project-status-dot"
                          aria-hidden="true"
                        />
                        {isEnglish ? "In development" : "Em desenvolvimento"}
                      </span>
                    )}
                  </div>
                )}
                <span className="project-number">{project.number}</span>
                <div className="project-info">
                  {project.eyebrow && (
                    <p className="project-eyebrow">{project.eyebrow}</p>
                  )}
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.technologies.map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </div>
                </div>
                {project.href ? (
                  <a
                    className="project-link"
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={
                      isEnglish
                        ? `Open ${project.name} on GitHub`
                        : `Abrir projeto ${project.name} no GitHub`
                    }
                  >
                    <FaGithub size={18} aria-hidden="true" />
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                ) : (
                  <span className="project-soon">
                    <FaGithub size={14} aria-hidden="true" />
                    {isEnglish
                      ? "Repository coming soon"
                      : "Repositório em breve"}
                  </span>
                )}
              </article>
            );
          })}

          <article className="project-item project-cta">
            <a
              className="project-image-link project-cta-visual"
              href="#contato"
              aria-label={
                isEnglish
                  ? "Go to the contact section"
                  : "Ir para a seção de contato"
              }
            >
              <div className="code-block" aria-hidden="true">
                <p>
                  <span className="purple">const</span>{" "}
                  <span className="blue">nextProject</span> = {"{"}
                </p>
                <p className="indent">
                  <span className="green">client:</span>{" "}
                  <span className="orange">
                    &quot;{isEnglish ? "you" : "você"}&quot;
                  </span>
                  ,
                </p>
                <p className="indent">
                  <span className="green">idea:</span>{" "}
                  <span className="orange">
                    &quot;{isEnglish ? "your idea" : "sua ideia"}&quot;
                  </span>
                  ,
                </p>
                <p className="indent">
                  <span className="green">status:</span>{" "}
                  <span className="yellow">
                    &quot;{isEnglish ? "waiting for you" : "esperando por você"}
                    &quot;
                  </span>
                  ,
                </p>
                <p>
                  {"}"}
                  <span className="project-cta-cursor" />
                </p>
              </div>
            </a>
            <span className="project-number">
              {String(translatedProjects.length + 1).padStart(2, "0")}
            </span>
            <div className="project-info">
              <p className="project-eyebrow">
                {isEnglish
                  ? "Next project · Open for work"
                  : "Próximo projeto · Agenda aberta"}
              </p>
              <h3>
                {isEnglish
                  ? "Your project could be here!"
                  : "Seu projeto pode aparecer aqui!"}
              </h3>
              <p>
                {isEnglish
                  ? "Have an idea, a process that needs to leave the spreadsheet or a product ready to come to life? Let's talk and turn it into the next project on this list, from planning to deployment."
                  : "Tem uma ideia, um processo que precisa sair da planilha ou um produto pronto para ganhar vida? Vamos conversar e transformar isso no próximo projeto desta lista, do planejamento ao deploy."}
              </p>
              <div className="project-tags">
                {(isEnglish
                  ? [
                      "Websites",
                      "Web systems",
                      "Dashboards",
                      "APIs",
                      "Landing pages",
                      "Apps",
                    ]
                  : [
                      "Sites",
                      "Sistemas web",
                      "Dashboards",
                      "APIs",
                      "Landing pages",
                      "Aplicativos",
                    ]
                ).map((service) => (
                  <span key={service}>{service}</span>
                ))}
              </div>
              <a className="resume-link project-cta-button" href="#contato">
                <MessageCircle size={18} aria-hidden="true" />
                <span>{isEnglish ? "Let's talk" : "Vamos conversar"}</span>
              </a>
            </div>
            <a
              className="project-link"
              href="#contato"
              aria-label={
                isEnglish
                  ? "Start a project with me"
                  : "Começar um projeto comigo"
              }
            >
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Projects;
