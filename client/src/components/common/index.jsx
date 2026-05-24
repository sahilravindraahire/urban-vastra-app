import {Navigate} from "react-router-dom"
import {useAuth} from "../../hooks/index.js"

export const Loader = ({ fullScreen = false }) => (
  <div className={`flex items-center justify-center ${fullScreen ? "min-h-screen bg-[#0a0805]" : "py-20"}`}>
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border border-[#c9a96e]/30 border-t-[#c9a96e] rounded-full animate-spin" />
      <span className="text-gray-500 text-[10px] tracking-[0.3em] uppercase animate-pulse">Loading</span>
    </div>
  </div>
);

export const ProtectedRoute = ({ children }) => {
  const {user} = useAuth()
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export const AdminRoute = ({ children }) => {
  const { user, isAdmin } = useAuth();
  //  replace: Prevents user from going back to protected page using browser back button
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
};

export const GoldButton = ({ children, onClick, type = "button", disabled = false, variant = "solid", className = "" }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`
      ${variant === "solid"
        ? "bg-[#c9a96e] text-[#0a0805] hover:bg-[#d4b87a]"
        : "border border-[#c9a96e] text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#0a0805]"
      }
      px-6 py-3 text-[10px] tracking-[0.25em] uppercase font-medium transition-all duration-200 
      disabled:opacity-40 disabled:cursor-not-allowed w-full ${className}
    `}
  >
    {disabled ? "..." : children}
  </button>
);

export const InputField = ({ label, name, type = "text", value, onChange, placeholder = "", required = false }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] tracking-[0.25em] uppercase text-gray-400">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="bg-transparent border border-[#c9a96e]/20 text-white text-sm px-4 py-3 
        focus:outline-none focus:border-[#c9a96e]/60 placeholder:text-gray-600 transition-colors"
    />
  </div>
);

export const Badge = ({ status }) => {
  const map = {
    Pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Shipped: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Delivered: "bg-green-500/10 text-green-400 border-green-500/20",
  };
  return (
    <span className={`text-[10px] tracking-widest uppercase px-3 py-1 border ${map[status] || "bg-gray-500/10 text-gray-200 border-gray-500/20"}`}>
      {status}
    </span>
  );
};