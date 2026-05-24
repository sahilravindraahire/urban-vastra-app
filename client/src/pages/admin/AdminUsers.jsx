import {useEffect} from 'react'
import {useDispatch} from "react-redux"
import {User, CheckCircle, XCircle} from "lucide-react"
import {fetchUsers} from "../../store/thunk/authThunk.js"
import {useAuth} from "../../hooks/index.js"
import {Loader} from "../../components/common/index.jsx"

function AdminUsers() {

    const dispatch = useDispatch()
    const {users, loading} = useAuth()

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    if(loading) return <Loader fullScreen/>

  return (
    <div className="min-h-screen bg-[#0a0805] pt-20 md:pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <p className="text-[#c9a96e] text-[10px] tracking-[0.4em] uppercase mb-1">Admin</p>
          <h1 className="text-white text-2xl md:text-3xl font-light tracking-wide">Customers</h1>
          <p className="text-gray-500 text-xs mt-1 tracking-wider">{users.length} registered users</p>
        </div>
 
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#c9a96e]/10">
                {["User", "Email", "Role", "Verified", "Joined"].map((h) => (
                  <th key={h} className="text-left py-4 pr-6 text-[10px] tracking-[0.3em] uppercase text-gray-500 font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-[#c9a96e]/5 hover:bg-[#c9a96e]/3 transition-colors">
                  <td className="py-4 pr-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 border border-[#c9a96e]/20 flex items-center justify-center">
                        <User size={12} className="text-[#c9a96e]/40" />
                      </div>
                      <span className="text-white text-sm font-light">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-4 pr-6 text-gray-500 text-xs tracking-wider">{user.email}</td>
                  <td className="py-4 pr-6">
                    <span className={`text-[10px] tracking-widest uppercase px-2 py-1 border ${
                      user.role === "admin" ? "border-[#c9a96e]/40 text-[#c9a96e]" : "border-gray-700 text-gray-500"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 pr-6">
                    {user.isVerified
                      ? <CheckCircle size={14} className="text-green-400" />
                      : <XCircle size={14} className="text-red-400/60" />
                    }
                  </td>
                  <td className="py-4 text-gray-600 text-xs">
                    {new Date(user.createdAt).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminUsers
