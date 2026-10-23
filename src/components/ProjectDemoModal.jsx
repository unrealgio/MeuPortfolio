import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function ProjectDemoModal({ project, onClose }) {
  const { isEnglish } = useLanguage();
  const dialogRef = useRef(null);
  const title = isEnglish
    ? `${project.name} demo`
    : `Demonstração do ${project.name}`;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog.open) dialog.showModal();
  }, []);

  function handleBackdropClick(event) {
    if (event.target === dialogRef.current) dialogRef.current.close();
  }

  return (
    <dialog
      ref={dialogRef}
      className="demo-dialog"
      aria-label={title}
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      <div className="demo-dialog-header">
        <p className="demo-dialog-title">{title}</p>
        <button
          type="button"
          className="demo-dialog-close"
          onClick={() => dialogRef.current.close()}
          aria-label={isEnglish ? "Close demo" : "Fechar demonstração"}
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>
      <video
        src={project.demo}
        poster={project.image}
        controls
        autoPlay
        muted
        playsInline
      />
    </dialog>
  );
}

export default ProjectDemoModal;
