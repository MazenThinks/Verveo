import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ToastProvider } from './contexts/ToastContext'
import { CartProvider } from './contexts/CartContext'
import { WishlistProvider } from './contexts/WishlistContext'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Discover from './pages/Discover'
import ProductDetail from './pages/ProductDetail'
import Collections from './pages/Collections'
import New from './pages/New'
import About from './pages/About'
import Developer from './pages/Developer'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'

const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
}

const AnimatedRoutes = () => {
    const location = useLocation()

    return (
        <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<motion.div {...pageTransition}><Home /></motion.div>} />
                <Route path="/discover" element={<motion.div {...pageTransition}><Discover /></motion.div>} />
                <Route path="/product/:id" element={<motion.div {...pageTransition}><ProductDetail /></motion.div>} />
                <Route path="/collections" element={<motion.div {...pageTransition}><Collections /></motion.div>} />
                <Route path="/new" element={<motion.div {...pageTransition}><New /></motion.div>} />
                <Route path="/about" element={<motion.div {...pageTransition}><About /></motion.div>} />
                <Route path="/developer" element={<motion.div {...pageTransition}><Developer /></motion.div>} />
                <Route path="/cart" element={<motion.div {...pageTransition}><Cart /></motion.div>} />
                <Route path="/wishlist" element={<motion.div {...pageTransition}><Wishlist /></motion.div>} />
                <Route path="/checkout" element={<motion.div {...pageTransition}><Checkout /></motion.div>} />
                <Route path="/order-confirmation/:orderId" element={<motion.div {...pageTransition}><OrderConfirmation /></motion.div>} />
            </Routes>
        </AnimatePresence>
    )
}

function App() {
    return (
        <Router>
            <ThemeProvider>
                <ToastProvider>
                    <AuthProvider>
                        <CartProvider>
                            <WishlistProvider>
                                <ScrollToTop />
                                <a href="#main-content" className="skip-to-content">
                                    Skip to main content
                                </a>
                                <div className="min-h-screen flex flex-col bg-transparent">
                                    <Navbar />
                                    <main id="main-content" className="flex-grow" role="main">
                                        <AnimatedRoutes />
                                    </main>
                                    <Footer />
                                </div>
                            </WishlistProvider>
                        </CartProvider>
                    </AuthProvider>
                </ToastProvider>
            </ThemeProvider>
        </Router>
    )
}

export default App
