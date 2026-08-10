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
            <p className="eyebrow">Que puedes contratar</p>
            <h2>Una obra pintada para recordar el dia.</h2>
          </div>

          <Link className="text-link" to="/contacto">
            Consultar fecha
          </Link>
        </div>

        <div className="event-services">
          <article>
            <span>01</span>
            <h3>La escena</h3>
            <p>
              Elegimos el momento que quieres conservar: ceremonia, coctel,
              primer baile, pareja o ambiente de la celebracion.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>El evento</h3>
            <p>
              Miriam pinta durante la boda para que el proceso tambien forme
              parte de la experiencia de los invitados.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>La obra</h3>
            <p>
              Te llevas una pieza final hecha a mano, personal y conectada con
              lo que paso ese dia.
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
        <p className="eyebrow">Eventos</p>
        <h1>Un servicio pensado para bodas.</h1>
        <p>
          La propuesta es sencilla: Miriam asiste a la celebracion, pinta una
          escena acordada y convierte el momento en una obra original.
        </p>
      </div>

      <div className="process-grid">
        <article>
          <span>01</span>
          <h2>Fecha y lugar</h2>
          <p>Cuentales la fecha, ciudad, horario y tipo de celebracion.</p>
        </article>

        <article>
          <span>02</span>
          <h2>Escena elegida</h2>
          <p>Definimos que momento se pintara y el formato de la obra.</p>
        </article>

        <article>
          <span>03</span>
          <h2>Pintura en vivo</h2>
          <p>Miriam trabaja en el evento para crear una experiencia visible.</p>
        </article>

        <article>
          <span>04</span>
          <h2>Recuerdo final</h2>
          <p>La pieza queda como memoria artistica de ese dia especial.</p>
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
