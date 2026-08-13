import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">Pintura en directo para bodas y eventos</p>

        <h1>Miriart Studio</h1>

        <p className="hero-description">
          Miriam convierte tu celebracion en una obra hecha durante el evento:
          momentos, invitados y detalles pintados con una mirada sensible.
          Ilustradora de bodas con sede en Bizkaia y disponible para
          desplazamientos.
        </p>

        <div className="hero-actions">
          <Link className="button button-primary" to="/contacto">
            Consultar disponibilidad
          </Link>

          <Link className="text-link" to="/servicios">
            Ver servicios
          </Link>
        </div>
      </div>

      <div className="hero-feature">
        <div className="featured-artwork hero-media">
          <video
            src="/videos/hero-live-painting.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Miriam pintando una obra en directo"
          />
        </div>

        <div className="featured-caption">
          <span>Live painting</span>
          <strong>Un recuerdo para los invitados</strong>
          <small>Bodas, fiestas privadas y celebraciones especiales</small>
        </div>
      </div>
    </section>
  );
}

export default Hero;
