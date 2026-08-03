import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          {/* Sustituir este texto por el logo definitivo */}
          <span className="brand-name">Miriart</span>
          <span className="brand-subtitle">Studio</span>
        </Link>

        <button
          className="menu-button"
          type="button"
          aria-label="Abrir menú"
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
          <NavLink to="/obras" onClick={closeMenu}>
            Obras
          </NavLink>
          <NavLink to="/sobre-mi" onClick={closeMenu}>
            Sobre mí
          </NavLink>
          <NavLink to="/encargos" onClick={closeMenu}>
            Encargos
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