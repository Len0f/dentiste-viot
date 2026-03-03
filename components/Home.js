import { useState, useEffect, useCallback } from "react";
import styles from "../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClock,
  faPhone,
  faHouseChimney,
  faMicroscope,
  faAward,
  faHandshake,
  faChevronLeft,
  faChevronRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const heroImages = [
  "/images/hero1.jpg",
  "/images/hero2.jpg",
  "/images/hero3.jpg",
];

const soins = [
  {
    id: "implants",
    titre: "Implants dentaires",
    image: "/images/implants.jpg",
    court: "L'implant dentaire est une racine artificielle en titane...",
    long: `L'implant dentaire est une racine artificielle en titane qui vient remplacer une racine dentaire absente ou abîmée. Lorsqu'une dent est manquante, il sert de support à une nouvelle dent. Grâce à des composants personnalisés, adaptés à la morphologie de vos dents, l'implant s'intègre harmonieusement à votre sourire et conserve vos sensations masticatoires. Il permet aussi de préserver votre capital osseux et dentaire existant. Tous les implants posés dans notre cabinet sont fabriqués par le spécialiste français Global D.`,
  },
  {
    id: "facettes",
    titre: "Facettes dentaires",
    image: "/images/facettes.jpg",
    court: "Les facettes dentaires sont de fines couches en céramique...",
    long: `Les facettes dentaires sont de fines couches en céramique pure posées sur les dents. Elles permettent de corriger la couleur, la forme ou la position des dents de façon naturelle et durable. Notre cabinet réalise des facettes entièrement en céramique pour un résultat esthétique optimal et une intégration parfaite à votre sourire.`,
  },
  {
    id: "couronne",
    titre: "Couronne céramique",
    image: "/images/couronne.jpg",
    court:
      "Traitement moderne et confortable, les couronnes constituées entièrement en céramique...",
    long: `Traitement moderne et confortable, les couronnes constituées entièrement en céramique offrent un rendu esthétique exceptionnel. Elles reproduisent fidèlement l'aspect d'une dent naturelle tout en offrant une résistance optimale.`,
  },
  {
    id: "blanchiment",
    titre: "Blanchiment dentaire",
    image: "/images/blanchiment.jpg",
    court:
      "Le blanchiment dentaire permet d'atténuer les colorations de l'émail...",
    long: `Le blanchiment dentaire permet d'atténuer les colorations de l'émail et de la dentine. Réalisé sous contrôle médical, il est sans danger pour vos dents et offre des résultats visibles et durables. Nous proposons des protocoles adaptés à vos besoins, en cabinet ou à domicile avec des gouttières sur mesure.`,
  },
  {
    id: "conservateurs",
    titre: "Soins conservateurs",
    image: "/images/conservateurs.jpg",
    court: "Pour préserver au maximum l'organe dentaire...",
    long: `Pour préserver au maximum l'organe dentaire, nous mettons en œuvre des soins conservateurs de qualité : traitement des caries, soins de canal, obturations esthétiques composites. L'objectif est toujours de conserver votre dent naturelle le plus longtemps possible.`,
  },
];

const equipe = [
  {
    id: "jsviot",
    nom: "Dr Jean-Sébastien Viot",
    role: "Docteur en chirurgie dentaire",
    photo: "/images/viot.jpg",
    details: [
      "Docteur en chirurgie dentaire",
      "Inscription à l'ordre n° 60928",
      "Post-Graduate in Periodontology & Implantology of New York",
      "Attestation universitaire d'implantologie orale",
      "CES de prothèse conjointe",
      "CES d'anatomie-physiologie",
    ],
  },
  {
    id: "bdaubricourt",
    nom: "Dr Blandine Daubricourt",
    role: "Assistante dentaire qualifiée",
    photo: "/images/daubricourt.jpg",
    details: ["...", "...", "..."],
  },
  {
    id: "mdecailloz",
    nom: "Marie Decailloz",
    role: "Assistante dentaire qualifiée et secrétaire médicale",
    photo: "/images/decailloz.jpg",
    details: [
      "Assistante dentaire qualifiée",
      "Aide opératoire en implantologie et chirurgie",
      "En charge de la stérilisation du matériel",
      "Accueil et secrétariat",
    ],
  },
  {
    id: "asarrazin",
    nom: "Aurélie Sarrazin",
    role: "Assistante dentaire qualifiée et secrétaire médicale",
    photo: "/images/sarrazin.jpg",
    details: ["Assistante dentaire qualifiée", "Secrétaire médicale"],
  },
];

