import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import { translations } from "../i18n/translations"
import { projectsData } from "../data/projects"
import "./ProjectDetail.css"


function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { language } = useLanguage()
  const t = translations[language]
  const [scrollY, setScrollY] = useState(0)
  const baseUrl = import.meta.env.BASE_URL
  const resolveAsset = (path: string) => {
    if (/^https?:\/\//.test(path)) return path
    return `${baseUrl}${path.replace(/^\//, "")}`
  }
  const smallProjects = language === "fr"
    ? [
        {
          image: "/Images/small_proj/castle.png",
          title: "CastleMania",
          description: "Petit projet pour prendre un peu mieux en main la 3D sur Unity, tout en visant à allier énigmes et combats dans un petit niveau arcade.",
          tags: ["Apprentissage", "Unity"]
        },
        {
          image: "/Images/small_proj/ben.png",
          title: "Beni's Birthday",
          description: "Projet de game jam réalisé en une journée : le personnage doit s'adapter au terrain pour transporter un cadeau. J'y ai notamment appris la gestion des shaders pour donner un effet de pixellisation en 3D.",
          tags: ["GameJam", "Godot"]
        },
        {
          image: "/Images/small_proj/jcg.png",
          title: "Jump Charge and Goal",
          description: "Jeu compétitif à deux joueurs, conçu et développé pendant la Game Jam de 48h organisée par EFREI Paris. Le but est de marquer des points en visant les cibles de l'adversaire tout en utilisant différentes stratégies pour prendre l'avantage.",
          tags: ["GameJam", "Unity", "GameJamWinner 🏆"]
        },
        {
          image: "/Images/small_proj/stick.jpg",
          title: "Stick Head Bump",
          description: "Jeu local 1v1 très simple à faire entre amis, sans limite de score. Ce projet m'a surtout servi à tester le multijoueur local et les systèmes de ragdoll sur Unity.",
          tags: ["Apprentissage", "Unity"]
        }
      ]
    : [
        {
          image: "/Images/small_proj/castle.png",
          title: "CastleMania",
          description: "Small levels, simple puzzles, escape the dungeon! This project was made to improve my 3D Unity skills while combining puzzles and combat in a compact arcade level.",
          tags: ["Apprentissage", "Unity"]
        },
        {
          image: "/Images/small_proj/ben.png",
          title: "Beni's Birthday",
          description: "A one-day game jam project where the character must adapt to the terrain to carry a gift. I notably learned shader workflows to create a 3D pixelization effect.",
          tags: ["GameJam", "Godot"]
        },
        {
          image: "/Images/small_proj/jcg.png",
          title: "Jump Charge and Goal",
          description: "Jump, Charge & Goal is a competitive two-player game, designed and developed during the 48-hour Game Jam organized by EFREI Paris. Score points by hitting your opponent's targets while using different strategies to gain the upper hand.",
          tags: ["GameJam", "Unity", "GameJamWinner 🏆"]
        },
        {
          image: "/Images/small_proj/stick.jpg",
          title: "Stick Head Bump",
          description: "This is a simple local 1v1 multiplayer game to play with a friend. There is no score limit, so you can keep bumping your opponent. Made to test local multiplayer and ragdoll systems.",
          tags: ["Apprentissage", "Unity"]
        }
      ]

  const getTagClass = (tag: string) =>
    tag
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

  const project = projectsData.find(p => p.id === parseInt(id || '0'))
  const carouselImages = (project as any)?.carouselImages ?? []
  const projectNav = (
    <nav className="project-floating-nav" aria-label="Project page navigation">
      <a href={`${baseUrl}#home`}>{(t as any).home}</a>
      <a href={`${baseUrl}#projects`}>{(t as any).projects}</a>
      <a href={`${baseUrl}#about`}>{(t as any).about}</a>
      <a href={`${baseUrl}#contact`}>{(t as any).contact}</a>
    </nav>
  )

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!project) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#0f172a', 
        color: 'white', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        {projectNav}
        <h1>Project not found</h1>
        <button className="back-home" onClick={() => navigate('/')}>{(t as any).backToHome}</button>
      </div>
    )
  }

  if (project.titleKey === 'project1Title') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#000022', color: 'white', position: 'relative' }}>
        {projectNav}
        {/* Parallax layers */}
        <div className="parallax-layer parallax-layer-1" style={{
          position: 'absolute',
          left: 0,
          width: '100%',
          height: 'calc(100vw * 1069 / 2500)',
          backgroundImage: `url(${resolveAsset((project as any).parallax1)})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          transform: `translateY(${scrollY * 0.35}px)`,
          zIndex: 3
        }}></div>
        <div className="parallax-layer parallax-layer-2" style={{
          position: 'absolute',
          left: 0,
          width: '100%',
          height: 'calc(100vw * 1069 / 2500)',
          backgroundImage: `url(${resolveAsset((project as any).parallax2)})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          opacity: 0.7,
          transform: `translateY(${scrollY * 0.3}px)`,
          zIndex: 2
        }}></div>
        <div className="parallax-layer parallax-layer-3" style={{
          position: 'absolute',
          left: 0,
          width: '100%',
          height: 'calc(100vw * 1069 / 2500)',
          backgroundImage: `url(${resolveAsset((project as any).parallax3)})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          opacity: 0.5,
          transform: `translateY(${scrollY * 0.1}px)`,
          zIndex: 1
        }}></div>
        
        {/* Content */}
        <div className="project-detail-content" style={{ 
          position: 'relative', 
          zIndex: 10, 
          padding: '2rem', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginTop: 'calc(75vw * 1069 / 2500)',
        }}>
          <button className="back-home" onClick={() => navigate('/')}>{(t as any).backToHome}</button>
          <h1 style={{ fontSize: 'clamp(1.75rem,3.5vw,3rem)', marginBottom: '1rem', color: '#be0202' }}>{(t as any)[project.titleKey]}</h1>
          <p style={{ fontSize: 'clamp(0.75rem,1vw,1.15rem)', textAlign: 'center', maxWidth: '80ch' }} dangerouslySetInnerHTML={{ __html: (t as any)[(project as any).descDetailKey] }} />

          {/* Replace carousel with a 2x2 grid of 4 images */}
          {carouselImages.length > 0 && (
            <div className="grid-2x2" style={{ width: '81.25ch', maxWidth: '100%', marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
              {Array.from({ length: 4 }).map((_, i) => {
                const idx = i % carouselImages.length
                return (
                  <div key={i} className="grid-item" style={{ width: '100%', position: 'relative', paddingTop: '56.25%', overflow: 'hidden', borderRadius: '8px', background: '#000' }}>
                    <img src={resolveAsset(carouselImages[idx])} alt={`grid-${idx}`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                )
              })}
            </div>
          )}
          {/* Itch.io embed widget */}
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
            <iframe
              title="Echoes itch.io embed"
              frameBorder="0"
              src="https://itch.io/embed/2290809?bg_color=151419&fg_color=e5dae7"
              width="552"
              height="167"
              allowTransparency={true}
              style={{ maxWidth: '100%', borderRadius: '0px', border: 'none', outline: 'none', boxShadow: 'none', background: 'transparent' }}
              >
              <a href="https://wisebearhut.itch.io/echoes">Echoes by Tomo</a>
            </iframe>
          </div>
        </div>

      </div>
    )
  } else if (project.titleKey === 'project2Title') {
    return (
      <div style={{ 
        minHeight: '100vh', 
        color: 'white', 
        padding: '2rem',
        backgroundImage: `url('${resolveAsset('/Images/woodTexture.png')}')`,
        backgroundRepeat: 'repeat',
        backgroundPosition: 'top left',
        backgroundSize: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {projectNav}
        <img src={resolveAsset('/Images/Hands.png')} alt="hands-left" style={{ position: 'absolute', top: 0, left: '15%', transform: 'scale(-1, -1)', width: '15vw', maxWidth: '160px', zIndex: 2, pointerEvents: 'none' }} />
        <img src={resolveAsset('/Images/Hands.png')} alt="hands-right" style={{ position: 'absolute', top: 0, right: '15%', transform: 'scaleY(-1)', width: '15vw', maxWidth: '160px', zIndex: 2, pointerEvents: 'none' }} />
        <button className="back-home" onClick={() => navigate('/')} style={{ marginBottom: '1rem' }}>{(t as any).backToHome}</button>
        <div style={{ width: 'min(80ch, 100%)', padding: '2rem', borderRadius: '10px', textAlign: 'center', transform: 'translateY(4vh)' }}>
          <h1 style={{ fontSize: 'clamp(1.75rem,3.5vw,3rem)', marginBottom: '1rem', color: '#f59e0b' }}>{(t as any)[project.titleKey]}</h1>
          <p style={{ fontSize: 'clamp(0.75rem,1vw,1.15rem)', textAlign: 'center', maxWidth: '80ch' }} dangerouslySetInnerHTML={{ __html: (t as any)[(project as any).descDetailKey] }} />

          {/* GIF, descriptive text, then GIF (using gif_oldf_1 for both) */}
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <img src={resolveAsset('/video/gif_oldf_1.gif')} alt="gif-1" style={{ width: '90%', maxWidth: '520px', borderRadius: '8px' }} />
            <p style={{ fontSize: 'clamp(0.75rem,1vw,1.15rem)', textAlign: 'center', maxWidth: '80ch' }} dangerouslySetInnerHTML={{ __html: (t as any).project2ExtraDesc }} />
            <img src={resolveAsset('/video/gif_oldf_1.gif')} alt="gif-2" style={{ width: '90%', maxWidth: '520px', borderRadius: '8px' }} />
          </div>
        </div>
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
          <iframe
            title="An Old Fashioned, Please itch.io embed"
            frameBorder="0"
            src="https://itch.io/embed/3781480?bg_color=552305&fg_color=f59e0b&link_color=8d8d8d"
            width="552"
            height="167"
            allowTransparency={true}
            style={{ maxWidth: '100%', borderRadius: '0px', border: 'none', outline: 'none', boxShadow: 'none', background: 'transparent' }}
          >
            <a href="https://wisebearhut.itch.io/an-old-fashioned-please">An Old Fashioned, Please. by Tomo</a>
          </iframe>
        </div>

      </div>
    )
  } else if (project.titleKey === 'project3Title') {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#4e4e4e',
        color: '#111827',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {projectNav}
        <div style={{ width: '100%', height: '55vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginTop: '2rem', marginBottom: '1rem' }}>
          <img src={resolveAsset('/Images/tdf_banner.jpg')} alt="tdf banner" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <div style={{ width: 'min(80ch, 100%)', padding: '2rem' }}>
          <button className="back-home" onClick={() => navigate('/')} style={{ marginBottom: '1rem' }}>{(t as any).backToHome}</button>
          <h1 style={{ fontSize: 'clamp(1.75rem,3.5vw,3rem)', marginBottom: '1rem', color: '#f59e0b', textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: (t as any)[project.titleKey] }}></h1>
          <p style={{ fontSize: 'clamp(0.85rem,1.05vw,1.05rem)', textAlign: 'center', maxWidth: '80ch', color: 'white' }} dangerouslySetInnerHTML={{ __html: (t as any)[(project as any).descDetailKey] }} />

          <div className="tdf-gallery">
            <img src={resolveAsset('/Images/tdf1.jpg')} alt="tdf1" className="tdf-img" />
            <img src={resolveAsset('/Images/tdf2.jpg')} alt="tdf2" className="tdf-img" />
            <p className="tdf-extra" dangerouslySetInnerHTML={{ __html: (t as any).project3ExtraDesc }}></p>
          </div>
          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center'}}>
            <iframe src="https://store.steampowered.com/widget/2511320/" frameBorder="0" width="646" height="190"></iframe>
          </div>
        </div>
      </div>
    )
  } else if (project.id === 4) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {projectNav}
        <div style={{ width: '100%', height: '55vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginTop: '2rem', marginBottom: '1rem' }}>
          <img src={resolveAsset((project as any).capsuleImage)} alt="project banner" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <div style={{ width: 'min(80ch, 100%)', padding: '2rem' }}>
          <button className="back-home" onClick={() => navigate('/')} style={{ marginBottom: '1rem' }}>{(t as any).backToHome}</button>
          <h1 style={{ fontSize: 'clamp(1.75rem,3.5vw,3rem)', marginBottom: '1rem', color: '#be0202', textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: (t as any)[project.titleKey] }}></h1>
          <p style={{ fontSize: 'clamp(0.85rem,1.05vw,1.05rem)', textAlign: 'center', maxWidth: '80ch', color: 'white' }} dangerouslySetInnerHTML={{ __html: (t as any)[(project as any).descDetailKey] }} />

          <div className="small-projects-section">
            {smallProjects.map((item, index) => (
              <article
                key={item.image}
                className={`small-project-row ${index % 2 === 1 ? "is-reversed" : ""}`}
              >
                <div className="small-project-text">
                  <h3>{item.title}</h3>
                  <div className="small-project-tags">
                    {item.tags.map((tag) => (
                      <span
                        key={`${item.image}-${tag}`}
                        className={`small-project-tag small-project-tag--${getTagClass(tag)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p>{item.description}</p>
                </div>
                <div className="small-project-media">
                  <img src={resolveAsset(item.image)} alt={item.title} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#0f172a', 
        color: 'white', 
        padding: '2rem', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}>
        {projectNav}
        <button className="back-home" onClick={() => navigate('/')}>{(t as any).backToHome}</button>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{(t as any)[project.titleKey]}</h1>
        <p style={{ fontSize: '1.2rem', textAlign: 'center', maxWidth: '600px' }} dangerouslySetInnerHTML={{ __html: (t as any)[(project as any).descDetailKey] }} />
        <img src={resolveAsset((project as any).capsuleImage)} alt={(t as any)[project.titleKey]} style={{ 
          width: '400px', 
          height: '400px', 
          objectFit: 'cover', 
          borderRadius: '8px', 
          marginBottom: '1rem' 
        }} />
        
      </div>
    )
  }
}
export default ProjectDetail