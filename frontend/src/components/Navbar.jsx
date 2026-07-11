import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import logoNavbar from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-30 bg-white/80 dark:bg-slate-950/80 backdrop-blur border-b border-slate-200 dark:border-slate-800">

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16">

          {/* Logo + App Name */}
          <Link
            to="/"
            className="flex items-center gap-2 flex-shrink-0"
          >
            <img
              src={logoNavbar}
              alt="VeriVision"
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain"
              draggable="false"
            />

            <span
              className="
                font-bold
                gradient-text
                text-lg
                sm:text-xl
                md:text-3xl
                whitespace-nowrap
              "
            >
              VeriVision
            </span>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-5">

            <Link
              to="/"
              className="nav-link text-xs sm:text-base"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="nav-link text-xs sm:text-base"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="nav-link text-xs sm:text-base"
            >
              Contact
            </Link>

            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
              <ThemeToggle />
            </div>

          </div>

        </div>

      </div>

    </nav>
  );
}