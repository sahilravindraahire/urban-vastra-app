import { useEffect, useState } from "react"
import {useDispatch} from "react-redux"
import {useSearchParams} from "react-router-dom"
import {Search, SearchAlertIcon, SlidersHorizontal, X} from "lucide-react"
import {fetchProducts} from "../../store/thunk/productThunk.js"
import {useProducts} from "../../hooks/index.js"
import ProductCard from "../../components/product/ProductCard.jsx"
import {Loader} from "../../components/common/index.jsx"

const CATEGORIES = ["All", "Kurta", "Ethnic Wear", "Co-ords", "Bottoms", "Jackets"];

function Products() {

    const dispatch = useDispatch()
    const {products, loading} = useProducts()
    const [searchParams, setSearchParams] = useSearchParams()
    const [search, setSearch] = useState("")
    const [selectedCat, setSelectedCat] = useState(searchParams.get("category") || "All")
    const [sortBy, setSortBy] = useState("default")
    const [filterOpen, setFilterOpen] = useState(false)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    const filtered = products.filter((p) => {
        const matchCat = selectedCat === "All" || p.category.toLowerCase() === selectedCat.toLowerCase()
        const matchSearch = p.name.toLowerCase().includes(search.toLocaleLowerCase())
        return matchCat && matchSearch
    })
    .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return (b.ratings || 0) - (a.ratings || 0);
        return 0;
    })

  return (
    <div className="min-h-screen bg-[#0a0805] pt-20 md:pt-24">
      {/* header */}
      <div className="border-b border-[#c9a96e]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <p className="text-[#c9a96e] text-[10px] tracking-[0.4em] uppercase mb-2">
            Explore
        </p>
        <h1 className="text-white text-3xl md:text-4xl font-light tracking-wide">
            Our Collection
        </h1>
        <p className="text-gray-500 text-xs mt-2 tracking-wider">
            {filtered.length} pieces available
        </p>
      </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* filters bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* search */}
            <div className="relative flex-1">
                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"/>
                <input type="text" placeholder="search products" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-[#0f0d0a] border border-[#c9a96e]/10 text-white text-xs pl-10 pr-4 py-3 focus:outline-none focus:border-[#c9a96e]/30 placeholder:text-gray-600 tracking-wider"/>
                {search && (
                    <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                        <X size={14}/>
                    </button>
                )}
            </div>
            {/* sort */}
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-[#0f0d0a] border border-[#c9a96e]/10 text-gray-400 text-xs px-4 py-3 focus:outline-none focus:border-[#c9a96e]/30 tracking-wider appearance-none cursor-pointer min-w-[160px]">
                <option value="default">Sort: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
            </select>
        </div>
        {/* category tabs */}
        <div className="flex gap-2 flex-wrap mb-8 pb-4 border-b border-[#c9a96e]/10">
        {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setSelectedCat(cat)} 
            className={`px-4 py-2 text-[10px] tracking-[0.2em] uppercase transition-all duration-200 ${
                selectedCat === cat
                  ? "bg-[#c9a96e] text-[#0a0805]"
                  : "border border-[#c9a96e]/20 text-gray-500 hover:border-[#c9a96e]/50 hover:text-gray-300"
              }`}
            >
                {cat}
            </button>
        ))}
        </div>
        {/* products grid */}
        {loading? (
            <Loader/>
        ) : filtered.length === 0 ? (
            <div className="text-center py-20">
                <p className="text-gray-500 text-xs tracking-[0.3em] uppercase">No products found</p>
            </div>
        ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filtered.map((product) => (
                    <ProductCard key={product._id} product={product}/>
                ))}
            </div>
        )}
      </div>
    </div>
  )
}

export default Products
