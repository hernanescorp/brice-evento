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
            Home
          </NavLink>
          <NavLink to="/obras" onClick={closeMenu}>
            Originals
          </NavLink>
          <NavLink to="/obras" onClick={closeMenu}>
            Prints
          </NavLink>
          <NavLink to="/encargos" onClick={closeMenu}>
            Encargos
          </NavLink>
          <NavLink to="/sobre-mi" onClick={closeMenu}>
            About
          </NavLink>
          <NavLink to="/contacto" onClick={closeMenu}>
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
