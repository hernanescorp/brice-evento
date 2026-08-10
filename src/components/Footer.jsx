import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <section className="newsletter">
        <p className="eyebrow">Agenda de eventos</p>
        <h2>Pregunta por la disponibilidad para tu fecha.</h2>
        <form onSubmit={(event) => event.preventDefault()}>
          <input type="email" placeholder="Email" aria-label="Email" />
          <button type="submit">Contactar</button>
        </form>
      </section>

      <div className="footer-main">
        <div>
          <p className="footer-brand">Miriart Studio</p>
          <p>
            Pintura en directo para bodas, celebraciones y eventos.
            <br />
            Recuerdos artisticos creados mientras sucede el momento.
          </p>
        </div>

        <div className="footer-navigation">
          <Link to="/encargos">Eventos</Link>
          <Link to="/obras">Portfolio</Link>
          <Link to="/sobre-mi">Sobre mi</Link>
          <Link to="/contacto">Contacto</Link>
        </div>

        <div className="footer-social">
          <a href="#" aria-label="Instagram">
            Instagram
          </a>
          <a href="#" aria-label="TikTok">
            TikTok
          </a>
          <a href="mailto:correo-pendiente@miriartstudio.com">Email</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} Miriart Studio</span>

        <div>
          <Link to="/aviso-legal">Aviso legal</Link>
          <Link to="/privacidad">Privacidad</Link>
          <Link to="/cookies">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