/* ─────────────────────────────────────────────
   COMPOSANTS POPUP
───────────────────────────────────────────── */
function Popup({ children, onClose }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.popup}>{children}</div>
    </div>
  );
}

function SoinPopup({ soin, onClose }) {
  return (
    <Popup onClose={onClose}>
      <img className={styles.popupImg} src={soin.image} alt={soin.titre} />
      <div className={styles.popupBody}>
        <h2>{soin.titre}</h2>
        <p>{soin.long}</p>
        <button className={styles.popupClose} onClick={onClose}>
          Fermer
        </button>
      </div>
    </Popup>
  );
}

function EquipePopup({ membre, onClose }) {
  return (
    <Popup onClose={onClose}>
      <div className={styles.equipePopupHeader}>
        <img src={membre.photo} alt={membre.nom} />
        <div>
          <h2>{membre.nom}</h2>
          <p>{membre.role}</p>
        </div>
      </div>
      <div className={styles.popupBody}>
        <ul>
          {membre.details.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
        <button className={styles.popupClose} onClick={onClose}>
          Fermer
        </button>
      </div>
    </Popup>
  );
}

/* ─────────────────────────────────────────────
   COMPOSANT PRINCIPAL
───────────────────────────────────────────── */
export default function Home() {
  const [selectedSoin, setSelectedSoin] = useState(null);
  const [selectedMembre, setSelectedMembre] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(
    () => setCurrentSlide((prev) => (prev + 1) % heroImages.length),
    [],
  );
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length,
    );

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <>
      {/* NAV */}
      <nav className={styles.nav}>
        <a href="#" className={styles.navLogo}>
          <img
            src="/images/logo.png"
            alt="Cabinet Dentaire de Portets"
            className={styles.navLogoImg}
          />
        </a>
        <ul className={styles.navLinks}>
          <li>
            <a href="#soins">Les soins</a>
          </li>
          <li>
            <a href="#equipe">L&apos;équipe</a>
          </li>
          <li>
            <a href="#infos">Infos</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.heroSlider}>
          {heroImages.map((img, i) => (
            <div
              key={i}
              className={`${styles.heroSlide} ${i === currentSlide ? styles.heroSlideActive : ""}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
        </div>
        <div className={styles.heroFade} />
        <div className={styles.heroContent}>
          <h1>
            Cabinet dentaire
            <br />
            de Portets
          </h1>
          <p>
            Des soins dentaires modernes et personnalisés pour un sourire en
            total confiance.
          </p>
          <a
            className={styles.btnRdv}
            href="https://www.doctolib.fr/dentiste/portets/jean-sebastien-viot"
            target="_blank"
            rel="noreferrer"
          >
            Prendre Rendez-vous
          </a>
        </div>
        <div className={styles.heroArrows}>
          <button className={styles.heroArrow} onClick={prevSlide}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className={styles.heroArrow} onClick={nextSlide}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
        <div className={styles.heroDots}>
          {heroImages.map((_, i) => (
            <button
              key={i}
              className={`${styles.heroDot} ${i === currentSlide ? styles.heroDotActive : ""}`}
              onClick={() => setCurrentSlide(i)}
            />
          ))}
        </div>
      </div>

      {/* PRÉSENTATION */}
      <section id="presentation" className={styles.section}>
        <div className={styles.presentation}>
          <h2 className={styles.sectionTitre}>Présentation du cabinet</h2>
          <p>
            Au sein d&apos;un cabinet accueillant, moderne et professionnel, le
            Docteur Jean-Sébastien VIOT propose une expertise avancée en soins
            dentaires, chirurgicaux et prothétiques.
          </p>
          <p>
            Afin de répondre à tous les besoins dans les meilleures conditions,
            nos soins de dentisterie conventionnelle s&apos;accompagnent
            d&apos;un panel de traitements techniques plus approfondis. Selon
            vos attentes, nous pourrons étudier avec vous des thérapeutiques de
            chirurgie implantaire guidée, une pose de couronnes en 100%
            céramique, un traitement d&apos;alignement Invisalign, un
            blanchiment…
          </p>
        </div>
      </section>

      {/* SOINS */}
      <section id="soins" className={styles.soinsSection}>
        <h2 className={styles.sectionTitre}>Nos soins</h2>
        <div className={styles.soinsGrid}>
          {soins.map((s) => (
            <div
              key={s.id}
              className={styles.soinCard}
              onClick={() => setSelectedSoin(s)}
            >
              <img src={s.image} alt={s.titre} />
              <div className={styles.soinCardBody}>
                <h3>{s.titre}</h3>
                <p>{s.court}</p>
                <span className={styles.soinLien}>En savoir plus ›</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* POURQUOI */}
      <section className={styles.pourquoiSection}>
        <h2 className={styles.sectionTitre}>Pourquoi ce cabinet ?</h2>
        <div className={styles.pourquoiGrid}>
          {[
            { texte: "Cabinet moderne et accueillant.", icon: faHouseChimney },
            { texte: "Technologies de pointe.", icon: faMicroscope },
            { texte: "Fabrication française.", icon: faAward },
            { texte: "Équipe à votre écoute.", icon: faHandshake },
          ].map((item, i) => (
            <div key={i} className={styles.pourquoiItem}>
              <FontAwesomeIcon icon={item.icon} className={styles.star} />
              <span>{item.texte}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ÉQUIPE */}
      <section id="equipe" className={styles.equipeSection}>
        <h2 className={styles.sectionTitre}>Notre équipe</h2>
        <div className={styles.equipeList}>
          {equipe.map((m) => (
            <div
              key={m.id}
              className={styles.equipeCard}
              onClick={() => setSelectedMembre(m)}
            >
              <img className={styles.equipePhoto} src={m.photo} alt={m.nom} />
              <div className={styles.equipeInfo}>
                <h3>{m.nom}</h3>
                <p>{m.role}</p>
              </div>
              <span className={styles.equipeLien}>En savoir plus ›</span>
            </div>
          ))}
        </div>
      </section>

      {/* INFOS PRATIQUES */}
      <section id="infos" className={styles.infosSection}>
        <h2 className={styles.sectionTitre}>Infos pratiques</h2>
        <div className={styles.infosGrid}>
          <div className={styles.infosMap}>
            <iframe
              title="Carte GPS"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2836.3!2d-0.6588!3d44.5947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5527e4b6b40df5%3A0x40819a5fd979090!2s4%20Grand%20Rue%2C%2033640%20Portets!5e0!3m2!1sfr!2sfr!4v1620000000000"
              allowFullScreen=""
              loading="lazy"
            />
          </div>
          <div className={styles.infosDetail}>
            <div className={styles.infoItem}>
              <FontAwesomeIcon
                icon={faLocationDot}
                className={styles.infoIcon}
                style={{ color: "#2a6b8f" }}
              />
              <div>
                <strong>Adresse</strong>
                <p>4 Grand-Rue, 33640 Portets</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <FontAwesomeIcon
                icon={faClock}
                className={styles.infoIcon}
                style={{ color: "#2a6b8f" }}
              />
              <div>
                <strong>Horaires</strong>
                <p className={styles.infoHoraires}>Lundi au vendredi</p>
                <p>08h30–12h30 et 13h30–17h00</p>
                <p className={styles.infoNote}>
                  Les consultations se font uniquement sur rendez-vous.
                </p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <FontAwesomeIcon
                icon={faPhone}
                className={styles.infoIcon}
                style={{ color: "#2a6b8f" }}
              />
              <div>
                <strong>Téléphone</strong>
                <p>
                  <a
                    href="tel:0556675128"
                    style={{
                      color: "var(--bleu)",
                      textDecoration: "none",
                      fontWeight: "600",
                    }}
                  >
                    05 56 67 51 28
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={styles.contactSection}>
        <h2>Prendre rendez-vous</h2>
        <p>Consultez nos disponibilités et réservez en ligne</p>
        <div>
          <a
            className={styles.btnDoctolib}
            href="https://www.doctolib.fr/dentiste/portets/jean-sebastien-viot"
            target="_blank"
            rel="noreferrer"
          >
            Doctolib
          </a>
        </div>
        <p className={styles.contactTel}>
          ou appelez-nous au <a href="tel:0556675128">05 56 67 51 28</a>
        </p>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <p>
          © {new Date().getFullYear()} Cabinet Dentaire de Portets — Dr
          Jean-Sébastien Viot
        </p>
      </footer>

      {/* POPUPS */}
      {selectedSoin && (
        <SoinPopup soin={selectedSoin} onClose={() => setSelectedSoin(null)} />
      )}
      {selectedMembre && (
        <EquipePopup
          membre={selectedMembre}
          onClose={() => setSelectedMembre(null)}
        />
      )}
    </>
  );
}
