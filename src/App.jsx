import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Hero from "./components/Hero";
import ArtworkGrid from "./components/ArtworkGrid";
import Footer from "./components/Footer";
import { artworks } from "./data/artworks";

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

        <div className="event-services">
          <article>
            <span>01</span>
            <h3>Un recuerdo para los invitados</h3>
            <p>
              Ilustraciones hechas en directo para que cada persona se lleve un
              detalle unico del evento.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Una obra pintada de los novios</h3>
            <p>
              Una pieza original centrada en la pareja, creada durante la
              celebracion como recuerdo artistico del dia.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Un encargo personalizado</h3>
            <p>
              Una ilustracion o pintura a medida para regalar, decorar o
              conservar una escena especial fuera del evento.
            </p>
          </article>
        </div>
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
          Una galeria breve con obras realizadas para bodas. La web queda
          preparada para crecer cuando tengamos mas fotos reales.
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
          Miriam crea piezas con una mirada luminosa, cercana y emocional. Su
          trabajo encaja especialmente bien en bodas y celebraciones donde el
          recuerdo no solo se fotografia: tambien se pinta.
        </p>

        <p>
          En cada evento observa la escena, el ambiente y los detalles que hacen
          unico el dia para convertirlos en una obra personal y llena de vida.
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
        <h1>Tres formas de convertir el momento en arte.</h1>
        <p>
          Puedes elegir ilustraciones en directo para invitados, una obra
          pintada de los novios o un encargo personalizado creado a medida.
        </p>
      </div>

      <div className="process-grid">
        <article>
          <span>01</span>
          <h2>Un recuerdo para los invitados</h2>
          <p>Ilustraciones pequenas, hechas a mano durante el evento y pensadas como detalle personal.</p>
        </article>

        <article>
          <span>02</span>
          <h2>Una obra pintada de los novios</h2>
          <p>Una pintura original de la pareja, realizada en directo como recuerdo central de la boda.</p>
        </article>

        <article>
          <span>03</span>
          <h2>Un encargo personalizado</h2>
          <p>Una pieza creada por encargo para regalar, decorar o recordar una historia concreta.</p>
        </article>

        <article>
          <span>04</span>
          <h2>Como funciona</h2>
          <p>Se adapta el formato, el tiempo y el estilo segun el tipo de servicio que elijas.</p>
        </article>
      </div>
    </section>
  );
}

function ContactPage() {
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
      </div>

      <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
        <label>
          Nombre
          <input type="text" placeholder="Tu nombre" />
        </label>

        <label>
          Correo electronico
          <input type="email" placeholder="nombre@correo.com" />
        </label>

        <label>
          Tipo de evento
          <select defaultValue="">
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
          <input type="text" placeholder="Ej. 14/09/2026, Madrid" />
        </label>

        <label>
          Mensaje
          <textarea rows="6" placeholder="Cuentanos que te gustaria pintar..." />
        </label>

        <button className="button button-primary" type="submit">
          Enviar consulta
        </button>

        <small>Formulario visual. El envio se configurara mas adelante.</small>
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
