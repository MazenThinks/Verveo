import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../contexts/CartContext'
import { useToast } from '../contexts/ToastContext'
import { ChevronLeft, CreditCard, Lock, Package, Truck, Check } from 'lucide-react'
import Breadcrumbs from '../components/Breadcrumbs'

export default function Checkout() {
    const navigate = useNavigate()
    const { cart, getCartTotal, clearCart } = useCart()
    const { showToast } = useToast()
    const [currentStep, setCurrentStep] = useState(1)
    const [processing, setProcessing] = useState(false)

    const [shippingInfo, setShippingInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
    })

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
    })

    const cartTotal = getCartTotal()
    const tax = cartTotal * 0.08 // 8% tax
    const orderTotal = cartTotal + tax

    // Redirect if cart is empty
    if (cart.length === 0) {
        navigate('/cart')
        return null
    }

    const steps = [
        { number: 1, name: 'Shipping', icon: Truck },
        { number: 2, name: 'Payment', icon: CreditCard },
        { number: 3, name: 'Review', icon: Package },
    ]

    const handleShippingSubmit = (e) => {
        e.preventDefault()
        setCurrentStep(2)
    }

    const handlePaymentSubmit = (e) => {
        e.preventDefault()
        setCurrentStep(3)
    }

    const handlePlaceOrder = async () => {
        setProcessing(true)

        // Simulate payment processing
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Generate mock order ID
        const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase()

        // Clear cart
        clearCart()

        // Navigate to confirmation
        navigate(`/order-confirmation/${orderId}`, {
            state: {
                orderDetails: {
                    orderId,
                    items: cart,
                    subtotal: cartTotal,
                    tax,
                    total: orderTotal,
                    shippingInfo,
                },
            },
        })

        showToast('Order placed successfully!', 'success')
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white dark:from-zinc-950 dark:to-zinc-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Breadcrumbs
                    items={[
                        { label: 'Cart', href: '/cart' },
                        { label: 'Checkout', href: '/checkout' },
                    ]}
                />

                {/* Progress Steps */}
                <div className="mt-8 mb-12">
                    <div className="flex items-center justify-center">
                        {steps.map((step, index) => (
                            <div key={step.number} className="flex items-center">
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${currentStep >= step.number
                                            ? 'bg-stone-900 text-white'
                                            : 'bg-stone-200 text-stone-500'
                                            }`}
                                    >
                                        {currentStep > step.number ? (
                                            <Check className="w-6 h-6" />
                                        ) : (
                                            <step.icon className="w-6 h-6" />
                                        )}
                                    </div>
                                    <span
                                        className={`mt-2 text-sm font-medium ${currentStep >= step.number
                                            ? 'text-stone-900'
                                            : 'text-stone-500'
                                            }`}
                                    >
                                        {step.name}
                                    </span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div
                                        className={`w-24 h-0.5 mx-4 transition-colors ${currentStep > step.number
                                            ? 'bg-stone-900'
                                            : 'bg-stone-200'
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Forms */}
                    <div className="lg:col-span-2">
                        <AnimatePresence mode="wait">
                            {/* Step 1: Shipping Information */}
                            {currentStep === 1 && (
                                <motion.div
                                    key="shipping"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-soft transition-colors duration-300"
                                >
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-2 transition-colors duration-300">
                                            Shipping Information
                                        </h2>
                                        <p className="text-stone-600 dark:text-stone-400 transition-colors duration-300">Where should we deliver your order?</p>
                                    </div>
                                    <form onSubmit={handleShippingSubmit} className="space-y-6">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2 transition-colors duration-300">
                                                    First Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={shippingInfo.firstName}
                                                    onChange={(e) =>
                                                        setShippingInfo({
                                                            ...shippingInfo,
                                                            firstName: e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-stone-900 dark:text-zinc-100 focus:border-stone-400 dark:focus:border-zinc-700 focus:ring focus:ring-stone-200 dark:focus:ring-zinc-800 focus:ring-opacity-50 transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2 transition-colors duration-300">
                                                    Last Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={shippingInfo.lastName}
                                                    onChange={(e) =>
                                                        setShippingInfo({
                                                            ...shippingInfo,
                                                            lastName: e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-stone-900 dark:text-zinc-100 focus:border-stone-400 dark:focus:border-zinc-700 focus:ring focus:ring-stone-200 dark:focus:ring-zinc-800 focus:ring-opacity-50 transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2 transition-colors duration-300">
                                                    Email *
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={shippingInfo.email}
                                                    onChange={(e) =>
                                                        setShippingInfo({
                                                            ...shippingInfo,
                                                            email: e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-stone-900 dark:text-zinc-100 focus:border-stone-400 dark:focus:border-zinc-700 focus:ring focus:ring-stone-200 dark:focus:ring-zinc-800 focus:ring-opacity-50 transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2 transition-colors duration-300">
                                                    Phone *
                                                </label>
                                                <input
                                                    type="tel"
                                                    required
                                                    value={shippingInfo.phone}
                                                    onChange={(e) =>
                                                        setShippingInfo({
                                                            ...shippingInfo,
                                                            phone: e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-stone-900 dark:text-zinc-100 focus:border-stone-400 dark:focus:border-zinc-700 focus:ring focus:ring-stone-200 dark:focus:ring-zinc-800 focus:ring-opacity-50 transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2 transition-colors duration-300">
                                                Address *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={shippingInfo.address}
                                                onChange={(e) =>
                                                    setShippingInfo({
                                                        ...shippingInfo,
                                                        address: e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-stone-900 dark:text-zinc-100 focus:border-stone-400 dark:focus:border-zinc-700 focus:ring focus:ring-stone-200 dark:focus:ring-zinc-800 focus:ring-opacity-50 transition-colors"
                                            />
                                        </div>

                                        <div className="grid sm:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-stone-700 mb-2">
                                                    City *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={shippingInfo.city}
                                                    onChange={(e) =>
                                                        setShippingInfo({
                                                            ...shippingInfo,
                                                            city: e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-stone-400 focus:ring focus:ring-stone-200 focus:ring-opacity-50 transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-stone-700 mb-2">
                                                    State *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={shippingInfo.state}
                                                    onChange={(e) =>
                                                        setShippingInfo({
                                                            ...shippingInfo,
                                                            state: e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-stone-400 focus:ring focus:ring-stone-200 focus:ring-opacity-50 transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-stone-700 mb-2">
                                                    ZIP Code *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={shippingInfo.zipCode}
                                                    onChange={(e) =>
                                                        setShippingInfo({
                                                            ...shippingInfo,
                                                            zipCode: e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-stone-400 focus:ring focus:ring-stone-200 focus:ring-opacity-50 transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex gap-4 pt-6">
                                            <button
                                                type="button"
                                                onClick={() => navigate('/cart')}
                                                className="flex-1 bg-stone-100 text-stone-900 py-3.5 px-6 rounded-full font-semibold hover:bg-stone-200 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                                Back to Cart
                                            </button>
                                            <button
                                                type="submit"
                                                className="flex-1 bg-stone-900 text-white py-3.5 px-6 rounded-full font-semibold hover:bg-stone-800 transition-all hover:shadow-soft-lg"
                                            >
                                                Continue to Payment
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            )}

                            {/* Step 2: Payment Information */}
                            {currentStep === 2 && (
                                <motion.div
                                    key="payment"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-soft transition-colors duration-300"
                                >
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-2 transition-colors duration-300">
                                            Payment Method
                                        </h2>
                                        <p className="text-stone-600 dark:text-stone-400 transition-colors duration-300">Secure payment processing</p>
                                    </div>
                                    <form onSubmit={handlePaymentSubmit} className="space-y-6">
                                        <div className="bg-electric-50 border border-electric-200 rounded-xl p-4 flex items-start gap-3">
                                            <Lock className="w-5 h-5 text-electric-600 mt-0.5 flex-shrink-0" />
                                            <div className="text-sm text-electric-900">
                                                <p className="font-semibold mb-1">Demo Mode</p>
                                                <p className="text-electric-800">
                                                    This is a demonstration. No real payment will be processed.
                                                    <span className="block mt-1 font-medium">Test card: 4242 4242 4242 4242</span>
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-stone-700 mb-2">
                                                Card Number *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="4242 4242 4242 4242"
                                                value={paymentInfo.cardNumber}
                                                onChange={(e) =>
                                                    setPaymentInfo({
                                                        ...paymentInfo,
                                                        cardNumber: e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-stone-400 focus:ring focus:ring-stone-200 focus:ring-opacity-50 transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-stone-700 mb-2">
                                                Cardholder Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={paymentInfo.cardName}
                                                onChange={(e) =>
                                                    setPaymentInfo({
                                                        ...paymentInfo,
                                                        cardName: e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-stone-400 focus:ring focus:ring-stone-200 focus:ring-opacity-50 transition-colors"
                                            />
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-stone-700 mb-2">
                                                    Expiry Date *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="MM/YY"
                                                    value={paymentInfo.expiryDate}
                                                    onChange={(e) =>
                                                        setPaymentInfo({
                                                            ...paymentInfo,
                                                            expiryDate: e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-stone-400 focus:ring focus:ring-stone-200 focus:ring-opacity-50 transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-stone-700 mb-2">
                                                    CVV *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="123"
                                                    value={paymentInfo.cvv}
                                                    onChange={(e) =>
                                                        setPaymentInfo({
                                                            ...paymentInfo,
                                                            cvv: e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-stone-400 focus:ring focus:ring-stone-200 focus:ring-opacity-50 transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex gap-4 pt-6">
                                            <button
                                                type="button"
                                                onClick={() => setCurrentStep(1)}
                                                className="flex-1 bg-stone-100 text-stone-900 py-3.5 px-6 rounded-full font-semibold hover:bg-stone-200 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                                Back
                                            </button>
                                            <button
                                                type="submit"
                                                className="flex-1 bg-stone-900 text-white py-3.5 px-6 rounded-full font-semibold hover:bg-stone-800 transition-all hover:shadow-soft-lg"
                                            >
                                                Review Order
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            )}

                            {/* Step 3: Review Order */}
                            {currentStep === 3 && (
                                <motion.div
                                    key="review"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-stone-900 mb-2">
                                            Review Your Order
                                        </h2>
                                        <p className="text-stone-600">Please review your order details before placing it.</p>
                                    </div>
                                    {/* Shipping Details */}
                                    <div className="bg-white rounded-2xl p-6 shadow-soft">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-semibold text-stone-900">
                                                Shipping Address
                                            </h3>
                                            <button
                                                onClick={() => setCurrentStep(1)}
                                                className="text-sm text-stone-600 hover:text-stone-900"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                        <div className="text-stone-600 space-y-1">
                                            <p>
                                                {shippingInfo.firstName} {shippingInfo.lastName}
                                            </p>
                                            <p>{shippingInfo.address}</p>
                                            <p>
                                                {shippingInfo.city}, {shippingInfo.state}{' '}
                                                {shippingInfo.zipCode}
                                            </p>
                                            <p>{shippingInfo.email}</p>
                                            <p>{shippingInfo.phone}</p>
                                        </div>
                                    </div>

                                    {/* Payment Details */}
                                    <div className="bg-white rounded-2xl p-6 shadow-soft">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-semibold text-stone-900">
                                                Payment Method
                                            </h3>
                                            <button
                                                onClick={() => setCurrentStep(2)}
                                                className="text-sm text-stone-600 hover:text-stone-900"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                        <div className="text-stone-600">
                                            <p>
                                                •••• •••• ••••{' '}
                                                {paymentInfo.cardNumber.slice(-4)}
                                            </p>
                                            <p className="text-sm mt-1">
                                                {paymentInfo.cardName}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="bg-white rounded-2xl p-6 shadow-soft">
                                        <h3 className="text-lg font-semibold text-stone-900 mb-4">
                                            Order Items
                                        </h3>
                                        <div className="space-y-4">
                                            {cart.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex gap-4 pb-4 border-b border-stone-100 last:border-0 last:pb-0"
                                                >
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-20 h-20 object-cover rounded-lg"
                                                    />
                                                    <div className="flex-grow">
                                                        <h4 className="font-medium text-stone-900">
                                                            {item.name}
                                                        </h4>
                                                        <p className="text-sm text-stone-500">
                                                            Qty: {item.quantity}
                                                        </p>
                                                    </div>
                                                    <p className="font-semibold text-stone-900">
                                                        $
                                                        {(
                                                            item.price * item.quantity
                                                        ).toLocaleString()}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Place Order Button */}
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setCurrentStep(2)}
                                            className="flex-1 bg-stone-100 text-stone-900 py-3 px-6 rounded-xl font-medium hover:bg-stone-200 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                            Back
                                        </button>
                                        <button
                                            onClick={handlePlaceOrder}
                                            disabled={processing}
                                            className="flex-1 bg-stone-900 text-white py-4 px-8 rounded-full font-semibold hover:bg-stone-800 hover:shadow-soft-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                                        >
                                            {processing ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Processing Order...
                                                </span>
                                            ) : (
                                                'Place Order'
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl p-6 shadow-soft sticky top-24"
                        >
                            <h3 className="text-lg font-semibold text-stone-900 mb-4">
                                Order Summary
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-stone-600">
                                    <span>Subtotal ({cart.length} items)</span>
                                    <span>${cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-stone-600">
                                    <span>Shipping</span>
                                    <span className="text-serene-600 font-semibold">Free</span>
                                </div>
                                <div className="flex justify-between text-stone-600">
                                    <span>Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-stone-200 pt-3">
                                    <div className="flex justify-between text-lg font-semibold text-stone-900">
                                        <span>Total</span>
                                        <span>${orderTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-stone-200 space-y-3 text-sm text-stone-600">
                                <div className="flex items-center gap-2">
                                    <Lock className="w-4 h-4" />
                                    <span>Secure SSL encryption</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Truck className="w-4 h-4" />
                                    <span>Free shipping on all orders</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Package className="w-4 h-4" />
                                    <span>30-day return policy</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}
