import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { registerUser, verifyOtp } from "../../store/thunk/authThunk.js";
import { useAuth } from "../../hooks/index.js";
import { GoldButton, InputField } from "../../components/common/index.jsx";
import useForm from "../../hooks/useForm.js";
import {clearError, setOtpEmail} from "../../store/slices/authSlice.js"
import {loadUserAddress, loadUserCart} from "../../store/slices/cartSlice.js"

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, otpSent, otpEmail} = useAuth();
  // const [otpEmail, setOtpEmail] = useState("");
  const [otpValue, setOtpValue] = useState("");

  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  useEffect(() => {
    if (error) toast.error(error);
    return () => dispatch(clearError());
  }, [error, dispatch]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser(values));
    if (registerUser.fulfilled.match(result)) {
      dispatch(setOtpEmail(values.email));
      toast.success("OTP sent to your email!");
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const result = await dispatch(verifyOtp({ email: otpEmail, otp: otpValue }));
    if (verifyOtp.fulfilled.match(result)) {
      dispatch(loadUserAddress())
      dispatch(loadUserCart())
      toast.success("Email verified! Welcome to UrbanVastra.");
      navigate("/");
    }
  };

  return(
    <div className="min-h-screen bg-[#0a0805] flex items-center justify-center px-4">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#c9a96e]/5 blur-[100px]" />
      </div>
 
      <div className="relative w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-8 h-8 border border-[#c9a96e] flex items-center justify-center">
              <span className="text-[#c9a96e] font-bold text-xs tracking-widest">UV</span>
            </div>
            <span className="text-white font-light tracking-[0.3em] text-sm uppercase">
              Urban<span className="text-[#c9a96e]">Vastra</span>
            </span>
          </Link>
          <h1 className="text-white text-2xl font-light tracking-wide mb-2">
            {otpSent ? "Verify Your Email" : "Create Account"}
          </h1>
          <p className="text-gray-300 text-xs tracking-wider">
            {otpSent ? `OTP sent to ${otpEmail}` : "Join UrbanVastra today"}
          </p>
        </div>
 
        <div className="border border-[#c9a96e]/10 p-8 bg-[#0f0d0a]">
          {!otpSent ? (
            <form onSubmit={handleRegister} className="space-y-5">
              <InputField label="Full Name" name="name" value={values.name} onChange={handleChange} required />
              <InputField label="Email Address" name="email" type="email" value={values.email} onChange={handleChange} required />
              <InputField label="Password" name="password" type="password" value={values.password} onChange={handleChange} required />
              <div className="pt-2">
                <GoldButton type="submit" disabled={loading}>
                  {loading ? "Creating account..." : "Create Account"}
                </GoldButton>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-5">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] tracking-[0.25em] uppercase text-gray-400">Enter OTP</label>
                <input
                  type="text"
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value)}
                  placeholder="6-digit code"
                  maxLength={6}
                  className="bg-transparent border border-[#c9a96e]/20 text-white text-center text-2xl tracking-[0.5em] px-4 py-4 focus:outline-none focus:border-[#c9a96e]/60 placeholder:text-gray-700 transition-colors"
                />
              </div>
              <p className="text-gray-500 text-[10px] tracking-wide text-center">
                OTP expires in 5 minutes
              </p>
              <GoldButton type="submit" disabled={loading || otpValue.length !== 6}>
                {loading ? "Verifying..." : "Verify & Continue"}
              </GoldButton>
              <button
                type="button"
                onClick={() => { setOtpValue(""); dispatch(clearError()); }}
                className="w-full text-gray-500 hover:text-gray-300 text-[10px] tracking-widest uppercase transition-colors text-center"
              >
                Resend OTP
              </button>
            </form>
          )}
 
          {!otpSent && (
            <div className="mt-6 text-center">
              <p className="text-gray-500 text-xs tracking-wider">
                Already have an account?{" "}
                <Link to="/login" className="text-[#c9a96e] hover:text-white transition-colors">
                  Sign In
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
