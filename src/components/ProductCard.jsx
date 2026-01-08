import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Heart, ShoppingCart } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useWishlist } from '../contexts/WishlistContext'

const ProductCard = ({ product, index, priority = false }) => {
    const [isHovered, setIsHovered] = useState(false)
    const { addToCart } = useCart()
    const { addToWishlist, isInWishlist } = useWishlist()
    const isWishlisted = isInWishlist(product.id)

    const handleAddToCart = (e) => {
        e.preventDefault()
        addToCart(product)
    }

    const handleToggleWishlist = (e) => {
        e.preventDefault()
        addToWishlist(product)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{
                duration: 0.4,
                delay: Math.min(index * 0.01, 0.12),
                ease: [0.22, 1, 0.36, 1]
            }}
            className="group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            role="listitem"
        >
            <motion.div
                className="relative"
                whileTap={{ scale: 0.98 }}
            >
                <Link
                    to={`/product/${product.id}`}
                    className="block focus:outline-none focus:ring-4 focus:ring-stone-900 focus:ring-offset-4 rounded-3xl transition-all"
                    aria-label={`View details for ${product.name}, priced at $${product.price.toLocaleString()}`}
                    aria-describedby={`product-${product.id}-info`}
                >
                    {/* Image Container */}
                    <motion.div
                        className="relative aspect-[4/5] bg-stone-100 dark:bg-zinc-900 rounded-3xl overflow-hidden mb-4 shadow-soft transition-all duration-500"
                        whileHover={{
                            boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.12), 0 8px 16px -8px rgba(0, 0, 0, 0.08)'
                        }}
                    >
                        <motion.img
                            src={product.image}
                            alt={`${product.name}`}
                            className="w-full h-full object-cover"
                            loading={priority ? "eager" : "lazy"}
                            decoding="async"
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        />
                        {/* Soft Overlay on Hover */}
                        <motion.div
                            className="absolute inset-0 bg-slate-900/0"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.4 }}
                            style={{ backgroundColor: 'rgba(15, 23, 42, 0.05)' }}
                            aria-hidden="true"
                        />

                        {/* Hover Actions */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute bottom-4 left-4 right-4 flex gap-2"
                        >
                            <motion.button
                                onClick={handleToggleWishlist}
                                aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
                                aria-pressed={isWishlisted}
                                className={`px-4 py-3 backdrop-blur-sm text-sm font-medium rounded-full transition-colors duration-300 shadow-soft-lg focus:outline-none focus:ring-4 focus:ring-offset-2 ${isWishlisted
                                    ? 'bg-red-500/95 text-white hover:bg-red-600 focus:ring-red-500'
                                    : 'bg-white/95 dark:bg-zinc-800/95 text-slate-900 dark:text-zinc-100 hover:bg-white dark:hover:bg-zinc-800 focus:ring-stone-900 dark:focus:ring-zinc-100'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                <motion.div
                                    animate={{
                                        scale: isWishlisted ? [1, 1.2, 1] : 1,
                                        rotate: isWishlisted ? [0, -10, 10, 0] : 0
                                    }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} aria-hidden="true" />
                                </motion.div>
                            </motion.button>
                            <motion.button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                aria-label={product.stock === 0 ? `${product.name} is out of stock` : `Add ${product.name} to shopping cart for $${product.price.toLocaleString()}`}
                                className="flex-1 px-4 py-3 bg-slate-900/95 dark:bg-zinc-100/95 backdrop-blur-sm text-white dark:text-zinc-900 text-sm font-medium rounded-full hover:bg-slate-900 dark:hover:bg-zinc-100 transition-colors duration-300 shadow-soft-lg focus:outline-none focus:ring-4 focus:ring-white dark:focus:ring-zinc-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                whileHover={{ scale: product.stock > 0 ? 1.02 : 1 }}
                                whileTap={{ scale: product.stock > 0 ? 0.98 : 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                <motion.div
                                    whileHover={{ x: product.stock > 0 ? [0, -2, 0] : 0 }}
                                    transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 0.5 }}
                                >
                                    <ShoppingCart className="w-4 h-4" aria-hidden="true" />
                                </motion.div>
                                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* Product Info */}
                    <div id={`product-${product.id}-info`} className="space-y-2.5 px-1">
                        {/* Category & Stock Badge */}
                        <div className="flex items-center justify-between gap-2">
                            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider transition-colors duration-300">
                                {product.category}
                            </div>
                            {product.stock < 10 && product.stock > 0 && (
                                <div
                                    className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full"
                                    role="status"
                                    aria-label={`Low stock: Only ${product.stock} left`}
                                >
                                    Only {product.stock} left
                                </div>
                            )}
                            {product.stock === 0 && (
                                <div
                                    className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-full"
                                    role="status"
                                    aria-label="Out of stock"
                                >
                                    Out of Stock
                                </div>
                            )}
                        </div>

                        {/* Name */}
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-zinc-100 leading-snug group-hover:text-slate-700 dark:group-hover:text-zinc-300 transition-colors duration-300 line-clamp-2 min-h-[2.5rem]">
                            {product.name}
                        </h3>

                        {/* Price */}
                        <div className="text-lg font-bold text-slate-900 dark:text-zinc-100 transition-colors duration-300" aria-label={`Price: $${product.price.toLocaleString()}`}>
                            ${product.price.toLocaleString()}
                        </div>
                    </div>
                </Link>
            </motion.div>
        </motion.div>
    )
}

export default ProductCard
