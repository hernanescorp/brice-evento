import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">Pintura en directo para bodas y eventos</p>

        <h1>Miriart Studio</h1>

        <p className="hero-description">
          Miriam convierte tu celebracion en una obra hecha durante el evento:
          momentos, invitados y detalles pintados con una mirada sensible,
          colorida y muy personal.
        </p>

        <div className="hero-actions">
          <Link className="button button-primary" to="/contacto">
            Consultar disponibilidad
          </Link>

          <Link className="text-link" to="/encargos">
            Ver servicios para eventos
          </Link>
        </div>
      </div>

      <div className="hero-feature">
        <div className="featured-artwork hero-photo">
          <img
            src="/images/miriam-hero.jpg"
            alt="Miriam rodeada de pinturas y retratos personalizados"
          />
        </div>

        <div className="featured-caption">
          <span>Live painting</span>
          <strong>Un recuerdo unico del dia</strong>
          <small>Bodas, fiestas privadas y celebraciones especiales</small>
        </div>
      </div>
    </section>
  );
}

export default Hero;
