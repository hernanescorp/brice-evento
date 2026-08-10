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
            <p className="eyebrow">Servicios para celebraciones</p>
            <h2>Arte en vivo que acompana el momento.</h2>
          </div>

          <Link className="text-link" to="/contacto">
            Pedir disponibilidad
          </Link>
        </div>

        <div className="event-services">
          <article>
            <span>01</span>
            <h3>Bodas</h3>
            <p>
              Pintura en directo de la ceremonia, el coctel, el baile o una
              escena especial elegida por la pareja.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Invitados</h3>
            <p>
              Pequenos retratos o ilustraciones rapidas para que cada persona
              se lleve un recuerdo hecho a mano.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Eventos privados</h3>
            <p>
              Cumpleanos, aniversarios, fiestas familiares o eventos de marca
              con una intervencion artistica cercana.
            </p>
          </article>
        </div>
      </section>

      <section className="catalog-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Portfolio</p>
            <h2>Una muestra del estilo de Miriam.</h2>
          </div>

          <Link className="text-link" to="/obras">
            Ver portfolio
          </Link>
        </div>

        <ArtworkGrid artworks={artworks} limit={3} />
      </section>

      <section className="shop-links">
        <Link to="/contacto">
          <span>Reserva</span>
          <strong>Consulta si tu fecha esta disponible</strong>
        </Link>
        <Link to="/encargos">
          <span>Experiencia</span>
          <strong>Pintura en vivo durante la celebracion</strong>
        </Link>
        <Link to="/obras">
          <span>Portfolio</span>
          <strong>Color, detalle y sensibilidad para inspirarte</strong>
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
        <h1>Obras y estilo</h1>
        <p>
          Una seleccion visual para conocer el trazo, el color y la forma de
          mirar de Miriam antes de llevar su pintura a tu evento.
        </p>
      </div>

      <ArtworkGrid artworks={artworks} />
    </section>
  );
}

function AboutPage() {
  return (
    <section className="page-section about-page">
      <div className="large-placeholder artwork-placeholder artwork-placeholder-green">
        <span>Miriam pintando en directo</span>
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
        <p className="eyebrow">Como funciona</p>
        <h1>Pintura en directo para tu evento</h1>
        <p>
          El servicio se adapta al tipo de celebracion, al espacio y al ritmo
          del dia. La obra se empieza durante el evento y puede terminarse con
          los ultimos detalles en estudio si el formato lo necesita.
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
