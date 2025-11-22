import { useState } from 'react'
import { ShoppingCart, Gamepad2, Gift, Menu } from 'lucide-react'

function Navbar({ onCartToggle, cartCount }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-semibold text-slate-800">
            <Gift className="h-6 w-6 text-pink-600" />
            <span>GiftVerse</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-slate-700">
            <a href="#products" className="hover:text-slate-900">Gifts</a>
            <a href="#game" className="hover:text-slate-900 flex items-center gap-2"><Gamepad2 className="h-4 w-4"/>Play</a>
            <a href="#about" className="hover:text-slate-900">About</a>
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => onCartToggle?.()} className="relative inline-flex items-center justify-center rounded-full bg-slate-900 text-white h-10 w-10 hover:bg-slate-800 transition">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 min-w-[1.25rem] px-1 rounded-full bg-pink-600 text-white text-xs flex items-center justify-center">{cartCount}</span>
              )}
            </button>
            <button className="md:hidden p-2" onClick={() => setOpen(o => !o)}>
              <Menu className="h-6 w-6"/>
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-2 text-slate-700">
            <a href="#products" className="py-1">Gifts</a>
            <a href="#game" className="py-1">Play</a>
            <a href="#about" className="py-1">About</a>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
