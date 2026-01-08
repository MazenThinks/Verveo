import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useWishlist } from '../contexts/WishlistContext'
import { useCart } from '../contexts/CartContext'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
import EmptyState from '../components/EmptyState'
import Breadcrumbs from '../components/Breadcrumbs'

export default function Wishlist() {
    const { wishlist, removeFromWishlist } = useWishlist()
    const { addToCart } = useCart()

    const handleMoveToCart = (item) => {
        addToCart(item)
        removeFromWishlist(item.id)
    }

    if (wishlist.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white dark:from-zinc-950 dark:to-zinc-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <Breadcrumbs items={[{ label: 'Wishlist', href: '/wishlist' }]} />
                    <EmptyState
                        icon={Heart}
                        title="No favorites yet"
                        description="Start bookmarking the tech you're eyeing. We'll keep it safe here."
                        actionLabel="Browse Products"
                        actionLink="/discover"
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white dark:from-slate-950 dark:to-slate-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Breadcrumbs items={[{ label: 'Wishlist', href: '/wishlist' }]} />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-stone-900 dark:text-zinc-100 mb-1 transition-colors duration-300">
                                Your Favorites
                            </h1>
                            <p className="text-stone-600 dark:text-stone-400 transition-colors duration-300">
                                {wishlist.length} {wishlist.length === 1 ? 'item saved' : 'items saved'}
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlist.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300"
                            >
                                {/* Product Image */}
                                <Link
                                    to={`/product/${item.id}`}
                                    className="block relative aspect-square overflow-hidden bg-stone-50 dark:bg-zinc-800 transition-colors duration-300"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {item.stock < 10 && item.stock > 0 && (
                                        <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                                            {item.stock} left
                                        </div>
                                    )}
                                    {item.stock === 0 && (
                                        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                                            Out of stock
                                        </div>
                                    )}
                                </Link>

                                {/* Product Details */}
                                <div className="p-4">
                                    <Link to={`/product/${item.id}`}>
                                        <p className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1.5 transition-colors duration-300">
                                            {item.category}
                                        </p>
                                        <h3 className="font-semibold text-stone-900 dark:text-zinc-100 group-hover:text-stone-600 dark:group-hover:text-zinc-300 transition-colors mb-2 line-clamp-2">
                                            {item.name}
                                        </h3>
                                        <p className="text-lg font-bold text-stone-900 dark:text-zinc-100 mb-4 transition-colors duration-300">
                                            ${item.price.toLocaleString()}
                                        </p>
                                    </Link>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleMoveToCart(item)}
                                            disabled={item.stock === 0}
                                            className="flex-1 bg-stone-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-2.5 px-4 rounded-full text-sm font-semibold hover:bg-stone-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {item.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                        </button>
                                        <button
                                            onClick={() => removeFromWishlist(item.id)}
                                            className="p-2.5 bg-stone-100 dark:bg-zinc-800 text-stone-600 dark:text-stone-400 rounded-full hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                            aria-label="Remove from wishlist"
                                        >
                                            <Heart className="w-4 h-4 fill-current" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Continue Shopping */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-12 text-center"
                    >
                        <Link
                            to="/discover"
                            className="inline-flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-zinc-100 font-medium transition-colors"
                        >
                            ← Continue Shopping
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
