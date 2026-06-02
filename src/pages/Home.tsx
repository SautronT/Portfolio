import "./Home.css"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"
import { translations } from "../i18n/translations"
import { projectsData } from "../data/projects"

function Home() {
  const { language } = useLanguage()
  const t = translations[language]
  const navigate = useNavigate()
  const baseUrl = import.meta.env.BASE_URL
  const resolveAsset = (path: string) => {
    if (/^https?:\/\//.test(path)) return path
    return `${baseUrl}${path.replace(/^\//, "")}`
  }

  const projects = projectsData

  useEffect(() => {
    const header = document.querySelector('.header') as HTMLElement | null
    const setHeaderVar = () => {
      const h = header?.getBoundingClientRect().height ?? 0
      document.documentElement.style.setProperty('--header-height', `${h}px`)
    }

    setHeaderVar()
    window.addEventListener('resize', setHeaderVar)
    return () => window.removeEventListener('resize', setHeaderVar)
  }, [])

  return (
    <>
      <section id="home">
        <video 
          className="video-background" 
          autoPlay 
          muted 
          loop
          playsInline
        >
            <source src={`${baseUrl}video/presvid_opt.mp4`} type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo HTML5.
        </video>
        <div className="video-overlay"></div>
        <h1 dangerouslySetInnerHTML={{ __html: t.greeting }}></h1>
        <h2 dangerouslySetInnerHTML={{ __html: t.job }}></h2>
        <div className="separator"></div>
        <p className="about-me" dangerouslySetInnerHTML={{ __html: t.aboutme }}></p>
      </section>
      
      <section id="projects" className="projects-section">
        <h3>{t.projectsTitle}</h3>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card" onClick={() => navigate(`/project/${project.id}`)}>
              <div className="project-image" style={{ backgroundImage: `url(${resolveAsset((project as any).capsuleImage)})` }}></div>
              <div className="project-overlay">
                <h4>{(t as any)[project.titleKey]}</h4>
                <p>{(t as any)[(project as any).descCardKey]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="about-section">
        <h3>{t.about}</h3>
        <p className="about-section-text" dangerouslySetInnerHTML={{ __html: (t as any).aboutRecruiter }}></p>
      </section>
    </>
  )
}

export default Home
