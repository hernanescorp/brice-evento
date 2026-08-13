import { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Hero from "./components/Hero";
import ArtworkGrid from "./components/ArtworkGrid";
import Footer from "./components/Footer";
import { artworks } from "./data/artworks";

const services = [
  {
    number: "01",
    title: "Live Art",
    summary:
      "Ilustraciones hechas en directo para que cada persona se lleve un detalle unico del evento.",
    details: [
      "El Live Art, o Arte en Vivo, es un servicio de ilustracion en directo que consiste en realizar acuarelas rapidas y con poco detalle de los invitados de tu boda o evento, captando su esencia con pocas pinceladas empleando alrededor de cinco minutos por persona.",
      "Habla con Miriam para contarle cuando y donde sera tu evento, y la cantidad de invitados que asistiran, para que pueda recomendarte el tiempo de servicio mas adecuado para ti.",
    ],
    portfolioLabel: "Ver ejemplo de Live Art",
    portfolioTo: "/obras#recuerdo-familiar-a4",
  },
  {
    number: "02",
    title: "Una obra pintada de los novios",
    summary:
      "Una pintura original de la pareja, realizada en directo como recuerdo central de la boda.",
    details: [
      "Una opcion ideal si eres amigo/a o familiar de los novios y quieres sorprenderlos con un regalo unico que inmortalice una escena de su dia tan especial.",
      "Miriam realiza fotografias de los novios durante la ceremonia para pintar despues una obra con acrilico sobre lienzo, inmortalizando ese instante de amor y felicidad que podran atesorar como un recuerdo.",
      "Contacta con Miriam para acordar el tamano ideal.",
    ],
    portfolioLabel: "Ver ejemplo de lienzo",
    portfolioTo: "/obras#boda-en-vivo",
  },
  {
    number: "03",
    title: "Marcasitios",
    summary:
      "Ilustraciones realizadas previamente para indicar el sitio de los invitados en el banquete.",
    details: [
      "Las ilustraciones en acuarela son unas piezas originales para decorar las mesas del banquete de tu boda y que los invitados encuentren su sitio, pudiendo llevarse su ilustracion como recuerdo de ese dia.",
      "El estilo de estas acuarelas es sencillo, reflejando la esencia de cada persona en pequenas laminas con poco detalle.",
      "Si quieres tus marcasitios, cuentale a Miriam cuantos invitados quieres ilustrar y tambien la fecha y el lugar de la boda, y ella podra asesorarte.",
    ],
    portfolioLabel: "Ver ejemplo de marcasitios",
    portfolioTo: "/obras#invitada-40x30",
  },
  {
    number: "04",
    title: "Encargos personalizados",
    summary: "Una ilustracion o pintura a tu medida.",
    details: [
      "Ponte en contacto con Miriam para explicarle que idea tienes y que ella pueda asesorarte.",
    ],
    portfolioLabel: "Ver portfolio general",
    portfolioTo: "/obras",
    emailCta: true,
  },
];

const reviews = [
  {
    quote:
      "El apartado queda preparado para anadir aqui una resena real de Google o de una pareja.",
    author: "Resena pendiente",
  },
  {
    quote:
      "Cuando Miriam tenga ficha de Google Business, se puede enlazar para que las parejas dejen su opinion.",
    author: "Google Reviews",
  },
  {
    quote:
      "Tambien se pueden mostrar testimonios manuales si no se quiere depender de un widget externo.",
    author: "Testimonio web",
  },
];

function ServiceCards() {
  return (
    <div className="event-services">
      {services.map((service) => (
        <details className="service-card" key={service.number}>
          <summary>
            <span>{service.number}</span>
            <h3>{service.title}</h3>
            <p>{service.summary}</p>
          </summary>

          <div className="service-details">
            {service.details.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <div className="service-actions">
              {service.emailCta ? (
                <a className="button button-primary" href="mailto:correo-pendiente@miriartstudio.com">
                  Escribir email
                </a>
              ) : (
                <Link className="button button-primary" to="/contacto#formulario">
                  Pedir informacion
                </Link>
              )}

              <Link className="text-link" to={service.portfolioTo}>
                {service.portfolioLabel}
              </Link>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}

function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    });
  }, [hash, pathname]);

  return null;
}

function HomePage() {
  return (
    <>
      <Hero />

      <section className="catalog-section section-featured">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Servicios</p>
            <h2>Un recuerdo para los invitados.</h2>
          </div>

          <Link className="text-link" to="/contacto">
            Consultar fecha
          </Link>
        </div>

        <ServiceCards />
      </section>

      <section className="location-band">
        <p className="eyebrow">Bizkaia y desplazamientos</p>
        <h2>Ilustradora de bodas y eventos con sede en Bizkaia.</h2>
        <p>
          Miriart Studio tiene su punto de partida en Bizkaia y trabaja en
          celebraciones en Bilbao, el Pais Vasco y otros lugares de Espana. Si
          tu boda se celebra fuera de Bizkaia, Miriam puede desplazarse para
          acompanarte alli donde tenga lugar vuestro dia.
        </p>
      </section>

      <section className="catalog-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Bodas ya pintadas</p>
            <h2>Cuatro ejemplos reales para imaginar la tuya.</h2>
          </div>

          <Link className="text-link" to="/obras">
            Ver las 4 obras
          </Link>
        </div>

        <ArtworkGrid artworks={artworks} />
      </section>

      <section className="catalog-section reviews-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Resenas</p>
            <h2>Opiniones de parejas y personas que ya han confiado en Miriam.</h2>
          </div>

          <a className="text-link" href="#" aria-label="Ver resenas en Google">
            Ver en Google
          </a>
        </div>

        <div className="reviews-grid">
          {reviews.map((review) => (
            <article key={review.author}>
              <p>{review.quote}</p>
              <strong>{review.author}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div>
          <p className="eyebrow">Reservas</p>
          <h2>Si ya tienes fecha, lo importante es comprobar disponibilidad.</h2>
        </div>

        <Link className="button button-primary" to="/contacto">
          Escribir a Miriam
        </Link>
      </section>
    </>
  );
}

function WorksPage() {
  return (
    <section className="page-section">
      <div className="page-header">
        <p className="eyebrow">Portfolio</p>
        <h1>Bodas pintadas</h1>
        <p>
          Una galeria breve con obras realizadas para bodas, Live Art,
          marcasitios y lienzos. La web queda preparada para crecer cuando
          tengamos mas fotos reales de cada servicio.
        </p>
      </div>

      <ArtworkGrid artworks={artworks} />
    </section>
  );
}

function AboutPage() {
  return (
    <section className="page-section about-page">
      <div className="about-photo">
        <img src="/images/miriam-hero.jpg" alt="Miriam junto a varias obras" />
      </div>

      <div className="about-copy">
        <p className="eyebrow">Sobre mi</p>
        <h1>Miriam, artista detras de Miriart Studio</h1>

        <p>
          El arte siempre ha formado parte de la vida de Miriam desde su
          infancia, convirtiendose con el tiempo en una forma de expresion y en
          parte de su identidad. No hay dia que su madre no la recuerde, en
          todas sus excursiones, llevando consigo un bloc de dibujo y unos
          lapices para pasarse dibujando las horas muertas.
        </p>

        <p>
          Se graduo en Bellas Artes en 2016 y, desde entonces, ha seguido
          desarrollando su estilo y explorando nuevas formas de crear,
          conectando especialmente con el retrato y la figura.
        </p>

        <p>
          Su estudio esta ubicado en Bizkaia, aunque esta disponible para bodas
          y eventos en el Pais Vasco y en otros puntos de Espana.
        </p>
      </div>
    </section>
  );
}

function CommissionsPage() {
  return (
    <section className="page-section">
      <div className="page-header">
        <p className="eyebrow">Servicios</p>
        <h1>Cuatro formas de convertir el momento en arte.</h1>
        <p>
          Puedes elegir Live Art para invitados, una obra pintada de los novios,
          marcasitios ilustrados o un encargo personalizado creado a medida.
        </p>
      </div>

      <ServiceCards />
    </section>
  );
}

function ContactPage() {
  const [formStatus, setFormStatus] = useState("idle");
  const [formMessage, setFormMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload = {
      nombre: String(formData.get("nombre") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      tipoEvento: String(formData.get("tipoEvento") || "").trim(),
      fechaCiudad: String(formData.get("fechaCiudad") || "").trim(),
      servicio: String(formData.get("servicio") || "").trim(),
      mensaje: String(formData.get("mensaje") || "").trim(),
      privacyAccepted: true,
      privacyAcceptedAt: new Date().toISOString(),
    };

    setFormStatus("sending");
    setFormMessage("Enviando consulta...");

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("No se pudo enviar la consulta.");
      }

      event.currentTarget.reset();
      setFormStatus("success");
      setFormMessage("Consulta enviada correctamente. Te contactaremos pronto.");
    } catch {
      setFormStatus("error");
      setFormMessage("No se pudo enviar la consulta. Intentalo de nuevo o escribe por email.");
    }
  }

  return (
    <section className="page-section contact-page">
      <div>
        <p className="eyebrow">Contacto</p>
        <h1>Hablemos de tu evento.</h1>

        <p>
          Envia los detalles principales de la celebracion y Miriam podra
          preparar una propuesta adaptada a la fecha, el lugar y el tipo de
          experiencia que tienes en mente.
        </p>

        <p>
          El estudio esta en Bizkaia, con disponibilidad para desplazamientos a
          bodas y eventos en Bilbao, el Pais Vasco y el resto de Espana.
        </p>
      </div>

      <form id="formulario" className="contact-form" onSubmit={handleSubmit}>
        <label>
          Nombre
          <input name="nombre" type="text" placeholder="Tu nombre" required />
        </label>

        <label>
          Correo electronico
          <input name="email" type="email" placeholder="nombre@correo.com" required />
        </label>

        <label>
          Tipo de evento
          <select name="tipoEvento" defaultValue="" required>
            <option value="" disabled>
              Selecciona una opcion
            </option>
            <option>Boda</option>
            <option>Celebracion privada</option>
            <option>Evento de marca</option>
            <option>Otro evento</option>
          </select>
        </label>

        <label>
          Fecha y ciudad
          <input name="fechaCiudad" type="text" placeholder="Ej. 14/09/2026, Madrid" required />
        </label>

        <label>
          Servicio
          <select name="servicio" defaultValue="">
            <option value="">Todavia no lo tengo claro</option>
            <option>Live Art</option>
            <option>Una obra pintada de los novios</option>
            <option>Marcasitios</option>
            <option>Encargos personalizados</option>
          </select>
        </label>

        <label>
          Mensaje
          <textarea name="mensaje" rows="6" placeholder="Cuentanos que te gustaria pintar..." />
        </label>

        <button className="button button-primary" type="submit" disabled={formStatus === "sending"}>
          {formStatus === "sending" ? "Enviando..." : "Enviar consulta"}
        </button>

        {formMessage ? <small className={`form-status ${formStatus}`}>{formMessage}</small> : null}
      </form>
    </section>
  );
}

function LegalPage({ title }) {
  return (
    <section className="page-section legal-page">
      <p className="eyebrow">Informacion legal</p>
      <h1>{title}</h1>
      <p>
        Contenido legal pendiente de completar con los datos fiscales,
        comerciales y de tratamiento de datos de la titular de la web.
      </p>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/obras" element={<WorksPage />} />
          <Route path="/sobre-mi" element={<AboutPage />} />
          <Route path="/servicios" element={<CommissionsPage />} />
          <Route path="/encargos" element={<CommissionsPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/aviso-legal" element={<LegalPage title="Aviso legal" />} />
          <Route path="/privacidad" element={<LegalPage title="Politica de privacidad" />} />
          <Route path="/cookies" element={<LegalPage title="Politica de cookies" />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
