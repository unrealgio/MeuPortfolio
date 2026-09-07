import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = window.localStorage.getItem("portfolio-language");
    return savedLanguage === "en" ? "en" : "pt";
  });

  useEffect(() => {
    window.localStorage.setItem("portfolio-language", language);
    document.documentElement.lang = language === "en" ? "en" : "pt-BR";
  }, [language]);

  function toggleLanguage() {
    setLanguage((current) => (current === "pt" ? "en" : "pt"));
  }

  return (
    <LanguageContext.Provider
      value={{ language, isEnglish: language === "en", toggleLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
