import { useEffect, useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function ProductCard({ product, onAdd }) {
  return (
    <div className="group bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
      {product.image ? (
        <img src={product.image} alt={product.title} className="h-40 w-full object-cover" />
      ) : (
        <div className="h-40 w-full bg-slate-100" />
      )}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-semibold text-slate-900 line-clamp-2">{product.title}</h3>
        <p className="text-sm text-slate-600 line-clamp-2">{product.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-bold text-slate-900">${product.price?.toFixed(2)}</span>
          <button onClick={() => onAdd(product)} className="px-3 py-1.5 text-sm rounded-md bg-slate-900 text-white hover:bg-slate-800">Add</button>
        </div>
      </div>
    </div>
  )
}

function ProductGrid({ onAdd }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/products`)
        const data = await res.json()
        setItems(data.items || [])
      } catch (e) {
        setItems([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // Seed demo cards if nothing in DB
  const fallback = [
    { id: '1', title: 'Retro Handheld Console', description: 'Portable nostalgia machine with 100+ classic games.', price: 89.99, image: 'https://images.unsplash.com/photo-1719929831784-1f363b14110f?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxSZXRybyUyMEhhbmRoZWxkJTIwQ29uc29sZXxlbnwwfDB8fHwxNzYzNzg0MDY3fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80' },
    { id: '2', title: 'Mystery Gift Box', description: 'A curated surprise box packed with delight.', price: 39.00, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop' },
    { id: '3', title: 'Custom Pixel Art Portrait', description: 'Turn any photo into charming pixel art.', price: 29.00, image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1600&auto=format&fit=crop' },
    { id: '4', title: 'Plush Bouquet', description: 'A bouquet made of adorable plushies.', price: 24.50, image: 'https://images.unsplash.com/photo-1719929831784-1f363b14110f?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxSZXRybyUyMEhhbmRoZWxkJTIwQ29uc29sZXxlbnwwfDB8fHwxNzYzNzg0MDY3fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80' },
  ]

  const list = loading ? [] : (items.length ? items : fallback)

  return (
    <section id="products" className="py-14 md:py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Popular gifts</h2>
            <p className="text-slate-600">Hand-picked presents for every occasion</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-56 bg-slate-100 animate-pulse rounded-xl" />
            ))
          ) : (
            list.map(p => (
              <ProductCard key={p.id} product={p} onAdd={onAdd} />
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default ProductGrid
