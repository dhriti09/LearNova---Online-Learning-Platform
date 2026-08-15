import { Link } from "react-router-dom";
import { IconGraduationCap } from "./Icons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link to="/" className="brand">
            <span className="brand-mark">
              <IconGraduationCap size={18} />
            </span>
            Learnova
          </Link>
          <p>
            Practical, instructor-led courses you can work through at your own
            pace.
          </p>
        </div>

        <div className="footer-col">
          <h4>Product</h4>
          <Link to="/courses">Courses</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/register?role=instructor">Become an Instructor</Link>
        </div>

        <div className="footer-col">
          <h4>Account</h4>
          <Link to="/login">Log in</Link>
          <Link to="/register">Sign up</Link>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>&copy; {new Date().getFullYear()} Learnova. All rights reserved.</span>
      </div>
    </footer>
  );
}
