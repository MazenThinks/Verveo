import { Link } from 'react-router-dom'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    const footerLinks = {
        product: [
            { label: 'Discover', path: '/discover' },
            { label: 'Collections', path: '/collections' },
            { label: 'What\'s New', path: '/new' },
        ],
        company: [
            { label: 'About Us', path: '/about' },
            { label: 'Meet the Developer', path: '/developer' },
        ],
        shop: [
            { label: 'All Products', path: '/discover' },
            { label: 'Wishlist', path: '/wishlist' },
            { label: 'Cart', path: '/cart' },
        ],
    }

    return (
        <footer className="bg-stone-50 dark:bg-zinc-950 border-t border-stone-200 dark:border-zinc-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link to="/" className="inline-block mb-4">
                            <span className="text-3xl font-bold text-slate-900 dark:text-zinc-100 font-caveat transition-colors duration-300">Verveo</span>
                        </Link>
                        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed transition-colors duration-300">
                            Premium electronics for the modern lifestyle.
                        </p>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-stone-900 dark:text-zinc-100 mb-4 transition-colors duration-300">Explore</h3>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.path}
                                        className="text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-stone-900 dark:text-zinc-100 mb-4 transition-colors duration-300">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.path}
                                        className="text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-zinc-100 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-stone-900 dark:text-zinc-100 mb-4 transition-colors duration-300">Shop</h3>
                        <ul className="space-y-3">
                            {footerLinks.shop.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.path}
                                        className="text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-zinc-100 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-stone-200 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 transition-colors duration-300">
                    <p className="text-sm text-stone-600 dark:text-stone-400 transition-colors duration-300">
                        © {currentYear} Verveo. All rights reserved.
                    </p>
                    <Link
                        to="/developer"
                        className="text-sm text-stone-500 dark:text-stone-500 hover:text-stone-900 dark:hover:text-zinc-100 transition-colors"
                    >
                        Designed & Built by Mazen Magdy
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer
