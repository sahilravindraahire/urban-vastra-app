import {useEffect} from 'react'
import {useDispatch} from "react-redux"
import {Link} from "react-router-dom"
import {TrendingUp, Package, Users, ShoppingBag, ChevronRight} from "lucide-react"
import {fetchAdminStats} from "../../store/thunk/analyticThunk.js"
import {useAnalytics} from "../../hooks/index.js"
import {Loader} from "../../components/common/index.jsx"

const StatCard = ({icon: Icon, label, value, sub}) => {
    <div className="bg-[#0f0d0a] border border-[#c9a96e]/10 p-6 hover:border-[#c9a96e]/30 transition-colors">
        <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 border border-[#c9a96e]/20 flex items-center justify-center">
            <Icon size={16} className="text-[#c9a96e]"/>
            </div>
        </div>
        <p className="text-3xl font-light text-white mb-1">{value}</p>
        <p className="text-[10px] tracking-[0.25em] uppercase text-gray-500">{label}</p>
        {sub && <p className="text-[10px] text-gray-600 mt-1">{sub}</p>}
    </div>
}

function AdminDasboard() {

    const dispatch = useDispatch()
    const {stats, loading} = useAnalytics()

    useEffect(() => {
        dispatch(fetchAdminStats())
    }, [dispatch])

    const adminLinks = [
        { label: "Manage Products", to: "/admin/products", desc: "Add, edit, or remove products", icon: Package },
        { label: "All Orders", to: "/admin/orders", desc: "View and update order statuses", icon: ShoppingBag },
        { label: "Customers", to: "/admin/users", desc: "Manage registered users", icon: Users },
    ]

    if (loading) return <Loader fullScreen />

  return (
    <div className="min-h-screen bg-[#0a0805] pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <p className="text-[#c9a96e] text-[10px] tracking-[0.4em] uppercase mb-1">Admin</p>
          <h1 className="text-white text-2xl md:text-3xl font-light tracking-wide">Dashboard</h1>
        </div>
 
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <StatCard icon={TrendingUp} label="Total Revenue" value={`₹${Number(stats.totalRevenue || 0).toLocaleString("en-IN")}`} />
            <StatCard icon={ShoppingBag} label="Total Orders" value={stats.totalOrder} />
            <StatCard icon={Package} label="Products" value={stats.totalProducts} />
            <StatCard icon={Users} label="Customers" value={stats.totalUsers} />
          </div>
        )}
 
        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {adminLinks.map(({ label, to, desc, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="group bg-[#0f0d0a] border border-[#c9a96e]/10 hover:border-[#c9a96e]/30 p-6 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 border border-[#c9a96e]/20 group-hover:border-[#c9a96e]/50 flex items-center justify-center transition-colors">
                  <Icon size={16} className="text-[#c9a96e]" />
                </div>
                <ChevronRight size={14} className="text-gray-600 group-hover:text-[#c9a96e] transition-colors" />
              </div>
              <h3 className="text-white text-sm tracking-wide mb-1">{label}</h3>
              <p className="text-gray-500 text-[10px] tracking-wider">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminDasboard
