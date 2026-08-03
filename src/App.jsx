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
            <p className="eyebrow">Original paintings</p>
            <h2>Obras disponibles</h2>
          </div>

          <Link className="text-link" to="/obras">
            Ver todas las obras
          </Link>
        </div>

        <ArtworkGrid artworks={artworks} limit={6} />
      </section>

      <section className="shop-links">
        <Link to="/obras">
          <span>Originales</span>
          <strong>Piezas unicas en papel y tabla</strong>
        </Link>
        <Link to="/obras">
          <span>Prints</span>
          <strong>Ediciones fine art</strong>
        </Link>
        <Link to="/encargos">
          <span>Encargos</span>
          <strong>Retratos y proyectos a medida</strong>
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
        <h1>Obras</h1>
        <p>
          Catalogo provisional con estructura de tienda: originales, prints,
          medidas, tecnica, precio y disponibilidad.
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
        <span>Fotografia de Miriam pendiente</span>
      </div>

      <div className="about-copy">
        <p className="eyebrow">Sobre mi</p>
        <h1>Miriam · Artista y creadora de Miriart Studio</h1>

        <p>
          Biografia pendiente. Aqui incluiremos su trayectoria, formacion,
          especialidades, exposiciones, proyectos y filosofia artistica.
        </p>

        <p>
          Tambien podremos incorporar fotografias del estudio, del proceso de
          creacion y de la artista trabajando.
        </p>
      </div>
    </section>
  );
}

function CommissionsPage() {
  return (
    <section className="page-section">
      <div className="page-header">
        <p className="eyebrow">Proyectos personalizados</p>
        <h1>Encargos</h1>
        <p>
          Una seccion preparada para explicar los tipos de encargos, el proceso,
          las tarifas orientativas, los tiempos y la entrega.
        </p>
      </div>

      <div className="process-grid">
        <article>
          <span>01</span>
          <h2>Cuentame tu idea</h2>
          <p>Formulario, correo o contacto directo.</p>
        </article>

        <article>
          <span>02</span>
          <h2>Propuesta</h2>
          <p>Definicion del estilo, formato, precio y plazo.</p>
        </article>

        <article>
          <span>03</span>
          <h2>Creacion</h2>
          <p>Desarrollo de la pieza y seguimiento del proceso.</p>
        </article>

        <article>
          <span>04</span>
          <h2>Entrega</h2>
          <p>Preparacion y envio de la obra terminada.</p>
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
        <h1>Hablemos de tu idea.</h1>

        <p>
          El correo, WhatsApp, redes sociales y sistema de formulario se
          configuraran cuando tengamos los datos definitivos.
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
          Tipo de consulta
          <select defaultValue="">
            <option value="" disabled>
              Selecciona una opcion
            </option>
            <option>Comprar una obra</option>
            <option>Encargo personalizado</option>
            <option>Taller o colaboracion</option>
            <option>Otra consulta</option>
          </select>
        </label>

        <label>
          Mensaje
          <textarea rows="6" placeholder="Cuentanos tu idea..." />
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
