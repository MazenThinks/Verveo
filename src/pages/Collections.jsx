import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { collections, products } from '../data/products'
import ProductCard from '../components/ProductCard'

const Collections = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-24 md:pt-28 lg:pt-32 pb-16">
                {/* Header - Simplified & Bold */}
                <section className="mb-12 md:mb-16" aria-labelledby="page-title">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-4xl"
                    >
                        <h1 id="page-title" className="text-5xl md:text-6xl lg:text-7xl font-bold text-stone-900 dark:text-zinc-100 tracking-tight mb-4 transition-colors duration-300">
                            Collections
                        </h1>
                        <p className="text-base md:text-lg text-stone-600 dark:text-stone-400 leading-relaxed transition-colors duration-300">
                            Curated selections of products organized by theme and lifestyle
                        </p>
                    </motion.div>
                </section>

                {/* Collections Grid */}
                <section className="space-y-16 md:space-y-20">
                    {collections.map((collection, collectionIndex) => {
                        const collectionProducts = products.filter(p =>
                            collection.productIds.includes(p.id)
                        )

                        return (
                            <motion.div
                                key={collection.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6 }}
                                className="space-y-8"
                            >
                                {/* Collection Header */}
                                <div className="grid md:grid-cols-2 gap-12 items-center">
                                    <div className={collectionIndex % 2 === 0 ? 'order-1' : 'order-1 md:order-2'}>
                                        <div className="aspect-[4/3] bg-stone-100 dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-soft transition-colors duration-300">
                                            <img
                                                src={collection.image}
                                                alt={collection.name}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>
                                    </div>
                                    <div className={collectionIndex % 2 === 0 ? 'order-2' : 'order-2 md:order-1'}>
                                        <h2 className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-zinc-100 mb-4 transition-colors duration-300">
                                            {collection.name}
                                        </h2>
                                        <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-6 transition-colors duration-300">
                                            {collection.description}
                                        </p>
                                        <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400 transition-colors duration-300">
                                            <span>{collectionProducts.length} Products</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Collection Products */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                                    {collectionProducts.map((product, index) => (
                                        <ProductCard key={product.id} product={product} index={index} />
                                    ))}
                                </div>
                            </motion.div>
                        )
                    })}
                </section>

                {/* CTA */}
                <section className="mt-20 md:mt-24 py-12 md:py-16 bg-stone-50 dark:bg-zinc-900 rounded-3xl transition-colors duration-300">
                    <div className="max-w-2xl mx-auto text-center px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-zinc-100 transition-colors duration-300">
                                Explore All Products
                            </h2>
                            <p className="text-lg text-stone-600 dark:text-stone-400 transition-colors duration-300">
                                Discover our complete catalog of premium electronics
                            </p>
                            <Link
                                to="/discover"
                                className="inline-flex items-center gap-2 px-8 py-3.5 bg-stone-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-full hover:bg-stone-800 dark:hover:bg-stone-100 transition-all duration-300 hover:shadow-soft-lg active:scale-[0.98]"
                            >
                                Browse Catalog
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Collections
