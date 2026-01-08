import { motion } from 'framer-motion'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import Breadcrumbs from '../components/Breadcrumbs'

const New = () => {
    // Get the most recent products (last 8)
    const newProducts = [...products].reverse().slice(0, 8)

    return (
        <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white dark:from-zinc-950 dark:to-zinc-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Breadcrumbs items={[{ label: 'What\'s New', href: '/new' }]} />

                {/* Header */}
                <section className="mt-8">
                    <div className="max-w-6xl mx-auto px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center space-y-6"
                        >
                            <div className="inline-flex items-center gap-2.5 px-5 py-2 bg-slate-900/5 dark:bg-zinc-100/5 rounded-full backdrop-blur-sm transition-colors duration-300">
                                <div className="w-1.5 h-1.5 bg-slate-900 dark:bg-zinc-100 rounded-full transition-colors duration-300" />
                                <span className="text-xs font-medium text-slate-700 dark:text-stone-300 tracking-wide uppercase transition-colors duration-300">Latest Arrivals</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-zinc-100 tracking-tight transition-colors duration-300">
                                What's New
                            </h1>
                            <p className="text-lg md:text-xl text-slate-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
                                Discover our latest additions to the collection. Fresh products, carefully curated for you.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Products Grid */}
                <section className="mt-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                            {newProducts.map((product, index) => (
                                <ProductCard key={product.id} product={product} index={index} />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default New
