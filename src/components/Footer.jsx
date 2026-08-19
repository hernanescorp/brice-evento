import { Link } from "react-router-dom";

const contactEmail = "miriart.studio@gmail.com";

function Footer() {
  function handleNewsletterSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const userEmail = String(formData.get("email") || "").trim();
    const subject = encodeURIComponent("Consulta desde Miriart Studio");
    const body = encodeURIComponent(
      userEmail
        ? `Hola Miriam,\n\nQuiero contarte mi idea.\n\nMi email es: ${userEmail}`
        : "Hola Miriam,\n\nQuiero contarte mi idea."
    );

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <footer className="site-footer">
      <section className="newsletter">
        <div className="newsletter-kicker">
          <span>Encargos personalizados</span>
        </div>

        <h2>Cuentame tu idea</h2>

        <form onSubmit={handleNewsletterSubmit}>
          <input name="email" type="email" placeholder="Email" aria-label="Email" />
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
          <a href={`mailto:${contactEmail}`}>Email</a>
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
