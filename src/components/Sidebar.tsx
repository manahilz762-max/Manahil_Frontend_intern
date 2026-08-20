import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const getNavClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) => {
    return isActive ? "active" : "";
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="mobile-menu-button"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        ☰
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`sidebar ${
          isOpen ? "sidebar-open" : ""
        }`}
      >
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            ✦
          </div>

          <div>
            <h2>Synergy</h2>
            <span>Solutions</span>
          </div>

          {/* Close button */}
          <button
            className="sidebar-close"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">

          <NavLink
            to="/dashboard"
            className={getNavClass}
            onClick={closeMenu}
          >
            <span className="nav-icon">⌂</span>
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={getNavClass}
            onClick={closeMenu}
          >
            <span className="nav-icon">♙</span>
            <span>Profile</span>
          </NavLink>

          <NavLink
            to="/notifications"
            className={getNavClass}
            onClick={closeMenu}
          >
            <span className="nav-icon">♢</span>
            <span>Notifications</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={getNavClass}
            onClick={closeMenu}
          >
            <span className="nav-icon">⚙</span>
            <span>Settings</span>
          </NavLink>

        </nav>

        {/* Logout */}
        <button
          className="logout-button"
          onClick={handleLogout}
        >
          <span className="nav-icon">↪</span>
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
}

export default Sidebar;