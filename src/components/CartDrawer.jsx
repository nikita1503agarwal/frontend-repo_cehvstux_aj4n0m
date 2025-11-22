import { X, Trash2 } from 'lucide-react'

function CartDrawer({ open, items, onClose, onRemove, onCheckout }) {
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <aside className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Your Cart</h3>
          <button onClick={onClose} className="p-2 rounded hover:bg-slate-100"><X className="h-5 w-5"/></button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-160px)]">
          {items.length === 0 ? (
            <p className="text-slate-500">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 border rounded-lg p-3">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="h-16 w-16 rounded object-cover"/>
                ) : (
                  <div className="h-16 w-16 rounded bg-slate-100"/>
                )}
                <div className="flex-1">
                  <p className="font-medium text-slate-900 line-clamp-1">{item.title}</p>
                  <p className="text-sm text-slate-600">Qty: {item.qty}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${(item.price * item.qty).toFixed(2)}</p>
                  <button onClick={() => onRemove(item.id)} className="text-red-600 text-sm inline-flex items-center gap-1 mt-1 hover:underline">
                    <Trash2 className="h-4 w-4"/> Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-600">Total</span>
            <span className="font-bold text-slate-900">${total.toFixed(2)}</span>
          </div>
          <button onClick={onCheckout} className="w-full bg-slate-900 text-white py-2.5 rounded-lg hover:bg-slate-800">
            Checkout
          </button>
        </div>
      </aside>
    </div>
  )
}

export default CartDrawer
