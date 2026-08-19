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

const routeMeta = {
  "/": {
    title: "Miriart Studio | Ilustradora de bodas y eventos en Bizkaia",
    description:
      "Live Art, acuarela en directo, lienzos de novios, marcasitios y encargos personalizados para bodas y eventos desde Bizkaia.",
  },
  "/servicios": {
    title: "Servicios | Miriart Studio",
    description:
      "Servicios artisticos para bodas y eventos: Live Art, lienzos de novios, marcasitios y encargos personalizados.",
  },
  "/encargos": {
    title: "Servicios | Miriart Studio",
    description:
      "Encargos personalizados, acuarelas y pintura a medida para bodas, celebraciones y eventos.",
  },
  "/obras": {
    title: "Portfolio | Miriart Studio",
    description:
      "Galeria de obras de Miriart Studio: bodas pintadas, Live Art, marcasitios y encargos personalizados.",
  },
  "/sobre-mi": {
    title: "Sobre mi | Miriart Studio",
    description:
      "Conoce a Miriam, artista detras de Miriart Studio, ilustradora de bodas y eventos con estudio en Bizkaia.",
  },
  "/contacto": {
    title: "Contacto | Miriart Studio",
    description:
      "Contacta con Miriart Studio para consultar disponibilidad, contar tu idea o pedir informacion para tu boda o evento.",
  },
  "/aviso-legal": {
    title: "Aviso legal | Miriart Studio",
    description: "Informacion legal de la web de Miriart Studio.",
  },
  "/privacidad": {
    title: "Politica de privacidad | Miriart Studio",
    description:
      "Informacion sobre el tratamiento de datos personales en la web de Miriart Studio.",
  },
  "/cookies": {
    title: "Politica de cookies | Miriart Studio",
    description: "Informacion sobre el uso de cookies en la web de Miriart Studio.",
  },
};

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
                <a className="button button-primary" href="mailto:miriart.studio@gmail.com">
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

function SeoMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = routeMeta[pathname] || routeMeta["/"];
    document.title = meta.title;

    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", meta.description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", meta.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", meta.description);
  }, [pathname]);

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
          parte de su identidad. No hay dia que su familia no la recuerde, en
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
      fechaEvento: String(formData.get("fechaEvento") || "").trim(),
      ciudadEvento: String(formData.get("ciudadEvento") || "").trim(),
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

      const result = await response.json().catch(() => null);

      if (!response.ok || result?.ok === false) {
        throw new Error(result?.error || "No se pudo enviar la consulta.");
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
          Fecha
          <input name="fechaEvento" type="date" required />
        </label>

        <label>
          Ciudad
          <input name="ciudadEvento" type="text" placeholder="Ej. Bilbao" required />
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

function PrivacyPage() {
  return (
    <section className="page-section legal-page">
      <p className="eyebrow">Informacion legal</p>
      <h1>Politica de privacidad</h1>

      <div className="legal-content">
        <p>
          En Miriart Studio tratamos los datos personales con cuidado y solo
          para atender las consultas, solicitudes de presupuesto y comunicaciones
          relacionadas con los servicios artisticos ofrecidos en esta web.
        </p>

        <h2>Responsable del tratamiento</h2>
        <p>
          Responsable: Miriart Studio.
          <br />
          Email de contacto:{" "}
          <a href="mailto:miriart.studio@gmail.com">miriart.studio@gmail.com</a>.
          <br />
          Datos identificativos y direccion fiscal: pendientes de completar por
          la titular de la actividad.
        </p>

        <h2>Datos que se recogen</h2>
        <p>
          A traves del formulario de contacto se pueden recoger nombre, correo
          electronico, tipo de evento, fecha, ciudad, servicio solicitado y el
          contenido del mensaje. Tambien se pueden tratar los datos que el
          usuario facilite voluntariamente por email.
        </p>

        <h2>Finalidad</h2>
        <p>
          Los datos se usan para responder consultas, gestionar solicitudes de
          informacion, preparar propuestas o presupuestos y mantener la
          comunicacion necesaria sobre encargos, bodas o eventos.
        </p>

        <h2>Base legal</h2>
        <p>
          La base legal es el consentimiento del usuario al enviar el formulario
          o escribir por email, y la aplicacion de medidas precontractuales
          cuando la consulta tenga relacion con la contratacion de un servicio.
        </p>

        <h2>Conservacion</h2>
        <p>
          Los datos se conservaran durante el tiempo necesario para atender la
          consulta y, si se contrata un servicio, durante los plazos legales
          aplicables a obligaciones administrativas, fiscales o contractuales.
        </p>

        <h2>Destinatarios</h2>
        <p>
          No se cederan datos a terceros salvo obligacion legal o cuando sea
          necesario para prestar el servicio solicitado. La web puede apoyarse en
          proveedores tecnicos de alojamiento, correo electronico o mantenimiento
          que actuen como encargados del tratamiento.
        </p>

        <h2>Derechos</h2>
        <p>
          El usuario puede solicitar el acceso, rectificacion, supresion,
          oposicion, limitacion del tratamiento y portabilidad de sus datos
          escribiendo a{" "}
          <a href="mailto:miriart.studio@gmail.com">miriart.studio@gmail.com</a>.
          Tambien puede presentar una reclamacion ante la Agencia Espanola de
          Proteccion de Datos si considera que sus derechos no han sido
          atendidos correctamente.
        </p>

        <h2>Seguridad</h2>
        <p>
          Se aplicaran medidas tecnicas y organizativas razonables para proteger
          los datos personales frente a accesos no autorizados, perdida,
          alteracion o divulgacion indebida.
        </p>

        <h2>Actualizaciones</h2>
        <p>
          Esta politica puede actualizarse para adaptarse a cambios legales,
          tecnicos o de funcionamiento de la web. Ultima actualizacion: agosto
          de 2026.
        </p>
      </div>
    </section>
  );
}

function CookiesPage() {
  return (
    <section className="page-section legal-page">
      <p className="eyebrow">Informacion legal</p>
      <h1>Politica de cookies</h1>

      <div className="legal-content">
        <p>
          Esta politica explica que son las cookies y como pueden utilizarse en
          la web de Miriart Studio. Actualmente la web no utiliza cookies de
          analitica, publicidad comportamental ni seguimiento comercial.
        </p>

        <h2>Que son las cookies</h2>
        <p>
          Las cookies son pequenos archivos que una pagina web puede guardar en
          el navegador del usuario para recordar informacion tecnica, mantener
          preferencias o medir el uso de la web.
        </p>

        <h2>Cookies utilizadas en esta web</h2>
        <p>
          En este momento, Miriart Studio solo preve el uso de cookies tecnicas
          o elementos similares necesarios para que la web funcione
          correctamente, por ejemplo para cargar la pagina, mantener la seguridad
          o recordar ajustes imprescindibles de navegacion.
        </p>

        <h2>Cookies que no requieren consentimiento</h2>
        <p>
          Las cookies tecnicas necesarias para prestar el servicio solicitado por
          el usuario pueden utilizarse sin solicitar consentimiento previo,
          aunque se informa de ellas en esta politica.
        </p>

        <h2>Cookies de analitica o publicidad</h2>
        <p>
          Actualmente no se instalan cookies de Google Analytics, Meta Pixel,
          TikTok Pixel, publicidad personalizada ni herramientas equivalentes.
          Si en el futuro se incorporan cookies no necesarias, se mostrara un
          banner o panel de configuracion para que el usuario pueda aceptarlas,
          rechazarlas o modificar su eleccion antes de que se instalen.
        </p>

        <h2>Gestion desde el navegador</h2>
        <p>
          El usuario puede bloquear, eliminar o limitar las cookies desde la
          configuracion de su navegador. La desactivacion de cookies tecnicas
          puede afectar al funcionamiento normal de algunas partes de la web.
        </p>

        <h2>Cambios en la politica</h2>
        <p>
          Esta politica puede actualizarse si cambian las herramientas tecnicas
          utilizadas en la web o si se incorporan servicios de medicion,
          publicidad o contenidos de terceros. Ultima actualizacion: agosto de
          2026.
        </p>

        <h2>Contacto</h2>
        <p>
          Para cualquier duda sobre esta politica puedes escribir a{" "}
          <a href="mailto:miriart.studio@gmail.com">miriart.studio@gmail.com</a>.
        </p>
      </div>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <SeoMeta />
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
          <Route path="/privacidad" element={<PrivacyPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
