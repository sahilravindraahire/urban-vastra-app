import {useEffect} from 'react'
import {useParams, Link} from "react-router-dom"
import {useDispatch} from "react-redux"
import {ArrowLeft, ShoppingBag, Star, Package} from "lucide-react"
import {fetchProductById} from "../../store/thunk/productThunk.js"
import {useProducts, useCart} from "../../hooks/index.js"
import {Loader, GoldButton} from "../../components/common/index.jsx"
import toast from "react-hot-toast"

function ProductDetail() {

    const {id} = useParams()
    const dispatch = useDispatch()
    const {product, loading} = useProducts()
    const {addItem} = useCart()

    useEffect(() => {
        dispatch(fetchProductById(id))
    }, [dispatch, id])

    const handleAdd = () => {
        addItem(product)
        toast.success(`${product.name} added to cart`, {style: { background: "#0f0d0a", color: "#fff", border: "1px solid #c9a96e20" }})
    }

    if (loading) return <Loader fullScreen />

    if (!product) return null

  return (
    <div className="min-h-screen bg-[#0a0805] pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#c9a96e] text-[10px] tracking-widest uppercase transition-colors mb-8">
          <ArrowLeft size={12} /> Back to Collection
        </Link>
 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden bg-[#0f0d0a] border border-[#c9a96e]/10">
              <img
                src={product.imageUrl || "https://placehold.co/600x800/0f0d0a/c9a96e?text=UV"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
 
          {/* Details */}
          <div className="flex flex-col justify-center">
            <p className="text-[#c9a96e] text-[10px] tracking-[0.35em] uppercase mb-3">{product.category}</p>
            <h1 className="text-white text-3xl md:text-4xl font-light tracking-wide mb-4">{product.name}</h1>
 
            {/* Rating */}
            {product.ratings > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={12}
                      className={star <= Math.round(product.ratings) ? "text-[#c9a96e] fill-[#c9a96e]" : "text-gray-600"}
                    />
                  ))}
                </div>
                <span className="text-gray-500 text-xs">({product.numReviews} reviews)</span>
              </div>
            )}
 
            <div className="text-[#c9a96e] text-3xl font-light mb-6">
              ₹{product.price?.toLocaleString("en-IN")}
            </div>
 
            <div className="h-px bg-[#c9a96e]/10 mb-6" />
 
            <p className="text-gray-400 text-sm leading-relaxed tracking-wide mb-8">{product.description}</p>
 
            {/* Stock */}
            <div className="flex items-center gap-2 mb-8">
              <Package size={12} className={product.stock > 0 ? "text-green-400" : "text-red-400"} />
              <span className={`text-xs tracking-widest ${product.stock > 0 ? "text-green-400" : "text-red-400"}`}>
                {product.stock > 0 ? `In Stock (${product.stock} left)` : "Out of Stock"}
              </span>
            </div>
 
            <GoldButton onClick={handleAdd} disabled={product.stock === 0} className="flex items-center justify-center gap-2">
              <ShoppingBag size={14} />
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </GoldButton>
 
            <Link to="/cart" className="mt-3">
              <GoldButton variant="outline">View Cart</GoldButton>
            </Link>
 
            <div className="mt-8 space-y-3 text-[10px] tracking-wider text-gray-600 uppercase">
              <div className="flex items-center gap-2"><span className="text-[#c9a96e]/50">—</span> Free shipping above ₹999</div>
              <div className="flex items-center gap-2"><span className="text-[#c9a96e]/50">—</span> 7-day easy returns</div>
              <div className="flex items-center gap-2"><span className="text-[#c9a96e]/50">—</span> Ethically sourced & crafted</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
