import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <section className="newsletter">
        <div className="newsletter-kicker">
          <span>Encargos personalizados</span>
        </div>

        <h2>Cuentame tu idea</h2>

        <form onSubmit={(event) => event.preventDefault()}>
          <input type="email" placeholder="Email" aria-label="Email" />
          <button type="submit">Contactar</button>
        </form>
      </section>

      <div className="footer-main">
        <div>
          <p className="footer-brand">Miriart Studio</p>
          <p>
            Pintura en directo para bodas, celebraciones y eventos desde
            Bizkaia.
            <br />
            Disponible para desplazamientos por el Pais Vasco y Espana.
          </p>
        </div>

        <div className="footer-navigation">
          <Link to="/servicios">Servicios</Link>
          <Link to="/obras">Portfolio</Link>
          <Link to="/sobre-mi">Sobre mi</Link>
          <Link to="/contacto">Contacto</Link>
        </div>

        <div className="footer-social">
          <a
            href="https://www.instagram.com/miriart_studio?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw=="
            aria-label="Instagram"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a
            href="https://www.tiktok.com/@miriart_studio2?is_from_webapp=1&sender_device=pc"
            aria-label="TikTok"
            target="_blank"
            rel="noreferrer"
          >
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
