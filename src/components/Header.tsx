import "./Header.css"
import { useLanguage } from "../context/LanguageContext"
import { translations } from "../i18n/translations"

function Header() {
  const { language, toggleLanguage } = useLanguage()
  const t = translations[language]

  return (
    <header className="header">
      <div className="logo-section">
        <div className="logo">
          <img src="/TomoCapsule.png" alt="Tom Sautron logo" className="site-logo" />
          <span className="site-title">Tom Sautron</span>
        </div>
        <button className="language-btn" onClick={toggleLanguage} title="Toggle language">
          <img 
            src={language === "fr" ? "/flags/en.png" :"/flags/fr2.png"} 
            alt={language === "fr" ? "English" : "Français"}
          />
        </button>
      </div>

      <nav className="nav">
        <a href="#home">{t.home}</a>
        <a href="#projects">{t.projects}</a>
        <a href="#about">{t.about}</a>
        <a href="#contact">{t.contact}</a>
      </nav>
    </header>
  )
}

export default Header
