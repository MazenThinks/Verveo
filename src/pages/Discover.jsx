import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard'
import Breadcrumbs from '../components/Breadcrumbs'

const Discover = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [sortBy, setSortBy] = useState('featured')
    const [searchQuery, setSearchQuery] = useState('')
    const productsGridRef = useRef(null)
    const searchInputRef = useRef(null)
    const [announceText, setAnnounceText] = useState('')

    // Sync search query with URL params on mount
    useEffect(() => {
        const searchParam = searchParams.get('search')
        if (searchParam) {
            setSearchQuery(searchParam)
            // Clear the URL param after reading it
            setSearchParams({}, { replace: true })
        }
    }, [])

    const filteredProducts = products.filter(product => {
        // Category filter
        const matchesCategory = selectedCategory === 'all' ||
            product.category.toLowerCase() === selectedCategory

        // Enhanced search filter - search across name, category, and description
        const matchesSearch = searchQuery === '' || [
            product.name,
            product.category,
            product.description
        ].some(field =>
            field.toLowerCase().includes(searchQuery.toLowerCase())
        )

        return matchesCategory && matchesSearch
    })

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price
        if (sortBy === 'price-high') return b.price - a.price
        if (sortBy === 'name') return a.name.localeCompare(b.name)
        return 0
    })

    const hasActiveFilters = selectedCategory !== 'all' || searchQuery !== ''

    const clearSearch = () => {
        setSearchQuery('')
        if (searchInputRef.current) {
            searchInputRef.current.focus()
        }
    }

    const clearFilters = () => {
        setSelectedCategory('all')
        setSearchQuery('')
        if (searchInputRef.current) {
            searchInputRef.current.focus()
        }
    }

    // Keyboard accessibility - Escape to clear search
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && searchQuery && document.activeElement === searchInputRef.current) {
                clearSearch()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [searchQuery])

    // Announce filter changes to screen readers
    useEffect(() => {
        setAnnounceText(`Showing ${sortedProducts.length} ${sortedProducts.length === 1 ? 'product' : 'products'}`)
    }, [sortedProducts.length])

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId)
        const category = categories.find(c => c.id === categoryId)
        setAnnounceText(`Category changed to ${category?.name || 'All Products'}`)
    }

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
            {/* Skip Link for Keyboard Navigation */}
            <a
                href="#products-grid"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-stone-900 focus:text-white focus:rounded-lg focus:font-medium focus:shadow-xl focus:ring-4 focus:ring-stone-900 focus:ring-offset-4 transition-all"
            >
                Skip to products
            </a>

            {/* Screen Reader Announcements */}
            <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="sr-only"
            >
                {announceText}
            </div>

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
                            Shop
                        </h1>
                        <p className="text-base md:text-lg text-stone-600 dark:text-stone-400 leading-relaxed transition-colors duration-300" aria-live="polite">
                            {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'} {hasActiveFilters ? 'matching your filters' : 'available'}
                        </p>
                    </motion.div>
                </section>

                {/* Filters - Horizontal, Clean */}
                <section className="mb-12 md:mb-16 border-b border-stone-200 dark:border-slate-800 pb-8 transition-colors duration-300" aria-label="Product filters">
                    {/* Categories - Full Width Line */}
                    <div
                        className="flex items-center gap-2.5 overflow-x-auto scrollbar-hide py-3 mb-6"
                        role="group"
                        aria-label="Filter by category"
                    >
                        {categories.map((category) => (
                            <motion.button
                                key={category.id}
                                onClick={() => handleCategoryChange(category.id)}
                                aria-pressed={selectedCategory === category.id}
                                aria-label={`Filter by ${category.name}. ${selectedCategory === category.id ? 'Currently selected' : ''}`}
                                className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-stone-900 focus:ring-offset-2 ${selectedCategory === category.id
                                    ? 'bg-stone-900 dark:bg-white text-white dark:text-slate-900 shadow-lg'
                                    : 'bg-stone-100 dark:bg-zinc-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-zinc-700 focus:bg-stone-200 dark:focus:bg-zinc-700'
                                    }`}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {category.name}
                            </motion.button>
                        ))}
                    </div>

                    {/* Search and Sort Controls - Second Line */}
                    <div className="flex items-center gap-4 py-2">
                        {/* Search */}
                        <motion.div
                            className="relative flex-1 max-w-md"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            <label htmlFor="product-search" className="sr-only">
                                Search products
                            </label>
                            <input
                                ref={searchInputRef}
                                id="product-search"
                                type="text"
                                placeholder="Search by name, category, or brand..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                aria-label="Search products by name, category, or brand"
                                aria-describedby="search-hint"
                                className="w-full px-4 py-2 pl-10 pr-10 bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-stone-400 dark:focus:border-zinc-700 focus:bg-white dark:focus:bg-zinc-800 transition-all duration-200 text-stone-900 dark:text-zinc-100 placeholder:text-stone-400 dark:placeholder:text-stone-500"
                            />
                            <motion.svg
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-500 pointer-events-none transition-colors duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                animate={{ rotate: searchQuery ? [0, 5, -5, 0] : 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </motion.svg>

                            {/* Clear Search Button */}
                            <AnimatePresence>
                                {searchQuery && (
                                    <motion.button
                                        type="button"
                                        onClick={clearSearch}
                                        aria-label="Clear search"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-stone-200 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-900/20"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.15 }}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <X className="w-3.5 h-3.5 text-stone-500" />
                                    </motion.button>
                                )}
                            </AnimatePresence>

                            <span id="search-hint" className="sr-only">
                                Press Escape to clear search
                            </span>
                        </motion.div>

                        {/* Sort */}
                        <div className="flex-shrink-0">
                            <label htmlFor="sort-products" className="sr-only">
                                Sort products
                            </label>
                            <motion.select
                                id="sort-products"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                aria-label="Sort products by"
                                className="px-4 py-2 bg-stone-50 border-2 border-stone-200 rounded-lg text-sm font-medium focus:outline-none focus:border-stone-900 focus:ring-4 focus:ring-stone-900/20 transition-all duration-300 text-stone-700 cursor-pointer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                            >
                                <option value="featured">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="name">Name: A to Z</option>
                            </motion.select>
                        </div>
                    </div>

                    {/* Active Filters Indicator */}
                    {hasActiveFilters && (
                        <motion.div
                            className="mt-6 flex items-center gap-3"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <span className="text-sm text-stone-500" id="active-filters-label">Active filters:</span>
                            <motion.button
                                onClick={clearFilters}
                                aria-label="Clear all active filters"
                                aria-describedby="active-filters-label"
                                className="text-sm text-stone-700 hover:text-stone-900 underline underline-offset-2 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-stone-900/30 focus:rounded px-2 py-1"
                                whileHover={{ scale: 1.05, x: 2 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                Clear all
                            </motion.button>
                        </motion.div>
                    )}
                </section>

                {/* Products Grid - Optimized for 50 items */}
                <section
                    id="products-grid"
                    ref={productsGridRef}
                    aria-label="Product listing"
                    aria-live="polite"
                    aria-atomic="false"
                >
                    <AnimatePresence mode="wait">
                        {sortedProducts.length > 0 ? (
                            <motion.div
                                key={`${selectedCategory}-${searchQuery}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12 scroll-mt-24"
                                role="list"
                            >
                                {sortedProducts.map((product, index) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        index={index}
                                        priority={index < 6}
                                    />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="text-center py-32"
                            >
                                <motion.div
                                    className="w-16 h-16 mx-auto bg-stone-100 rounded-2xl flex items-center justify-center mb-6"
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.4, delay: 0.1 }}
                                >
                                    <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </motion.div>
                                <h3 className="text-2xl font-semibold text-stone-900 mb-3">
                                    No products found
                                </h3>
                                <p className="text-stone-500 mb-8 max-w-md mx-auto">
                                    Try adjusting your search or filters to find what you're looking for
                                </p>
                                {hasActiveFilters && (
                                    <motion.button
                                        onClick={clearFilters}
                                        aria-label="Clear all filters to show all products"
                                        className="px-6 py-3 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-stone-900 focus:ring-offset-4"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        Clear filters
                                    </motion.button>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>
            </div>
        </div>
    )
}

export default Discover
