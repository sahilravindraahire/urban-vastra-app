import {useEffect, useState} from 'react'
import {useDispatch} from "react-redux"
import {Plus, Edit2, Trash2, X, Upload} from "lucide-react"
import toast from "react-hot-toast"
import {fetchProducts, createProduct, updateProduct, deleteProduct} from "../../store/thunk/productThunk.js"
import {useProducts} from "../../hooks/index.js"
import {Loader, GoldButton} from "../../components/common/index.jsx"

const INITIAL = { name: "", description: "", price: "", category: "", stock: "" }

function AdminProducts() {

    const dispatch = useDispatch()
    const {products, loading} = useProducts()
    const [modal, setModal] = useState(false)
    const [editProduct, setEditProduct] = useState(null)
    const [form, setForm] = useState(INITIAL)
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState("")

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    const openModal = (product = null) => {
        setEditProduct(product)
        setForm(product ? {name: product.name, description: product.description, price: product.price, category: product.category, stock: product.stock} : INITIAL)
        setPreview(product?.imageUrl || "")
        setImage(null)
        setModal(true)
    }

    const closeModal = () => {
        setModal(false); setEditProduct(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const fd = new FormData()
        Object.entries(form).forEach(([k, v]) => fd.append(k, v))
        if(image) fd.append("image", image)

            let result

            if(editProduct){
                result = await dispatch(updateProduct({id: editProduct._id, formData: fd}))
                if(updateProduct.fulfilled.match(result)) toast.success("product updated")
            } else {
        if(!image) return toast.error("Image is required")
            result = await dispatch(createProduct(fd))
        if(createProduct.fulfilled.match(result)) toast.success("product created")
        }
    closeModal()
    }

    const handleFileChange = (e) => {
      const file = e.target.files[0]
      if(file){
        setImage(file)
        setPreview(URL.createObjectURL(file))
      }
    }

    const handleDelete = async (id) => {
        if(!confirm("Delete this product?")) return
        const result = await dispatch(deleteProduct(id))
        if(deleteProduct.fulfilled.match(result)) toast.success("Product deleted")
    }

  return (
    <div className="min-h-screen bg-[#0a0805] pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#c9a96e] text-[10px] tracking-[0.4em] uppercase mb-1">Admin</p>
            <h1 className="text-white text-2xl md:text-3xl font-light tracking-wide">Products</h1>
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-[#c9a96e] text-[#0a0805] px-5 py-3 text-[10px] tracking-[0.25em] uppercase font-medium hover:bg-[#d4b87a] transition-colors"
          >
            <Plus size={12} /> Add Product
          </button>
        </div>
 
        {loading ? <Loader /> : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#c9a96e]/10">
                  {["Product", "Category", "Price", "Stock", "Actions"].map((h) => (
                    <th key={h} className="text-left py-4 pr-6 text-[10px] tracking-[0.3em] uppercase text-gray-500 font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b border-[#c9a96e]/5 hover:bg-[#c9a96e]/3 transition-colors">
                    <td className="py-4 pr-6">
                      <div className="flex items-center gap-3">
                        <img src={product.imageUrl} alt={product.name} className="w-10 h-14 object-cover border border-[#c9a96e]/10" />
                        <span className="text-white text-sm font-light max-w-[200px] truncate">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-4 pr-6 text-gray-500 text-xs tracking-wider">{product.category}</td>
                    <td className="py-4 pr-6 text-[#c9a96e] text-sm">₹{product.price?.toLocaleString("en-IN")}</td>
                    <td className="py-4 pr-6">
                      <span className={`text-xs tracking-wider ${product.stock > 0 ? "text-green-400" : "text-red-400"}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => openModal(product)} className="text-gray-500 hover:text-[#c9a96e] transition-colors">
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => handleDelete(product._id)} className="text-gray-500 hover:text-red-400 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
 
      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f0d0a] border border-[#c9a96e]/20 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-[#c9a96e]/10">
              <h2 className="text-white text-sm tracking-widest uppercase">{editProduct ? "Edit Product" : "Add Product"}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-white transition-colors"><X size={16} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Image upload */}
              <div>
                <label className="text-[10px] tracking-[0.25em] uppercase text-gray-400 block mb-2">Product Image</label>
                <div className="border border-dashed border-[#c9a96e]/20 hover:border-[#c9a96e]/40 transition-colors p-4 text-center cursor-pointer relative">
                  <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                  {preview ? (
                    <img src={preview} alt="preview" className="h-32 mx-auto object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 py-4">
                      <Upload size={20} className="text-[#c9a96e]/40" />
                      <span className="text-gray-600 text-xs tracking-wider">Click to upload image</span>
                    </div>
                  )}
                </div>
              </div>
 
              {[
                { label: "Product Name", name: "name" },
                { label: "Description", name: "description" },
                { label: "Category", name: "category" },
                { label: "Price (₹)", name: "price", type: "number" },
                { label: "Stock", name: "stock", type: "number" },
              ].map(({ label, name, type = "text" }) => (
                <div key={name}>
                  <label className="text-[10px] tracking-[0.25em] uppercase text-gray-400 block mb-2">{label}</label>
                  {name === "description" ? (
                    <textarea
                      name={name}
                      value={form[name]}
                      onChange={(e) => setForm((p) => ({ ...p, [name]: e.target.value }))}
                      rows={3}
                      className="w-full bg-transparent border border-[#c9a96e]/20 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#c9a96e]/60 resize-none"
                      required
                    />
                  ) : (
                    <input
                      type={type}
                      name={name}
                      value={form[name]}
                      onChange={(e) => setForm((p) => ({ ...p, [name]: e.target.value }))}
                      className="w-full bg-transparent border border-[#c9a96e]/20 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#c9a96e]/60"
                      required
                    />
                  )}
                </div>
              ))}
 
              <div className="pt-2">
                <GoldButton type="submit" disabled={loading}>
                  {editProduct ? "Update Product" : "Create Product"}
                </GoldButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminProducts
