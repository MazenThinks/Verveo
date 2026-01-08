import { motion } from 'framer-motion'
import { products } from '../data/products'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, ArrowRight } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useWishlist } from '../contexts/WishlistContext'

const FeaturedProducts = () => {
    const featuredProducts = products.filter(p => p.featured).slice(0, 3)
    const { addToCart } = useCart()
    const { addToWishlist, isInWishlist } = useWishlist()

    return (
        <section className="py-24 md:py-32 bg-gradient-to-b from-white to-stone-50/50 dark:from-zinc-950 dark:to-zinc-950/95 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-px bg-stone-300 dark:bg-zinc-800 transition-colors duration-300" />
                        <span className="text-sm font-medium text-stone-600 dark:text-stone-400 tracking-widest uppercase transition-colors duration-300">
                            This Month
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 dark:text-zinc-100 tracking-tight transition-colors duration-300">
                        Editor's Pick
                    </h2>
                </motion.div>

                {/* Featured Cards Grid */}
                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    {featuredProducts.map((product, index) => (
                        <motion.article
                            key={product.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: 0.7,
                                delay: index * 0.15,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            className="group relative"
                        >
                            <Link
                                to={`/product/${product.id}`}
                                className="block"
                            >
                                {/* Image */}
                                <motion.div
                                    whileHover={{ y: -4 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="relative aspect-[3/4] bg-stone-100 dark:bg-zinc-900 rounded-3xl overflow-hidden mb-6 shadow-soft group-hover:shadow-soft-xl transition-all duration-700"
                                >
                                    <motion.img
                                        whileHover={{ scale: 1.08 }}
                                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                        transition={{ duration: 0.4 }}
                                        className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent"
                                    />

                                    {/* Quick Actions */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileHover={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className="absolute bottom-6 left-6 right-6 flex gap-3"
                                    >
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                addToCart(product)
                                            }}
                                            className="flex-1 px-6 py-3.5 bg-white dark:bg-zinc-900 text-stone-900 dark:text-zinc-100 font-semibold rounded-full hover:bg-stone-100 dark:hover:bg-zinc-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-soft-lg"
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                            Add
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            transition={{ duration: 0.2 }}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                addToWishlist(product)
                                            }}
                                            className={`px-4 py-3.5 rounded-full transition-all duration-300 shadow-soft-lg ${isInWishlist(product.id)
                                                ? 'bg-stone-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
                                                : 'bg-white dark:bg-zinc-900 text-stone-900 dark:text-zinc-100 hover:bg-stone-100 dark:hover:bg-zinc-800'
                                                }`}
                                        >
                                            <motion.div
                                                animate={isInWishlist(product.id) ? { scale: [1, 1.2, 1] } : {}}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Heart
                                                    className="w-5 h-5"
                                                    fill={isInWishlist(product.id) ? 'currentColor' : 'none'}
                                                />
                                            </motion.div>
                                        </motion.button>
                                    </motion.div>
                                </motion.div>

                                {/* Content */}
                                <div className="space-y-3">
                                    <div>
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.15 + 0.2, duration: 0.5 }}
                                            className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-2 transition-colors duration-300"
                                        >
                                            {product.category}
                                        </motion.p>
                                        <h3 className="text-xl font-bold text-stone-900 dark:text-zinc-100 group-hover:text-stone-700 dark:group-hover:text-zinc-300 transition-colors line-clamp-2">
                                            {product.name}
                                        </h3>
                                    </div>
                                    <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed line-clamp-2 transition-colors duration-300">
                                        {product.description}
                                    </p>
                                    <div className="flex items-center justify-between pt-2">
                                        <p className="text-2xl font-bold text-stone-900 dark:text-zinc-100 transition-colors duration-300">
                                            ${product.price.toLocaleString()}
                                        </p>
                                        <span className="text-sm text-stone-500 dark:text-stone-400 flex items-center gap-1 transition-colors duration-300">
                                            View
                                            <motion.div
                                                animate={{ x: [0, 4, 0] }}
                                                transition={{
                                                    duration: 1.5,
                                                    repeat: Infinity,
                                                    repeatDelay: 2,
                                                    ease: "easeInOut"
                                                }}
                                            >
                                                <ArrowRight className="w-4 h-4" />
                                            </motion.div>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-center"
                >
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Link
                            to="/discover"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-stone-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold rounded-full hover:bg-stone-800 dark:hover:bg-zinc-200 transition-all duration-300 hover:shadow-soft-lg"
                        >
                            Explore Full Collection
                            <motion.div
                                animate={{ x: [0, 4, 0] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatDelay: 1,
                                    ease: "easeInOut"
                                }}
                            >
                                <ArrowRight className="w-5 h-5" />
                            </motion.div>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default FeaturedProducts
