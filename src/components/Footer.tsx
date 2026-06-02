import "./Footer.css"
import { useLanguage } from "../context/LanguageContext"
import { translations } from "../i18n/translations"

function Footer() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <footer id="contact" className="footer">
      <h3>{t.contact}</h3>
      <div className="contact-actions">
        <a
          className="linkedin-btn"
          href="https://www.linkedin.com/in/tom-sautron/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8.34 17V10.67H6.26V17H8.34M7.3 9.8A1.2 1.2 0 1 0 7.3 7.4A1.2 1.2 0 0 0 7.3 9.8M17.74 17V13.43C17.74 11.52 16.72 10.63 15.37 10.63C14.28 10.63 13.79 11.23 13.52 11.65V10.67H11.44C11.47 11.32 11.44 17 11.44 17H13.52V13.46C13.52 13.27 13.53 13.08 13.59 12.95C13.74 12.56 14.09 12.16 14.69 12.16C15.47 12.16 15.78 12.75 15.78 13.62V17H17.74Z" />
          </svg>
          LinkedIn
        </a>
        <a className="mail-link" href="mailto:tomsautron.pro@gmail.com">tomsautron.pro@gmail.com</a>
      </div>
      <p className="contact-signature">Tom Sautron - 2026</p>
    </footer>
  )
}

export default Footer
