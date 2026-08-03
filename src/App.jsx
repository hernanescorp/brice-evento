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

      <section className="section section-featured">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selección de obras</p>
            <h2>Una mirada al universo de Miriart</h2>
          </div>

          <Link className="text-link" to="/obras">
            Ver todas las obras
          </Link>
        </div>

        <ArtworkGrid artworks={artworks} limit={6} />
      </section>

      <section className="split-section">
        <div className="split-placeholder placeholder-visual">
          <span>FOTOGRAFÍA DE LA ARTISTA PENDIENTE</span>
        </div>

        <div className="split-content">
          <p className="eyebrow">Sobre la artista</p>
          <h2>Crear desde la sensibilidad y la emoción.</h2>

          <p>
            Este espacio contendrá la presentación breve de Miriam, su forma de
            entender el arte, su trayectoria y aquello que inspira sus obras.
          </p>

          <p>
            Por ahora dejamos preparado el diseño y la estructura para añadir
            más adelante la biografía definitiva.
          </p>

          <Link className="button button-secondary" to="/sobre-mi">
            Descubrir su historia
          </Link>
        </div>
      </section>

      <section className="commission-section">
        <p className="eyebrow">Encargos personalizados</p>
        <h2>Una obra creada especialmente para ti.</h2>

        <p>
          Retratos, ilustraciones y proyectos personalizados. Aquí explicaremos
          el proceso, los formatos disponibles, los plazos y las condiciones.
        </p>

        <Link className="button button-light" to="/encargos">
          Solicitar información
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
          Catálogo provisional. Los nombres, imágenes, técnicas, precios y
          estados se actualizarán con la información definitiva.
        </p>
      </div>

      <ArtworkGrid artworks={artworks} />
    </section>
  );
}

function AboutPage() {
  return (
    <section className="page-section about-page">
      <div className="large-placeholder placeholder-visual">
        <span>FOTOGRAFÍA DE MIRIAM PENDIENTE</span>
      </div>

      <div className="about-copy">
        <p className="eyebrow">Sobre mí</p>
        <h1>Miriam · Artista y creadora de Miriart Studio</h1>

        <p>
          Biografía pendiente. Aquí incluiremos su trayectoria, formación,
          especialidades, exposiciones, proyectos y filosofía artística.
        </p>

        <p>
          También podremos incorporar fotografías del estudio, del proceso de
          creación y de la artista trabajando.
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
          Una sección preparada para explicar los tipos de encargos, el
          proceso, las tarifas orientativas, los tiempos y la entrega.
        </p>
      </div>

      <div className="process-grid">
        <article>
          <span>01</span>
          <h2>Cuéntame tu idea</h2>
          <p>Formulario, correo o contacto directo.</p>
        </article>

        <article>
          <span>02</span>
          <h2>Propuesta</h2>
          <p>Definición del estilo, formato, precio y plazo.</p>
        </article>

        <article>
          <span>03</span>
          <h2>Creación</h2>
          <p>Desarrollo de la pieza y seguimiento del proceso.</p>
        </article>

        <article>
          <span>04</span>
          <h2>Entrega</h2>
          <p>Preparación y envío de la obra terminada.</p>
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
          configurarán cuando tengamos los datos definitivos.
        </p>
      </div>

      <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
        <label>
          Nombre
          <input type="text" placeholder="Tu nombre" />
        </label>

        <label>
          Correo electrónico
          <input type="email" placeholder="nombre@correo.com" />
        </label>

        <label>
          Tipo de consulta
          <select defaultValue="">
            <option value="" disabled>
              Selecciona una opción
            </option>
            <option>Comprar una obra</option>
            <option>Encargo personalizado</option>
            <option>Taller o colaboración</option>
            <option>Otra consulta</option>
          </select>
        </label>

        <label>
          Mensaje
          <textarea rows="6" placeholder="Cuéntanos tu idea..." />
        </label>

        <button className="button button-primary" type="submit">
          Enviar consulta
        </button>

        <small>Formulario visual. El envío se configurará más adelante.</small>
      </form>
    </section>
  );
}

function LegalPage({ title }) {
  return (
    <section className="page-section legal-page">
      <p className="eyebrow">Información legal</p>
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
          <Route
            path="/aviso-legal"
            element={<LegalPage title="Aviso legal" />}
          />
          <Route
            path="/privacidad"
            element={<LegalPage title="Política de privacidad" />}
          />
          <Route
            path="/cookies"
            element={<LegalPage title="Política de cookies" />}
          />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;