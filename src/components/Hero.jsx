import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">Originales · prints · encargos</p>

        <h1>Miriart Studio</h1>

        <p className="hero-description">
          Arte intimo, ilustracion y piezas personalizadas. Una tienda-galeria
          sencilla para descubrir obra disponible, prints y proximos lanzamientos.
        </p>

        <div className="hero-actions">
          <Link className="button button-primary" to="/obras">
            Ver obras
          </Link>

          <Link className="text-link" to="/sobre-mi">
            Sobre la artista
          </Link>
        </div>
      </div>

      <div className="hero-feature">
        <div className="featured-artwork artwork-placeholder artwork-placeholder-rose">
          <span>Eco interior</span>
        </div>

        <div className="featured-caption">
          <span>Obra destacada</span>
          <strong>Eco interior</strong>
          <small>Acuarela y tinta sobre papel · EUR 420,00</small>
        </div>
      </div>
    </section>
  );
}

export default Hero;
