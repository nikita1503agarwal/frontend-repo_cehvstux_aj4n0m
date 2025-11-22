import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative pt-28 md:pt-32 pb-12 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50 via-white to-white pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-pink-700 bg-pink-100 rounded-full px-3 py-1 text-xs font-semibold mb-4">
              New
              <span className="opacity-70">Interactive Gaming Gifts</span>
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
              Gifts for gamers and everyone you love
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Discover unique gifts, limited editions, and a fun mini‑game that lets you win discounts.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#products" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition">
                Shop gifts
              </a>
              <a href="#game" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-white text-slate-900 border border-slate-300 hover:bg-slate-50 transition">
                Play the mini‑game
              </a>
            </div>
          </div>
          <div className="h-[420px] md:h-[520px] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
            <Spline scene="https://prod.spline.design/cVzHR3fQnWrlrLT7/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
