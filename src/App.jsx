import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import CartDrawer from './components/CartDrawer'
import Game from './components/Game'

function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem('giftverse-cart')
    if (stored) setCart(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem('giftverse-cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id)
      if (exists) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...product, qty: 1 }]
    })
    setCartOpen(true)
  }

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id))
  const checkout = () => {
    alert('Checkout is a demo for now. Add payment to go live!')
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar onCartToggle={() => setCartOpen(true)} cartCount={cart.reduce((s,i)=>s+i.qty,0)} />
      <main>
        <Hero />
        <ProductGrid onAdd={addToCart} />
        <Game />
        <section id="about" className="py-16 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold mb-3">Why GiftVerse?</h3>
            <p className="text-slate-300 max-w-3xl">We combine curated gifts with playful, interactive experiences. Browse unique presents, play a quick game, and share a little joy with every order.</p>
          </div>
        </section>
      </main>
      <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} onCheckout={checkout} />
      <footer className="py-10 text-center text-slate-600">© {new Date().getFullYear()} GiftVerse. All rights reserved.</footer>
    </div>
  )
}

export default App
