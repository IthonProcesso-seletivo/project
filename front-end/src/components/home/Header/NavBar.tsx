import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const P: React.CSSProperties = {
  fontFamily: "Poppins, sans-serif",
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  const pathname = location.pathname;

  return (
    <>
      <nav
        className="bg-[#2D815D] px-4 sm:px-8 flex items-center justify-between shadow-md"
        style={{ minHeight: 72 }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div style={{ borderRadius: 12 }}>
            <img
              src="/src/assets/Logo.png"
              alt="Logo FamiGestão"
              className="h-20 w-20 object-contain"
            />
          </div>
        </div>

        {/* Desktop */}
        <div
          className="hidden sm:flex items-center bg-[#89BFA1] p-1 gap-1"
          style={{ borderRadius: 16 }}
        >
          <Link
            to="/home"
            className={`px-8 py-2 transition-colors ${
              pathname === "/home"
                ? "bg-[#2D815D] text-white"
                : "text-green-900 hover:bg-white/10 hover:text-white"
            }`}
            style={{
              ...P,
              fontSize: 15,
              fontWeight: pathname === "/home" ? 600 : 500,
              borderRadius: 16,
            }}
          >
            Home
          </Link>

          <Link
            to="/despesas"
            className={`px-8 py-2 transition-colors ${
              pathname === "/despesas"
                ? "bg-[#2D815D] text-white"
                : "text-green-900 hover:bg-white/10 hover:text-white"
            }`}
            style={{
              ...P,
              fontSize: 15,
              fontWeight: pathname === "/despesas" ? 600 : 500,
              borderRadius: 16,
            }}
          >
            Despesas
          </Link>
        </div>

        {/* Mobile */}
        <button
          className="sm:hidden text-white p-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-[#2D815D] px-6 pb-4 flex flex-col">
          <Link
            to="/home"
            className={`py-3 text-sm border-b border-white/20 ${
              pathname === "/home"
                ? "text-white font-semibold"
                : "text-white/80"
            }`}
            style={P}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/despesas"
            className={`py-3 text-sm ${
              pathname === "/despesas"
                ? "text-white font-semibold"
                : "text-white/80"
            }`}
            style={P}
            onClick={() => setMenuOpen(false)}
          >
            Despesas
          </Link>
        </div>
      )}
    </>
  );
}



