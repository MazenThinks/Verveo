import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../contexts/CartContext'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import EmptyState from '../components/EmptyState'
import Breadcrumbs from '../components/Breadcrumbs'

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart()

    const handleQuantityChange = (item, newQuantity) => {
        if (newQuantity < 1) return
        if (newQuantity > item.stock) {
            return
        }
        updateQuantity(item.id, newQuantity)
    }

    const cartTotal = getCartTotal()

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white dark:from-zinc-950 dark:to-zinc-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <Breadcrumbs items={[{ label: 'Cart', href: '/cart' }]} />
                    <EmptyState
                        icon={ShoppingBag}
                        title="Nothing here yet"
                        description="Your cart's looking a bit lonely. Let's fix that."
                        actionLabel="Find Something Good"
                        actionLink="/discover"
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white dark:from-slate-950 dark:to-slate-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Breadcrumbs items={[{ label: 'Cart', href: '/cart' }]} />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8"
                >
                    <h1 className="text-3xl font-semibold text-stone-900 dark:text-zinc-100 mb-8 transition-colors duration-300">
                        Shopping Cart
                    </h1>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300"
                                >
                                    <div className="flex gap-6">
                                        {/* Product Image */}
                                        <Link
                                            to={`/product/${item.id}`}
                                            className="flex-shrink-0"
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-24 h-24 object-cover rounded-xl"
                                            />
                                        </Link>

                                        {/* Product Details */}
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <Link
                                                        to={`/product/${item.id}`}
                                                        className="text-lg font-semibold text-stone-900 dark:text-zinc-100 hover:text-stone-600 dark:hover:text-zinc-300 transition-colors"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                    <p className="text-sm text-stone-500 dark:text-stone-400 mt-1 transition-colors duration-300">
                                                        {item.category}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-stone-500 dark:text-stone-400 mb-1 transition-colors duration-300">
                                                        ${item.price.toLocaleString()} each
                                                    </p>
                                                    <p className="text-lg font-bold text-stone-900 dark:text-zinc-100 transition-colors duration-300">
                                                        ${(item.price * item.quantity).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-stone-600 dark:text-stone-400 mr-2 transition-colors duration-300">Qty:</span>
                                                    <button
                                                        onClick={() =>
                                                            handleQuantityChange(
                                                                item,
                                                                item.quantity - 1
                                                            )
                                                        }
                                                        disabled={item.quantity <= 1}
                                                        className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <Minus className="w-4 h-4 text-stone-600 dark:text-stone-400" />
                                                    </button>
                                                    <span className="w-10 text-center font-semibold text-stone-900 dark:text-zinc-100 transition-colors duration-300">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            handleQuantityChange(
                                                                item,
                                                                item.quantity + 1
                                                            )
                                                        }
                                                        disabled={item.quantity >= item.stock}
                                                        className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <Plus className="w-4 h-4 text-stone-600 dark:text-stone-400" />
                                                    </button>
                                                </div>

                                                {/* Remove Button */}
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 px-3 py-1.5 rounded-lg transition-all"
                                                    aria-label="Remove item from cart"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    <span className="text-sm font-medium">
                                                        Remove
                                                    </span>
                                                </button>
                                            </div>

                                            {/* Stock Warning */}
                                            {item.quantity >= item.stock && (
                                                <p className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-3 py-1.5 rounded-lg mt-3 inline-block transition-colors duration-300">
                                                    ⚠️ Maximum quantity reached ({item.stock} in stock)
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-soft sticky top-24 transition-colors duration-300"
                            >
                                <h2 className="text-xl font-semibold text-stone-900 dark:text-zinc-100 mb-6 transition-colors duration-300">
                                    Order Summary
                                </h2>

                                <div className="space-y-3 mb-6 pb-6 border-b border-stone-200 dark:border-zinc-800 transition-colors duration-300">
                                    <div className="flex justify-between text-stone-600 dark:text-stone-400 transition-colors duration-300">
                                        <span>Items ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
                                        <span className="font-medium">${cartTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-stone-600 dark:text-stone-400 transition-colors duration-300">
                                        <span>Shipping</span>
                                        <span className="text-serene-600 dark:text-serene-400 font-semibold transition-colors duration-300">Free</span>
                                    </div>
                                    <div className="flex justify-between text-stone-600 dark:text-stone-400 transition-colors duration-300">
                                        <span>Tax</span>
                                        <span className="text-sm">Calculated at checkout</span>
                                    </div>
                                </div>

                                <div className="flex justify-between text-xl font-bold text-stone-900 dark:text-zinc-100 mb-6 transition-colors duration-300">
                                    <span>Total</span>
                                    <span>${cartTotal.toLocaleString()}</span>
                                </div>

                                <Link
                                    to="/checkout"
                                    className="w-full bg-stone-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-4 px-6 rounded-full font-semibold hover:bg-stone-800 dark:hover:bg-zinc-200 transition-all hover:shadow-soft-lg flex items-center justify-center gap-2"
                                >
                                    Proceed to Checkout
                                </Link>

                                <Link
                                    to="/discover"
                                    className="w-full mt-3 bg-stone-100 dark:bg-zinc-800 text-stone-900 dark:text-zinc-100 py-3 px-6 rounded-full font-medium hover:bg-stone-200 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center"
                                >
                                    Continue Shopping
                                </Link>

                                <div className="mt-6 pt-6 border-t border-stone-200 dark:border-zinc-800 space-y-2.5 text-sm text-stone-600 dark:text-stone-400 transition-colors duration-300">
                                    <p className="flex items-center gap-2">
                                        <span className="text-electric-600">✓</span>
                                        Free shipping on all orders
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="text-electric-600">✓</span>
                                        30-day return policy
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="text-electric-600">✓</span>
                                        Secure payment
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
