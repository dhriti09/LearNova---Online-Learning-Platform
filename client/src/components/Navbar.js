import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Avatar from "./Avatar";
import {
  IconGraduationCap,
  IconMenu,
  IconX,
  IconSearch,
  IconChevronDown,
  IconUser,
  IconPlus,
} from "./Icons";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen && !menuOpen) return undefined;

    const startY = window.scrollY;
    const onScroll = () => {
      if (Math.abs(window.scrollY - startY) > 6) {
        setMobileOpen(false);
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen, menuOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    "nav-link" + (isActive ? " active" : "");

  return (
    <nav className={"navbar" + (scrolled ? " scrolled" : "")}>
      <div className="navbar-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">
            <IconGraduationCap size={18} />
          </span>
          Learnova
        </Link>

        <div className="nav-links">
          <NavLink to="/courses" className={navLinkClass} end>
            Courses
          </NavLink>
          {user?.role === "instructor" && (
            <NavLink to="/create-course" className={navLinkClass}>
              Create Course
            </NavLink>
          )}
          {!user && (
            <NavLink to="/register?role=instructor" className={navLinkClass}>
              Become an Instructor
            </NavLink>
          )}
          {user && (
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
          )}
        </div>

        <div className="navbar-right">
          <div className="navbar-actions">
            <Link
              to="/courses"
              className="nav-link"
              aria-label="Search courses"
              title="Search courses"
            >
              <IconSearch size={18} />
            </Link>

            {user ? (
              <div className="nav-user-menu" ref={menuRef}>
                <button
                  className="nav-user-trigger"
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-haspopup="true"
                  aria-expanded={menuOpen}
                >
                  <Avatar name={user.name} size={32} />
                  <span className="nav-user-name">
                    {user.name?.split(" ")[0]}
                  </span>
                  <IconChevronDown size={15} />
                </button>

                {menuOpen && (
                  <div className="nav-user-dropdown" role="menu">
                    <div className="nav-user-dropdown-header">
                      <div className="nav-user-dropdown-name">
                        {user.name}
                      </div>
                      <div className="nav-user-dropdown-email">
                        {user.email}
                      </div>
                    </div>
                    <Link to="/dashboard" className="nav-dropdown-item">
                      <IconUser size={16} /> Dashboard
                    </Link>
                    {user.role === "instructor" && (
                      <Link
                        to="/create-course"
                        className="nav-dropdown-item"
                      >
                        <IconPlus size={16} /> Create Course
                      </Link>
                    )}
                    <button
                      className="nav-dropdown-item danger"
                      onClick={handleLogout}
                    >
                      <IconX size={16} /> Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost btn-sm">
                  Log in
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            className="hamburger"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <IconX size={22} /> : <IconMenu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-menu">
          <NavLink to="/courses" className={navLinkClass} end>
            Courses
          </NavLink>
          {user?.role === "instructor" && (
            <NavLink to="/create-course" className={navLinkClass}>
              Create Course
            </NavLink>
          )}
          {!user && (
            <NavLink to="/register?role=instructor" className={navLinkClass}>
              Become an Instructor
            </NavLink>
          )}
          {user && (
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
          )}

          <div className="mobile-menu-actions">
            {user ? (
              <>
                <div
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <Avatar name={user.name} size={36} />
                  <div>
                    <div style={{ fontWeight: 600 }}>{user.name}</div>
                    <div
                      style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}
                    >
                      {user.email}
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn-secondary btn-block"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary btn-block">
                  Log in
                </Link>
                <Link to="/register" className="btn btn-primary btn-block">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
