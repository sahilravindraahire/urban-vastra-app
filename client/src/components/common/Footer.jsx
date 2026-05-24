import { Link } from "react-router-dom";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#0a0805] border-t border-[#c9a96e]/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 border border-[#c9a96e] flex items-center justify-center">
                <span className="text-[#c9a96e] font-bold text-xs tracking-widest">
                  UV
                </span>
              </div>
              <span className="text-white font-light tracking-[0.3em] text-sm uppercase">
                Urban<span className="text-[#c9a96e]">Vastra</span>
              </span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed tracking-wide max-w-xs">
              Refined fashion for the discerning. Every piece tells a story of
              craft, culture, and contemporary elegance.
            </p>
            <div className="flex gap-4 mt-6">
              <FaSquareInstagram />
              <FaFacebookF />
              <FaTwitter />
            </div>
          </div>
          {/* quick links */}
          <div>
            <h4 className="text-[#c9a96e] text-[10px] tracking-[0.3em] uppercase mb-5">
              Navigate
            </h4>
            <ul className="space-y-3">
              {[
                ["Shop", "/products"],
                ["About", "/about"],
                ["My Orders", "/orders"],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-gray-500 hover:text-white text-xs tracking-wider transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* contact */}
          <div>
            <h4 className="text-[#c9a96e] text-[10px] tracking-[0.3em] uppercase mb-5">
              Contact
            </h4>
            <ul className="space-y-3 text-gray-500 text-xs tracking-wider">
              <li>support@urbanvastra.in</li>
              <li>+91 98765 43210</li>
              <li>Mumbai, Maharashtra, India</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#c9a96e]/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-gray-600 text-[10px] tracking-widest uppercase">© 2025 UrbanVastra. All rights reserved.</p>
        <p className="text-gray-700 text-[10px] tracking-wider">Crafted with precision</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
