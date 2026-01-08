import { useLocation, useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, Package, Truck, Mail } from 'lucide-react'
import Breadcrumbs from '../components/Breadcrumbs'

export default function OrderConfirmation() {
    const { orderId } = useParams()
    const location = useLocation()
    const orderDetails = location.state?.orderDetails

    if (!orderDetails) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-stone-600 mb-4">Order not found</p>
                    <Link
                        to="/"
                        className="text-stone-900 hover:text-stone-600 underline"
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Breadcrumbs
                    items={[
                        { label: 'Cart', href: '/cart' },
                        { label: 'Checkout', href: '/checkout' },
                        { label: 'Order Confirmation', href: `/order-confirmation/${orderId}` },
                    ]}
                />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-8 text-center mb-12"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="w-24 h-24 bg-electric-100 rounded-full flex items-center justify-center shadow-soft-lg">
                            <CheckCircle className="w-14 h-14 text-electric-600" />
                        </div>
                    </motion.div>
                    <h1 className="text-4xl font-bold text-stone-900 mb-3">
                        Order Confirmed!
                    </h1>
                    <p className="text-lg text-stone-600 mb-2">
                        Thank you for your purchase, {orderDetails.shippingInfo.firstName}!
                    </p>
                    <p className="text-sm text-stone-500 bg-stone-50 inline-block px-4 py-2 rounded-full font-mono">
                        Order #{orderId}
                    </p>
                </motion.div>

                {/* Order Status */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl p-8 shadow-soft mb-8"
                >
                    <div className="grid sm:grid-cols-3 gap-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 bg-serene-50 rounded-full flex items-center justify-center">
                                    <Mail className="w-8 h-8 text-serene-600" />
                                </div>
                            </div>
                            <h3 className="font-semibold text-stone-900 mb-2">
                                Confirmation Sent
                            </h3>
                            <p className="text-sm text-stone-600">
                                to {orderDetails.shippingInfo.email}
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 bg-electric-50 rounded-full flex items-center justify-center">
                                    <Package className="w-8 h-8 text-electric-600" />
                                </div>
                            </div>
                            <h3 className="font-semibold text-stone-900 mb-2">
                                Processing Order
                            </h3>
                            <p className="text-sm text-stone-600">
                                Within 1-2 business days
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 bg-electric-50 rounded-full flex items-center justify-center">
                                    <Truck className="w-8 h-8 text-electric-700" />
                                </div>
                            </div>
                            <h3 className="font-semibold text-stone-900 mb-2">
                                Estimated Delivery
                            </h3>
                            <p className="text-sm text-stone-600">
                                3-5 business days
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Order Details */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-white rounded-2xl p-8 shadow-soft mb-8"
                >
                    <h2 className="text-xl font-bold text-stone-900 mb-6">
                        Order Items
                    </h2>
                    <div className="space-y-5">
                        {orderDetails.items.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex gap-5 pb-5 border-b border-stone-100 last:border-0 last:pb-0"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-24 h-24 object-cover rounded-xl shadow-soft"
                                />
                                <div className="flex-grow">
                                    <h3 className="font-semibold text-stone-900 mb-1">
                                        {item.name}
                                    </h3>
                                    <p className="text-sm text-stone-500">
                                        Quantity: {item.quantity}
                                    </p>
                                </div>
                                <p className="font-bold text-stone-900 text-lg">
                                    ${(item.price * item.quantity).toLocaleString()}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-stone-200 space-y-3">
                        <div className="flex justify-between text-stone-600">
                            <span>Subtotal</span>
                            <span>${orderDetails.subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-stone-600">
                            <span>Shipping</span>
                            <span className="text-serene-600 font-semibold">Free</span>
                        </div>
                        <div className="flex justify-between text-stone-600">
                            <span>Tax</span>
                            <span>${orderDetails.tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-semibold text-stone-900 pt-2">
                            <span>Total</span>
                            <span>${orderDetails.total.toFixed(2)}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Shipping Address */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-white rounded-2xl p-8 shadow-soft mb-8"
                >
                    <h2 className="text-xl font-bold text-stone-900 mb-6">
                        Shipping Address
                    </h2>
                    <div className="text-stone-600 space-y-1 text-sm leading-relaxed">
                        <p className="font-semibold text-stone-900 text-base mb-2">
                            {orderDetails.shippingInfo.firstName}{' '}
                            {orderDetails.shippingInfo.lastName}
                        </p>
                        <p>{orderDetails.shippingInfo.address}</p>
                        <p>
                            {orderDetails.shippingInfo.city},{' '}
                            {orderDetails.shippingInfo.state}{' '}
                            {orderDetails.shippingInfo.zipCode}
                        </p>
                        <p>{orderDetails.shippingInfo.country}</p>
                        <p className="pt-3 flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {orderDetails.shippingInfo.email}
                        </p>
                    </div>
                </motion.div>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <Link
                        to="/"
                        className="flex-1 bg-stone-900 text-white py-4 px-6 rounded-full font-semibold hover:bg-stone-800 hover:shadow-soft-lg transition-all text-center"
                    >
                        Continue Shopping
                    </Link>
                    <button
                        onClick={() => window.print()}
                        className="flex-1 bg-stone-100 text-stone-900 py-4 px-6 rounded-full font-semibold hover:bg-stone-200 transition-all"
                    >
                        Print Receipt
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-center text-sm text-stone-600"
                >
                    <p>Questions about your order?</p>
                    <Link
                        to="/about"
                        className="text-stone-900 hover:text-stone-600 underline"
                    >
                        Contact our support team
                    </Link>
                </motion.div>
            </div >
        </div >
    )
}
