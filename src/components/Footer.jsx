import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <section className="newsletter">
        <p className="eyebrow">New release updates</p>
        <h2>Recibe noticias sobre nuevas obras y prints.</h2>
        <form onSubmit={(event) => event.preventDefault()}>
          <input type="email" placeholder="Email" aria-label="Email" />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      <div className="footer-main">
        <div>
          <p className="footer-brand">Miriart Studio</p>
          <p>
            Arte, ilustracion y encargos personalizados.
            <br />
            Nuevas obras, prints y proyectos especiales.
          </p>
        </div>

        <div className="footer-navigation">
          <Link to="/obras">Originals</Link>
          <Link to="/obras">Prints</Link>
          <Link to="/encargos">Encargos</Link>
          <Link to="/sobre-mi">About</Link>
          <Link to="/contacto">Contact</Link>
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
        <span>© {new Date().getFullYear()} Miriart Studio</span>

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
