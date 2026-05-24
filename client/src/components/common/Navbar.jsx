import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  ShoppingBag,
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  Package,
  PackageIcon,
} from "lucide-react";
import { useAuth, useCart } from "../../hooks/index.js";
import { logoutUser } from "../../store/thunk/authThunk.js";
import toast from "react-hot-toast";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();  
  const location = useLocation();  // Used for active nav links
  const { user, isAdmin } = useAuth();
  const { totalItems } = useCart();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const navLinks = [
    { label: "Shop", to: "/products" },
    { label: "About", to: "/about" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0805]/95 backdrop-blur-md border-b border-[#c9a96e]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 border border-[#c9a96e] flex items-center justify-center group-hover:bg-[#c9a96e] transition-colors duration-300">
              <span className="text-[#c9a96e] group-hover:text-[#0a0805] font-bold text-xs tracking-widest transition-colors duration-300">
                UV
              </span>
            </div>
            <span className="text-white font-light tracking-[0.3em] text-sm uppercase hidden sm:block">
              Urban<span className="text-[#c9a96e]">Vastra</span>
            </span>
          </Link>
          {/* desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-xs tracking-widest uppercase transition-colors duration-200 ${isActive(link.to) ? "text-[#c9a96e]" : "text-gray-200 hover:text-white"}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          {/* right actions */}
          <div className="flex items-center gap-4">
            {/* cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-400 hover:text-white transition-colors"
            >
              <ShoppingBag size={20} />
              {/* The JavaScript logical AND (&&) operator is used to evaluate multiple expressions, returning true only if all operands are truthy. If any operand is falsy, the expression returns false or the specific falsy value */}
              {/* eg. Only logs if 'userLoggedIn' is true
                      userLoggedIn && console.log("Welcome back!"); */}
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#c9a96e] text-[#0a0805] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            {/* user menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)} // Opens/closes dropdown
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors p-2"
                >
                  <User size={20} />
                  <span className="hidden md:block text-xs tracking-wide">
                    {/* Gets first name */}
                    {user.name?.split(" ")[0]} 
                  </span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-[#0f0d0a] border border-[#c9a96e]/20 shadow-2xl">
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-xs tracking-wider text-gray-200 hover:text-[#c9a96e] hover:bg-[#c9a96e]/5 transition-colors"
                      >
                        <LayoutDashboard size={14} />
                        Admin Panel
                      </Link>
                    )}
                    <Link
                      to="/orders"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-xs tracking-wider text-gray-200 hover:text-[#c9a96e] hover:bg-[#c9a96e]/5 transition-colors"
                    >
                      <PackageIcon size={14} /> My Orders
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setDropdownOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-xs tracking-wider text-gray-200 hover:text-red-400 hover:bg-red-400/5 transition-colors border-t border-[#c9a96e]/10"
                    >
                      <LogOut size={14} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-xs tracking-widest uppercase text-[#c9a96e] border border-[#c9a96e]/40 px-4 py-2 hover:bg-[#c9a96e] hover:text-[#0a0805] transition-all duration-200"
              >
                Login
              </Link>
            )}
            {/* mobile menu toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden px-2 py-1 text-white hover:scale-95 bg-[#c9a96e] hover:text-white transition-colors uppercase"
            >
              menu
              {open && (
                <div className="md:hidden border-t border-[#c9a96e]/10 py-4 space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className="block px-2  py-3 text-xs tracking-widest uppercase text-white hover:text-gray-200 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
