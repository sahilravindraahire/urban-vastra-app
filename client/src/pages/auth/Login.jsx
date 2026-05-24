import toast from "react-hot-toast"
import {loginUser} from "../../store/thunk/authThunk.js"
import {clearError} from "../../store/slices/authSlice.js"
import {useAuth} from "../../hooks/index.js"
import {GoldButton, InputField} from "../../components/common/index.jsx"
import useForm from "../../hooks/useForm.js"
import { useEffect } from "react"
import {useDispatch} from "react-redux"
import {useNavigate, Link} from "react-router-dom"
import {loadUserAddress, loadUserCart} from "../../store/slices/cartSlice.js"

function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, loading, error} = useAuth()
    const {values, handleChange} = useForm({email: "", password: ""})

    useEffect(() => {
        if(user) navigate("/")
    }, [user, navigate])

    useEffect(() => {
        if(error) toast.error(error)
            return () => dispatch(clearError())
    }, [error, dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await dispatch(loginUser(values))
        if(loginUser.fulfilled.match(result)){
          dispatch(loadUserCart())
          dispatch(loadUserAddress())
            toast.success("Welcome to UrbanVastra")
            navigate("/")
        }
    }

  return (
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
          <h1 className="text-white text-2xl font-light tracking-wide mb-2">Welcome Back</h1>
          <p className="text-gray-500 text-xs tracking-wider">Sign in to your account</p>
        </div>
 
        <div className="border border-[#c9a96e]/10 p-8 bg-[#0f0d0a]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField label="Email Address" name="email" type="email" value={values.email} onChange={handleChange} required />
            <InputField label="Password" name="password" type="password" value={values.password} onChange={handleChange} required />
            <div className="pt-2">
              <GoldButton type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </GoldButton>
            </div>
          </form>
 
          <div className="mt-6 text-center">
            <p className="text-gray-300 text-xs tracking-wider">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#c9a96e] hover:text-white transition-colors">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

