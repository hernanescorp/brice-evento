import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-name">Miriart</span>
          <span className="brand-subtitle">Studio</span>
        </Link>

        <button
          className="menu-button"
          type="button"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
        </button>

        <nav className={`main-navigation ${menuOpen ? "is-open" : ""}`}>
          <NavLink to="/" onClick={closeMenu}>
            Inicio
          </NavLink>
          <NavLink to="/servicios" onClick={closeMenu}>
            Servicios
          </NavLink>
          <NavLink to="/obras" onClick={closeMenu}>
            Portfolio
          </NavLink>
          <NavLink to="/sobre-mi" onClick={closeMenu}>
            Sobre mi
          </NavLink>
          <NavLink to="/contacto" onClick={closeMenu}>
            Contacto
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
