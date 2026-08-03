import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <p className="footer-brand">Miriart Studio</p>
          <p>
            Arte, ilustración y encargos personalizados.
            <br />
            Información definitiva pendiente.
          </p>
        </div>

        <div className="footer-navigation">
          <Link to="/obras">Obras</Link>
          <Link to="/sobre-mi">Sobre mí</Link>
          <Link to="/encargos">Encargos</Link>
          <Link to="/contacto">Contacto</Link>
        </div>

        <div className="footer-social">
          {/* Sustituir # por los enlaces definitivos */}
          <a href="#" aria-label="Instagram">
            Instagram
          </a>
          <a href="#" aria-label="TikTok">
            TikTok
          </a>
          <a href="mailto:correo-pendiente@miriartstudio.com">
            Correo
          </a>
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