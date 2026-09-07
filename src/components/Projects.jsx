import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

const projects = (isEnglish) => [
  {
    number: "01",
    name: "CIS UNP",
    image: "/img/CIS.png",
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
    image: "/img/GERENCIADOR%20DE%20TURMAS.jpeg",
    eyebrow: isEnglish
      ? "Training project · Senac RN"
      : "Projeto de formação · Senac RN",
    description: isEnglish
      ? "Web system developed during Senac RN's Full Stack Web Developer course to centralize school management. It supports teacher and student authentication, class organization, grade and attendance tracking, and PDF report cards through an administrative panel."
      : "Sistema web desenvolvido durante o curso Full Stack Web Developer do Senac RN para centralizar a gestão escolar. A plataforma permite cadastrar e autenticar professores e alunos, organizar turmas, controlar notas e frequência e gerar boletins em PDF por meio de um painel administrativo.",
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
              | {isEnglish ? "SELECTED PROJECTS" : "PROJETOS SELECIONADOS"}
            </p>
            <h2 id="projects-title">
              {isEnglish
                ? "Real solutions for real problems."
                : "Soluções reais para problemas reais"}
            </h2>
          </div>
          <p className="projects-intro">
            {isEnglish
              ? "A selection of systems built with product thinking, technical clarity and experiences that work for the people who use them."
              : "Uma seleção de sistemas desenvolvidos com foco em produto, clareza técnica e experiências que funcionam para quem usa."}
          </p>
        </div>

        <div className="projects-list">
          {translatedProjects.map((project) => (
            <article className="project-item" key={project.name}>
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
                <img
                  className="project-image"
                  src={project.image}
                  alt={
                    isEnglish
                      ? `Preview of ${project.name}`
                      : `Prévia do projeto ${project.name}`
                  }
                />
              </a>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
