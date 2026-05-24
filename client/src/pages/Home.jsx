import {useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useDispatch} from "react-redux"
import {ArrowRight, Sparkles} from "lucide-react"
import {fetchProducts} from "../store/thunk/productThunk.js"
import {useProducts} from "../hooks/index.js"
import ProductCard from '../components/product/ProductCard.jsx'
import {Loader} from "../components/common/index.jsx"

const CATEGORIES = ["Kurta", "Ethnic Wear", "Co-ords", "Bottoms", "Jackets"];

function Home() {

  const dispatch = useDispatch()
   const { products, loading } = useProducts()

   useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const featured = products.slice(0, 4);

  return (
    <div className="bg-[#0a0805] min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0805] via-[#0f0d0a] to-[#0a0805]" />
          <div className="absolute top-1/4 right-0 w-1/2 h-full bg-[#c9a96e]/3 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#c9a96e]/5 blur-[80px]" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "linear-gradient(#c9a96e 1px, transparent 1px), linear-gradient(90deg, #c9a96e 1px, transparent 1px)", backgroundSize: "60px 60px" }}
          />
        </div>
 
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="h-px w-8 bg-[#c9a96e]" />
              <span className="text-[#c9a96e] text-[10px] tracking-[0.4em] uppercase">New Collection 2026</span>
            </div>
 
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white leading-[1.1] tracking-tight mb-6">
              Where Craft<br />
              Meets <span className="text-[#c9a96e] italic">Culture</span>
            </h1>
 
            <p className="text-gray-400 text-sm leading-relaxed tracking-wide max-w-md mb-10">
              Discover contemporary Indian fashion — each piece a dialogue between tradition and modernity.
              Ethically sourced. Thoughtfully designed.
            </p>
 
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="group inline-flex items-center gap-3 bg-[#c9a96e] text-[#0a0805] px-8 py-4 text-[10px] tracking-[0.3em] uppercase font-medium hover:bg-[#d4b87a] transition-colors"
              >
                Explore Collection
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-3 border border-[#c9a96e]/30 text-[#c9a96e] px-8 py-4 text-[10px] tracking-[0.3em] uppercase hover:border-[#c9a96e] transition-colors"
              >
                Our Story
              </Link>
            </div>
 
            <div className="flex gap-8 mt-14">
              {[["500+", "Styles"], ["50K+", "Happy Customers"], ["100%", "Ethically Made"]].map(([num, label]) => (
                <div key={label}>
                  <div className="text-[#c9a96e] text-xl font-light">{num}</div>
                  <div className="text-gray-600 text-[10px] tracking-widest uppercase mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
 
          {/* Hero visual */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="relative">
              <div className="w-80 h-96 border border-[#c9a96e]/20 relative">
                <div className="absolute -top-4 -left-4 w-80 h-96 border border-[#c9a96e]/10" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#c9a96e]/5 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Sparkles className="text-[#c9a96e]/40 mx-auto mb-4" size={32} />
                    <span className="text-[#c9a96e]/30 text-[10px] tracking-[0.4em] uppercase">UrbanVastra</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
 
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-gray-600 text-[9px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#c9a96e]/40 to-transparent animate-pulse" />
        </div>
      </section>
 
      {/* Categories */}
      <section className="py-16 md:py-20 border-t border-[#c9a96e]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-[#c9a96e]/10" />
            <span className="text-[#c9a96e] text-[10px] tracking-[0.4em] uppercase">Browse by Category</span>
            <div className="h-px flex-1 bg-[#c9a96e]/10" />
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                to={`/products?category=${cat}`}
                className="border border-[#c9a96e]/20 text-gray-400 hover:border-[#c9a96e] hover:text-[#c9a96e] px-6 py-2 text-[10px] tracking-[0.25em] uppercase transition-all duration-200"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>
 
      {/* Featured Products */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[#c9a96e] text-[10px] tracking-[0.35em] uppercase mb-2">Handpicked</p>
              <h2 className="text-white text-2xl md:text-3xl font-light tracking-wide">Featured Pieces</h2>
            </div>
            <Link to="/products" className="text-[#c9a96e] text-[10px] tracking-widest uppercase hover:text-white transition-colors flex items-center gap-2">
              View all <ArrowRight size={12} />
            </Link>
          </div>
 
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {featured.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
 
      {/* CTA Banner */}
      <section className="py-20 md:py-28 border-t border-[#c9a96e]/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="h-px w-12 bg-[#c9a96e] mx-auto mb-8" />
          <h2 className="text-white text-3xl md:text-4xl font-light tracking-wide mb-4">
            Dress with <span className="text-[#c9a96e] italic">Intention</span>
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md mx-auto">
            Every thread woven with care. Every design born from culture. Explore our full collection.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-3 bg-[#c9a96e] text-[#0a0805] px-10 py-4 text-[10px] tracking-[0.3em] uppercase font-medium hover:bg-[#d4b87a] transition-colors"
          >
            Shop Now <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
