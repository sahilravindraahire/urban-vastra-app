import { Link } from "react-router-dom";
import {ShoppingBag, Star} from "lucide-react"
import {useCart} from "../../hooks/index.js"
import toast from "react-hot-toast"

function ProductCard({product}) {

    const {addItem} = useCart()

    const handleAdd = (e) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.name} added to cart`, {
      style: { background: "#0f0d0a", color: "#fff", border: "1px solid #c9a96e20" },
      iconTheme: { primary: "#c9a96e", secondary: "#0a0805" },
    });
  }; 

  return (
    <Link to={`/products/${product._id}`} className="group block">
      <div className="relative overflow-hidden bg-[#0f0d0a] border border-[#c9a96e]/10 hover:border-[#c9a96e]/30 transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={product.imageUrl || "https://placehold.co/400x533/0f0d0a/c9a96e?text=UV"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-gray-400 text-xs tracking-[0.3em] uppercase">Sold Out</span>
            </div>
          )}
          {/* Quick add */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAdd}
              disabled={product.stock === 0}
              className="w-full bg-[#c9a96e] text-[#0a0805] text-[10px] tracking-[0.25em] uppercase py-3 flex items-center justify-center gap-2 font-medium hover:bg-[#d4b87a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ShoppingBag size={12} /> Add to Cart
            </button>
          </div>
        </div>
 
        {/* Info */}
        <div className="p-4">
          <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-1">{product.category}</p>
          <h3 className="text-white text-sm font-light tracking-wide truncate">{product.name}</h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[#c9a96e] font-medium">₹{product.price?.toLocaleString("en-IN")}</span>
            {product.ratings > 0 && (
              <div className="flex items-center gap-1">
                <Star size={10} className="text-[#c9a96e] fill-[#c9a96e]" />
                <span className="text-gray-300 text-[10px]">{product.ratings.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
