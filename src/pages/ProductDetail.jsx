import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Share2, ShoppingCart, Minus, Plus } from 'lucide-react'
import { products } from '../data/products'
import { useCart } from '../contexts/CartContext'
import { useWishlist } from '../contexts/WishlistContext'
import { useToast } from '../contexts/ToastContext'
import Breadcrumbs from '../components/Breadcrumbs'

const ProductDetail = () => {
    const { id } = useParams()
    const product = products.find(p => p.id === parseInt(id))
    const [selectedImage, setSelectedImage] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [shareMenuOpen, setShareMenuOpen] = useState(false)

    const { addToCart } = useCart()
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
    const { addToast } = useToast()

    const isWishlisted = isInWishlist(product?.id)

    if (!product) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <Breadcrumbs items={[{ label: 'Discover', href: '/discover' }]} />
                    <div className="mt-20 text-center">
                        <h1 className="text-4xl font-bold text-slate-900 mb-4">Product not found</h1>
                        <Link to="/discover" className="text-slate-600 hover:text-slate-900 underline">
                            Return to discover
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    const images = product.images || [product.image]

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product)
        }
        setQuantity(1)
    }

    const handleToggleWishlist = () => {
        if (isWishlisted) {
            removeFromWishlist(product.id)
        } else {
            addToWishlist(product)
        }
    }

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change
        if (newQuantity >= 1 && newQuantity <= product.stock) {
            setQuantity(newQuantity)
        }
    }

    const handleShare = (platform) => {
        const url = window.location.href
        const text = `Check out ${product.name} on Verveo`

        const shareUrls = {
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            email: `mailto:?subject=${encodeURIComponent(product.name)}&body=${encodeURIComponent(text + ' ' + url)}`
        }

        if (platform === 'copy') {
            navigator.clipboard.writeText(url)
            setShareMenuOpen(false)
            addToast('Link copied to clipboard')
        } else {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400')
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white dark:from-zinc-950 dark:to-zinc-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Breadcrumbs
                    items={[
                        { label: 'Discover', href: '/discover' },
                        { label: product.name, href: `/product/${product.id}` },
                    ]}
                />

                {/* Product Content */}
                <div className="mt-8 grid lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
                    {/* Images */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        {/* Main Image */}
                        <div className="aspect-[4/5] bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-soft-lg transition-colors duration-300">
                            <img
                                src={images[selectedImage]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Image Thumbnails */}
                        {images.length > 1 && (
                            <div className="flex gap-4">
                                {images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`flex-1 aspect-square rounded-xl overflow-hidden transition-all duration-300 ${selectedImage === index
                                            ? 'ring-2 ring-slate-900 ring-offset-4'
                                            : 'opacity-60 hover:opacity-100'
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} view ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex flex-col space-y-6"
                    >
                        {/* Category Badge */}
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-slate-900/5 dark:bg-zinc-100/5 rounded-full w-fit transition-colors duration-300">
                            <div className="w-1.5 h-1.5 bg-slate-900 dark:bg-zinc-100 rounded-full transition-colors duration-300" />
                            <span className="text-xs font-medium text-slate-700 dark:text-stone-300 tracking-widest uppercase transition-colors duration-300">
                                {product.category}
                            </span>
                        </div>

                        {/* Title & Price */}
                        <div className="space-y-3">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-zinc-100 tracking-tight leading-tight transition-colors duration-300">
                                {product.name}
                            </h1>
                            <div className="flex items-baseline gap-4 flex-wrap">
                                <p className="text-3xl font-bold text-slate-900 dark:text-zinc-100 transition-colors duration-300" aria-label={`Price: $${product.price}`}>
                                    ${product.price.toLocaleString()}
                                </p>
                                {product.stock < 10 && product.stock > 0 && (
                                    <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-3 py-1.5 rounded-full transition-colors duration-300">
                                        Only {product.stock} left in stock
                                    </p>
                                )}
                                {product.stock === 0 && (
                                    <p className="text-sm font-semibold text-red-600 bg-red-50 px-3 py-1.5 rounded-full">
                                        Out of Stock
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-lg text-slate-600 dark:text-stone-400 leading-relaxed transition-colors duration-300">
                            {product.description}
                        </p>

                        {/* Quantity Selector */}
                        {product.stock > 0 && (
                            <div className="space-y-3 pt-2">
                                <label className="block text-sm font-semibold text-slate-900 dark:text-zinc-100 transition-colors duration-300">
                                    Quantity
                                </label>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        disabled={quantity <= 1}
                                        className="w-11 h-11 rounded-xl bg-white dark:bg-zinc-900 border-2 border-stone-200 dark:border-zinc-800 hover:border-stone-300 dark:hover:border-zinc-700 hover:bg-stone-50 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-zinc-100 focus:ring-offset-2"
                                        aria-label="Decrease quantity"
                                    >
                                        <Minus className="w-5 h-5 text-slate-700 dark:text-stone-400" />
                                    </button>
                                    <span className="min-w-[3rem] text-center text-xl font-bold text-slate-900 dark:text-zinc-100 transition-colors duration-300">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        disabled={quantity >= product.stock}
                                        className="w-11 h-11 rounded-xl bg-white dark:bg-zinc-900 border-2 border-stone-200 dark:border-zinc-800 hover:border-stone-300 dark:hover:border-zinc-700 hover:bg-stone-50 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-zinc-100 focus:ring-offset-2"
                                        aria-label="Increase quantity"
                                    >
                                        <Plus className="w-5 h-5 text-slate-700 dark:text-stone-400" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                className="flex-1 px-8 py-4 bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full font-medium shadow-soft-lg hover:shadow-soft-xl hover:bg-slate-800 dark:hover:bg-zinc-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-zinc-100 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                            </button>
                            <button
                                onClick={handleToggleWishlist}
                                aria-pressed={isWishlisted}
                                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                                className={`px-6 py-4 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-zinc-100 focus:ring-offset-2 ${isWishlisted
                                    ? 'bg-red-500 dark:bg-red-600 text-white shadow-soft-lg hover:bg-red-600 dark:hover:bg-red-700'
                                    : 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 shadow-soft hover:shadow-soft-lg'
                                    }`}
                            >
                                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                            </button>
                            <div className="relative">
                                <button
                                    onClick={() => setShareMenuOpen(!shareMenuOpen)}
                                    aria-expanded={shareMenuOpen}
                                    aria-label="Share product"
                                    aria-haspopup="true"
                                    className="p-4 bg-white dark:bg-zinc-900 border-2 border-stone-200 dark:border-zinc-800 rounded-full font-medium shadow-soft hover:shadow-soft-lg transition-all duration-300 text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-zinc-100 focus:ring-offset-2"
                                >
                                    <Share2 className="w-5 h-5" />
                                </button>

                                {/* Share Menu */}
                                {shareMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 rounded-2xl shadow-soft-xl p-2 z-50 transition-colors duration-300"
                                        role="menu"
                                        aria-label="Share options"
                                    >
                                        <button
                                            onClick={() => handleShare('twitter')}
                                            className="w-full text-left px-4 py-3 rounded-xl hover:bg-stone-50 dark:hover:bg-zinc-800 transition-colors text-sm font-medium text-slate-700 dark:text-stone-300 focus:outline-none focus:bg-stone-100 dark:focus:bg-zinc-800"
                                            role="menuitem"
                                        >
                                            Share on Twitter
                                        </button>
                                        <button
                                            onClick={() => handleShare('facebook')}
                                            className="w-full text-left px-4 py-3 rounded-xl hover:bg-stone-50 dark:hover:bg-zinc-800 transition-colors text-sm font-medium text-slate-700 dark:text-stone-300 focus:outline-none focus:bg-stone-100 dark:focus:bg-zinc-800"
                                            role="menuitem"
                                        >
                                            Share on Facebook
                                        </button>
                                        <button
                                            onClick={() => handleShare('email')}
                                            className="w-full text-left px-4 py-3 rounded-xl hover:bg-stone-50 dark:hover:bg-zinc-800 transition-colors text-sm font-medium text-slate-700 dark:text-stone-300 focus:outline-none focus:bg-stone-100 dark:focus:bg-zinc-800"
                                            role="menuitem"
                                        >
                                            Share via Email
                                        </button>
                                        <div className="border-t border-stone-200 dark:border-zinc-800 my-2 transition-colors duration-300" />
                                        <button
                                            onClick={() => handleShare('copy')}
                                            className="w-full text-left px-4 py-3 rounded-xl hover:bg-stone-50 transition-colors text-sm font-medium text-slate-700 focus:outline-none focus:bg-stone-100"
                                            role="menuitem"
                                        >
                                            Copy Link
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Product Story */}
                {product.story && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto my-24 text-center"
                    >
                        <h2 className="text-sm font-semibold text-slate-500 tracking-widest uppercase mb-6">
                            The Story
                        </h2>
                        <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-light">
                            {product.story}
                        </p>
                    </motion.section>
                )}

                {/* Specifications */}
                {product.specs && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="max-w-4xl mx-auto mb-24"
                    >
                        <h2 className="text-sm font-semibold text-slate-500 tracking-widest uppercase mb-8 text-center">
                            Technical Specifications
                        </h2>
                        <div className="bg-white rounded-2xl shadow-soft p-8 md:p-12">
                            <div className="space-y-6">
                                {Object.entries(product.specs).map(([key, value], index) => (
                                    <div
                                        key={key}
                                        className={`flex justify-between items-start gap-8 py-4 ${index !== Object.entries(product.specs).length - 1
                                            ? 'border-b border-stone-200/50'
                                            : ''
                                            }`}
                                    >
                                        <span className="text-slate-500 font-medium min-w-[120px]">
                                            {key}
                                        </span>
                                        <span className="text-slate-900 text-right">
                                            {value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.section>
                )}
            </div>
        </div>
    )
}

export default ProductDetail
