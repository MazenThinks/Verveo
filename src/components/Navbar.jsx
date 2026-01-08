import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Heart, Search, X, User, LogOut, Moon, Sun } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useWishlist } from '../contexts/WishlistContext'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import AuthModal from './AuthModal'
import { products } from '../data/products'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [hoveredItem, setHoveredItem] = useState(null)
    const [activeItemBounds, setActiveItemBounds] = useState(null)
    const [hoveredItemBounds, setHoveredItemBounds] = useState(null)
    const [isSearchExpanded, setIsSearchExpanded] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchSuggestions, setSearchSuggestions] = useState([])
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
    const [authModalMode, setAuthModalMode] = useState('login')
    const location = useLocation()
    const navigate = useNavigate()
    const navRef = useRef(null)
    const searchInputRef = useRef(null)
    const searchContainerRef = useRef(null)
    const searchButtonRef = useRef(null)
    const userMenuRef = useRef(null)
    const { getCartCount } = useCart()
    const { wishlist } = useWishlist()
    const { user, logout } = useAuth()
    const { theme, toggleTheme } = useTheme()

    const cartCount = getCartCount()
    const wishlistCount = wishlist.length

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setIsMobileMenuOpen(false)
        setIsSearchExpanded(false)
        setSearchQuery('')
        updateActiveItemBounds()
    }, [location])

    // Close search function
    const closeSearch = () => {
        setIsSearchExpanded(false)
        setSearchQuery('')
        setSearchSuggestions([])
        setSelectedSuggestionIndex(-1)
    }

    // Focus search input when expanded
    useEffect(() => {
        if (isSearchExpanded && searchInputRef.current) {
            // Close mobile menu if search is opened
            setIsMobileMenuOpen(false)
            searchInputRef.current.focus()
        }
    }, [isSearchExpanded])

    // Close search when mobile menu opens
    useEffect(() => {
        if (isMobileMenuOpen) {
            closeSearch()
        }
    }, [isMobileMenuOpen])

    // Focus trap - keep focus within search when open
    const handleSearchKeyDown = (e) => {
        if (!isSearchExpanded) return

        // Handle keyboard navigation in suggestions
        if (searchSuggestions.length === 0) return

        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setSelectedSuggestionIndex(prev =>
                prev < searchSuggestions.length - 1 ? prev + 1 : prev
            )
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1)
        } else if (e.key === 'Enter' && selectedSuggestionIndex >= 0) {
            e.preventDefault()
            const selectedProduct = searchSuggestions[selectedSuggestionIndex]
            navigate(`/products/${selectedProduct.id}`)
            closeSearch()
        } else if (e.key === 'Tab' && !e.shiftKey && !searchQuery) {
            // If no query and trying to tab forward, close and continue
            e.preventDefault()
            closeSearch()
        }
    }

    // Generate search suggestions with debouncing for performance
    useEffect(() => {
        if (searchQuery.trim().length > 0) {
            const timeoutId = setTimeout(() => {
                const query = searchQuery.toLowerCase()
                const filtered = products.filter(product => {
                    const nameMatch = product.name.toLowerCase().includes(query)
                    const categoryMatch = product.category.toLowerCase().includes(query)
                    const brandMatch = product.name.split(' ')[0].toLowerCase().includes(query)
                    return nameMatch || categoryMatch || brandMatch
                }).slice(0, 6) // Limit to 6 suggestions

                setSearchSuggestions(filtered)
                setSelectedSuggestionIndex(-1)
            }, 150) // 150ms debounce for smooth typing

            return () => clearTimeout(timeoutId)
        } else {
            setSearchSuggestions([])
            setSelectedSuggestionIndex(-1)
        }
    }, [searchQuery])

    // Handle search submission
    const handleSearchSubmit = (e) => {
        e.preventDefault()

        // If a suggestion is selected, navigate to that product
        if (selectedSuggestionIndex >= 0 && searchSuggestions[selectedSuggestionIndex]) {
            const selectedProduct = searchSuggestions[selectedSuggestionIndex]
            navigate(`/products/${selectedProduct.id}`)
            closeSearch()
        } else if (searchQuery.trim()) {
            navigate(`/discover?search=${encodeURIComponent(searchQuery.trim())}`)
            closeSearch()
        }
    }



    // Handle clicking on a suggestion (memoized for performance)
    const handleSuggestionClick = useCallback((product) => {
        navigate(`/products/${product.id}`)
        closeSearch()
    }, [navigate])

    // Highlight matching text in suggestions (memoized for performance)
    const highlightMatch = useCallback((text, query) => {
        if (!query.trim()) return text

        try {
            const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
            const parts = text.split(regex)

            return parts.map((part, index) =>
                regex.test(part) ? (
                    <mark key={index} className="bg-yellow-200 text-slate-900 font-medium">
                        {part}
                    </mark>
                ) : (
                    <span key={index}>{part}</span>
                )
            )
        } catch {
            return text
        }
    }, [])

    // Close search on escape key or click outside
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isSearchExpanded) {
                closeSearch()
            }
            if (e.key === 'Escape' && isUserMenuOpen) {
                setIsUserMenuOpen(false)
            }
        }

        const handleClickOutside = (e) => {
            if (isSearchExpanded &&
                searchContainerRef.current &&
                !searchContainerRef.current.contains(e.target)) {
                closeSearch()
            }
            if (isUserMenuOpen &&
                userMenuRef.current &&
                !userMenuRef.current.contains(e.target)) {
                setIsUserMenuOpen(false)
            }
        }

        if (isSearchExpanded || isUserMenuOpen) {
            window.addEventListener('keydown', handleEscape)
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            window.removeEventListener('keydown', handleEscape)
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isSearchExpanded, isUserMenuOpen])

    const updateActiveItemBounds = () => {
        if (navRef.current) {
            const activeLink = navRef.current.querySelector('[data-active="true"]')
            if (activeLink) {
                const bounds = activeLink.getBoundingClientRect()
                const containerBounds = navRef.current.getBoundingClientRect()
                setActiveItemBounds({
                    left: bounds.left - containerBounds.left,
                    top: bounds.top - containerBounds.top,
                    width: bounds.width,
                    height: bounds.height,
                })
            }
        }
    }

    useEffect(() => {
        updateActiveItemBounds()
        window.addEventListener('resize', updateActiveItemBounds)
        return () => window.removeEventListener('resize', updateActiveItemBounds)
    }, [location])

    const handleMouseEnter = (e, path) => {
        const bounds = e.currentTarget.getBoundingClientRect()
        const containerBounds = navRef.current.getBoundingClientRect()
        setHoveredItemBounds({
            left: bounds.left - containerBounds.left,
            top: bounds.top - containerBounds.top,
            width: bounds.width,
            height: bounds.height,
        })
        setHoveredItem(path)
    }

    const handleMouseLeave = () => {
        setHoveredItem(null)
        setHoveredItemBounds(null)
    }

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/discover', label: 'Shop' },
        { path: '/collections', label: 'Collections' },
        { path: '/developer', label: 'Meet the Developer' },
    ]

    const highlightBounds = hoveredItem ? hoveredItemBounds : activeItemBounds

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-6'
                    }`}
            >
                <div className="flex justify-center px-6 lg:px-8">
                    <div
                        className={`relative backdrop-blur-xl bg-white/95 dark:bg-zinc-900/95 border border-stone-200/50 dark:border-zinc-800/50 rounded-full shadow-soft transition-all duration-500 ${isScrolled ? 'shadow-soft-lg bg-white dark:bg-zinc-900 border-stone-200/80 dark:border-zinc-800/80' : ''
                            }`}
                        style={{
                            transition: 'width 0.25s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.3s, border-color 0.3s',
                            willChange: 'width'
                        }}
                    >
                        <div className="flex items-center px-6 py-3 gap-4">
                            {/* Logo */}
                            <Link to="/" className="relative z-10 flex-shrink-0 mr-4">
                                <span className="text-3xl font-bold text-slate-900 dark:text-white font-caveat transition-colors duration-300">Verveo</span>
                            </Link>

                            {/* Desktop Navigation */}
                            <motion.div
                                ref={navRef}
                                className="hidden lg:flex items-center gap-4 relative"
                                onMouseLeave={handleMouseLeave}
                            >
                                {/* Nav Links Container */}
                                <div className="flex items-center relative">
                                    {/* Highlight Background */}
                                    {highlightBounds && (
                                        <motion.div
                                            key={location.pathname}
                                            className="absolute bg-slate-900/5 dark:bg-zinc-100/10 rounded-full transition-colors duration-300"
                                            initial={false}
                                            animate={{
                                                left: highlightBounds.left,
                                                top: highlightBounds.top,
                                                width: highlightBounds.width,
                                                height: highlightBounds.height,
                                            }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 380,
                                                damping: 30,
                                            }}
                                        />
                                    )}

                                    {navLinks.map((link) => {
                                        const isActive = location.pathname === link.path
                                        return (
                                            <Link
                                                key={link.path}
                                                to={link.path}
                                                data-active={isActive}
                                                onMouseEnter={(e) => handleMouseEnter(e, link.path)}
                                                aria-current={isActive ? 'page' : undefined}
                                                className={`relative px-5 py-2.5 text-sm font-medium transition-colors duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 focus:ring-offset-2 ${isActive
                                                    ? 'text-slate-900 dark:text-white'
                                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                                    }`}
                                            >
                                                {link.label}
                                            </Link>
                                        )
                                    })}
                                </div>

                                {/* Search Feature */}
                                <div className="flex items-center ml-2 pl-5 border-l border-stone-200 dark:border-slate-700 relative transition-colors duration-300">
                                    <div
                                        ref={searchContainerRef}
                                        className="relative flex items-center overflow-visible rounded-full"
                                    >
                                        <motion.div
                                            className={`flex items-center h-[42px] rounded-full transition-colors ${isSearchExpanded ? 'bg-stone-50 dark:bg-zinc-800' : ''}`}
                                            animate={{
                                                width: isSearchExpanded ? '320px' : '42px'
                                            }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 380,
                                                damping: 30,
                                                mass: 0.5
                                            }}
                                        >
                                            {/* Search Input */}
                                            <AnimatePresence mode="wait">
                                                {isSearchExpanded && (
                                                    <motion.form
                                                        onSubmit={handleSearchSubmit}
                                                        className="flex-1 flex items-center h-full"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                                    >
                                                        <input
                                                            ref={searchInputRef}
                                                            type="text"
                                                            value={searchQuery}
                                                            onChange={(e) => setSearchQuery(e.target.value)}
                                                            onKeyDown={handleSearchKeyDown}
                                                            placeholder="Search products..."
                                                            aria-label="Search products"
                                                            aria-autocomplete="list"
                                                            aria-expanded={searchSuggestions.length > 0}
                                                            aria-controls="search-suggestions"
                                                            aria-activedescendant={selectedSuggestionIndex >= 0 ? `suggestion-${searchSuggestions[selectedSuggestionIndex]?.id}` : undefined}
                                                            role="combobox"
                                                            className="flex-1 bg-transparent border-none outline-none pl-4 pr-2 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg transition-colors duration-300"
                                                        />

                                                        {/* Clear Button - Only show when there's text */}
                                                        <AnimatePresence>
                                                            {searchQuery && (
                                                                <motion.button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setSearchQuery('')
                                                                        searchInputRef.current?.focus()
                                                                    }}
                                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                                    animate={{ opacity: 1, scale: 1 }}
                                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                                    transition={{ duration: 0.15 }}
                                                                    className="flex-shrink-0 p-1.5 rounded-full hover:bg-stone-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1"
                                                                    aria-label="Clear search"
                                                                    tabIndex={0}
                                                                >
                                                                    <X className="w-3.5 h-3.5 text-slate-500" />
                                                                </motion.button>
                                                            )}
                                                        </AnimatePresence>
                                                    </motion.form>
                                                )}
                                            </AnimatePresence>

                                            {/* Search Icon Button */}
                                            <button
                                                ref={searchButtonRef}
                                                onClick={() => {
                                                    if (isSearchExpanded && searchQuery.trim()) {
                                                        handleSearchSubmit(new Event('submit'))
                                                    } else {
                                                        setIsSearchExpanded(!isSearchExpanded)
                                                    }
                                                }}
                                                className="flex-shrink-0 p-2.5 rounded-full hover:bg-stone-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                aria-label={isSearchExpanded && searchQuery ? "Submit search" : isSearchExpanded ? "Close search" : "Open search"}
                                                aria-expanded={isSearchExpanded}
                                                aria-haspopup="listbox"
                                            >
                                                <Search className="w-5 h-5 text-slate-700" />
                                            </button>
                                        </motion.div>

                                        {/* Search Suggestions Dropdown */}
                                        <AnimatePresence>
                                            {isSearchExpanded && searchQuery && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                                                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                                    id="search-suggestions"
                                                    role="listbox"
                                                    aria-label="Search suggestions"
                                                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden z-50"
                                                >
                                                    {searchSuggestions.length > 0 ? (
                                                        <>
                                                            <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
                                                                {searchSuggestions.length} {searchSuggestions.length === 1 ? 'result' : 'results'} found
                                                            </div>
                                                            <div className="py-2">
                                                                {searchSuggestions.map((product, index) => (
                                                                    <button
                                                                        key={product.id}
                                                                        id={`suggestion-${product.id}`}
                                                                        role="option"
                                                                        aria-selected={index === selectedSuggestionIndex}
                                                                        onClick={() => handleSuggestionClick(product)}
                                                                        onMouseEnter={() => setSelectedSuggestionIndex(index)}
                                                                        onMouseLeave={() => setSelectedSuggestionIndex(-1)}
                                                                        className={`w-full px-4 py-3 text-left transition-colors flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 ${index === selectedSuggestionIndex ? 'bg-stone-100' : 'hover:bg-stone-50'
                                                                            }`}
                                                                    >
                                                                        <img
                                                                            src={product.image}
                                                                            alt={product.name}
                                                                            className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                                                                        />
                                                                        <div className="flex-1 min-w-0">
                                                                            <div className="text-sm font-medium text-slate-900 truncate">
                                                                                {highlightMatch(product.name, searchQuery)}
                                                                            </div>
                                                                            <div className="text-xs text-slate-500 mt-0.5">
                                                                                {product.category} · ${product.price}
                                                                            </div>
                                                                        </div>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="px-4 py-6 text-center text-sm text-slate-500" role="status" aria-live="polite">
                                                            No results found for "{searchQuery}"
                                                        </div>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Cart & Wishlist Icons - Always show */}
                                <div className="flex items-center gap-2 ml-2 pl-2 border-l border-stone-200">
                                    {/* Theme Toggle */}
                                    <button
                                        onClick={toggleTheme}
                                        className="p-2.5 rounded-full hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 focus:ring-offset-2"
                                        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                                    >
                                        {theme === 'light' ? (
                                            <Moon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                                        ) : (
                                            <Sun className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                                        )}
                                    </button>

                                    <Link
                                        to="/wishlist"
                                        className="relative p-2.5 rounded-full hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 focus:ring-offset-2"
                                        aria-label={`Wishlist (${wishlistCount} items)`}
                                    >
                                        <Heart className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                                        {wishlistCount > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-stone-900 text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center">
                                                {wishlistCount}
                                            </span>
                                        )}
                                    </Link>

                                    <Link
                                        to="/cart"
                                        className="relative p-2.5 rounded-full hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 focus:ring-offset-2"
                                        aria-label={`Shopping cart (${cartCount} items)`}
                                    >
                                        <ShoppingCart className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                                        {cartCount > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-stone-900 text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center">
                                                {cartCount}
                                            </span>
                                        )}
                                    </Link>

                                    {/* User Menu - Only show when logged in */}
                                    {user && (
                                        <div className="relative ml-2 pl-2 border-l border-stone-200" ref={userMenuRef}>
                                            <button
                                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                                className="p-2.5 rounded-full hover:bg-stone-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 flex items-center gap-2"
                                                aria-label="User menu"
                                                aria-expanded={isUserMenuOpen}
                                            >
                                                <User className="w-5 h-5 text-slate-700" />
                                                <span className="text-sm font-medium text-slate-700 hidden xl:inline">
                                                    {user.name}
                                                </span>
                                            </button>

                                            {/* User Dropdown */}
                                            <AnimatePresence>
                                                {isUserMenuOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="absolute right-0 top-full mt-2 w-56 backdrop-blur-xl bg-white/95 border border-stone-200/50 rounded-2xl shadow-xl overflow-hidden z-10"
                                                    >
                                                        <div className="px-4 py-3 border-b border-stone-200">
                                                            <p className="text-sm font-medium text-slate-900">
                                                                {user.name}
                                                            </p>
                                                            <p className="text-xs text-stone-500 truncate">
                                                                {user.email}
                                                            </p>
                                                        </div>
                                                        <div className="py-2">
                                                            <button
                                                                onClick={() => {
                                                                    logout()
                                                                    setIsUserMenuOpen(false)
                                                                    navigate('/')
                                                                }}
                                                                className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-stone-50 transition-colors flex items-center gap-2"
                                                            >
                                                                <LogOut className="w-4 h-4" />
                                                                <span>Sign out</span>
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    )}
                                </div>

                                {/* Auth Buttons - Only show when logged out */}
                                <AnimatePresence>
                                    {!user && (
                                        <motion.div
                                            className="flex items-center gap-2 ml-2 pl-2 border-l border-stone-200"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <button
                                                onClick={() => {
                                                    setAuthModalMode('login')
                                                    setIsAuthModalOpen(true)
                                                }}
                                                className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 rounded-full"
                                            >
                                                Log in
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setAuthModalMode('signup')
                                                    setIsAuthModalOpen(true)
                                                }}
                                                className="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
                                            >
                                                Sign up
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            {/* Mobile Menu Button & Icons */}
                            <div className="lg:hidden flex items-center gap-1">
                                {/* Theme Toggle - Mobile */}
                                <button
                                    onClick={toggleTheme}
                                    className="p-2.5 rounded-full hover:bg-stone-100 dark:hover:bg-slate-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 focus:ring-offset-2"
                                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                                >
                                    {theme === 'light' ? (
                                        <Moon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                                    ) : (
                                        <Sun className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                                    )}
                                </button>

                                {/* Mobile Search Button */}
                                <button
                                    onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                                    className="relative p-2.5 rounded-full hover:bg-stone-100 dark:hover:bg-slate-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 focus:ring-offset-2"
                                    aria-label="Search"
                                    aria-expanded={isSearchExpanded}
                                >
                                    <Search className="w-5 h-5 text-slate-700" />
                                </button>

                                <Link
                                    to="/wishlist"
                                    className="relative p-2.5 rounded-full hover:bg-stone-100 dark:hover:bg-slate-800 transition-all duration-300"
                                    aria-label={`Wishlist (${wishlistCount} items)`}
                                >
                                    <Heart className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                                    {wishlistCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-stone-900 text-white text-xs font-medium w-4 h-4 rounded-full flex items-center justify-center">
                                            {wishlistCount}
                                        </span>
                                    )}
                                </Link>

                                <Link
                                    to="/cart"
                                    className="relative p-2.5 rounded-full hover:bg-stone-100 dark:hover:bg-slate-800 transition-all duration-300"
                                    aria-label={`Shopping cart (${cartCount} items)`}
                                >
                                    <ShoppingCart className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-stone-900 text-white text-xs font-medium w-4 h-4 rounded-full flex items-center justify-center">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>

                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="relative z-10 p-2.5 rounded-full hover:bg-stone-100 dark:hover:bg-slate-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 focus:ring-offset-2"
                                    aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                                    aria-expanded={isMobileMenuOpen}
                                >
                                    <svg
                                        className="w-6 h-6 text-slate-700 dark:text-slate-300"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        {isMobileMenuOpen ? (
                                            <path d="M6 18L18 6M6 6l12 12" />
                                        ) : (
                                            <path d="M4 6h16M4 12h16M4 18h16" />
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Search Overlay - Only visible on mobile */}
                <AnimatePresence>
                    {isSearchExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="lg:hidden overflow-hidden"
                        >
                            <div className="backdrop-blur-xl bg-white/95 border-t border-stone-200/50 px-6 py-4">
                                <form onSubmit={handleSearchSubmit} className="relative">
                                    <div className="relative flex items-center bg-stone-50 rounded-full overflow-hidden">
                                        <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
                                        <input
                                            ref={searchInputRef}
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onKeyDown={handleSearchKeyDown}
                                            placeholder="Search products..."
                                            aria-label="Search for products by name, brand, or category"
                                            aria-autocomplete="list"
                                            aria-expanded={searchSuggestions.length > 0}
                                            aria-controls="mobile-search-suggestions"
                                            aria-activedescendant={selectedSuggestionIndex >= 0 ? `mobile-suggestion-${searchSuggestions[selectedSuggestionIndex]?.id}` : undefined}
                                            role="combobox"
                                            className="w-full py-3 pl-12 pr-12 bg-transparent border-none outline-none text-sm text-slate-900 placeholder-slate-400 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-full"
                                        />

                                        {/* Clear Button */}
                                        <AnimatePresence>
                                            {searchQuery && (
                                                <motion.button
                                                    type="button"
                                                    onClick={() => {
                                                        setSearchQuery('')
                                                        searchInputRef.current?.focus()
                                                    }}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    transition={{ duration: 0.15 }}
                                                    className="absolute right-2 p-2 rounded-full hover:bg-stone-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                                    aria-label="Clear search"
                                                >
                                                    <X className="w-4 h-4 text-slate-500" />
                                                </motion.button>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Mobile Search Suggestions */}
                                    <AnimatePresence>
                                        {searchQuery && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                                                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                                id="mobile-search-suggestions"
                                                role="listbox"
                                                aria-label="Search suggestions"
                                                className="mt-3 bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden max-h-[60vh] overflow-y-auto"
                                            >
                                                {searchSuggestions.length > 0 ? (
                                                    <>
                                                        <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
                                                            {searchSuggestions.length} {searchSuggestions.length === 1 ? 'result' : 'results'} found
                                                        </div>
                                                        <div className="py-2">
                                                            {searchSuggestions.map((product, index) => (
                                                                <button
                                                                    key={product.id}
                                                                    id={`mobile-suggestion-${product.id}`}
                                                                    role="option"
                                                                    aria-selected={index === selectedSuggestionIndex}
                                                                    onClick={() => handleSuggestionClick(product)}
                                                                    onMouseEnter={() => setSelectedSuggestionIndex(index)}
                                                                    onMouseLeave={() => setSelectedSuggestionIndex(-1)}
                                                                    className={`w-full px-4 py-3 text-left transition-colors flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 ${index === selectedSuggestionIndex ? 'bg-stone-100' : 'hover:bg-stone-50'
                                                                        }`}
                                                                >
                                                                    <img
                                                                        src={product.image}
                                                                        alt={product.name}
                                                                        className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                                                                    />
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="text-sm font-medium text-slate-900 truncate">
                                                                            {highlightMatch(product.name, searchQuery)}
                                                                        </div>
                                                                        <div className="text-xs text-slate-500 mt-0.5">
                                                                            {product.category} · ${product.price}
                                                                        </div>
                                                                    </div>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="px-4 py-6 text-center text-sm text-slate-500" role="status" aria-live="polite">
                                                        No results found for "{searchQuery}"
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.98 }}
                            transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 35,
                            }}
                            className="lg:hidden mt-3 backdrop-blur-xl bg-white/95 border border-stone-200/50 rounded-3xl shadow-soft-lg p-4"
                        >

                            <div className="space-y-1">
                                {navLinks.map((link) => {
                                    const isActive = location.pathname === link.path
                                    return (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            className={`block px-5 py-3.5 text-base font-medium rounded-2xl transition-all duration-300 ${isActive
                                                ? 'text-slate-900 bg-slate-900/5'
                                                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-50'
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    )
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Auth Modal */}
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                initialMode={authModalMode}
            />
        </>
    )
}

export default Navbar
