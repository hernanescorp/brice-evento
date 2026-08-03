import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-visual placeholder-visual">
        <span>IMAGEN PRINCIPAL PENDIENTE</span>
      </div>

      <div className="hero-content">
        <p className="eyebrow">Arte · ilustración · emoción</p>

        <h1>
          Obras creadas para
          <span> sentir y recordar.</span>
        </h1>

        <p className="hero-description">
          Miriart Studio es un espacio creativo dedicado al arte, la
          ilustración y los encargos personalizados. Este texto se sustituirá
          por la presentación definitiva de la artista.
        </p>

        <div className="hero-actions">
          <Link className="button button-primary" to="/obras">
            Descubrir las obras
          </Link>

          <Link className="text-link" to="/sobre-mi">
            Conocer a la artista
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
