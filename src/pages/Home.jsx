import Hero from '../components/Hero'
import FeaturedProducts from '../components/FeaturedProducts'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { products } from '../data/products'

const Home = () => {
    // Get best sellers (first 4 products)
    const bestSellers = products.slice(0, 4)

    return (
        <div>
            <Hero />

            {/* Featured Products - Editorial Layout */}
            <FeaturedProducts />

            {/* Statement Section */}
            <section className="relative py-32 md:py-40 bg-stone-900 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '40px 40px',
                }} />
                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight">
                            "Technology should feel{' '}
                            <span className="text-white/40">invisible</span> until you need it,{' '}
                            <span className="text-white/40">exceptional</span> when you use it."
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Best Sellers - Improved Hierarchy */}
            <section className="py-24 md:py-32 bg-white dark:bg-zinc-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
                    >
                        <div>
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="text-sm font-semibold text-stone-500 dark:text-stone-400 tracking-widest uppercase mb-3 transition-colors duration-300"
                            >
                                Customer Favorites
                            </motion.p>
                            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-zinc-100 tracking-tight transition-colors duration-300">
                                Most Loved
                            </h2>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            whileHover={{ x: 4 }}
                        >
                            <Link
                                to="/discover"
                                className="inline-flex items-center gap-2 text-stone-900 dark:text-zinc-100 font-medium hover:gap-3 transition-all duration-300"
                            >
                                View All
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </motion.div>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {bestSellers.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                            >
                                <Link
                                    to={`/product/${product.id}`}
                                    className="group block"
                                >
                                    <motion.div
                                        whileHover={{ y: -6 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className="relative aspect-square bg-stone-50 dark:bg-zinc-900 rounded-3xl overflow-hidden mb-5 shadow-sm group-hover:shadow-xl transition-all duration-500"
                                    >
                                        <motion.img
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                                        className="space-y-2"
                                    >
                                        <h3 className="font-semibold text-lg text-stone-900 dark:text-zinc-100 group-hover:text-stone-600 dark:group-hover:text-zinc-300 transition-colors line-clamp-2">
                                            {product.name}
                                        </h3>
                                        <p className="text-xl font-bold text-stone-900 dark:text-zinc-100 transition-colors duration-300">
                                            ${product.price.toLocaleString()}
                                        </p>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Verveo - Refined */}
            <section className="py-24 md:py-32 bg-stone-50 dark:bg-zinc-900 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center mb-20"
                    >
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-sm font-semibold text-stone-500 dark:text-stone-400 tracking-widest uppercase mb-4 transition-colors duration-300"
                        >
                            The Verveo Difference
                        </motion.p>
                        <h2 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-zinc-100 tracking-tight max-w-2xl mx-auto leading-tight transition-colors duration-300">
                            We don't just sell tech. We curate experiences.
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-12 lg:gap-20 max-w-6xl mx-auto">
                        {[
                            {
                                number: '01',
                                title: 'Rigorously Tested',
                                statement: 'Every product passes our quality standards. If it doesn\'t perform as promised, it doesn\'t make the cut.'
                            },
                            {
                                number: '02',
                                title: 'Expertly Curated',
                                statement: 'We obsess over materials, build quality, and user experience so you don\'t have to guess.'
                            },
                            {
                                number: '03',
                                title: 'Simply Better',
                                statement: 'From discovery to delivery, we\'ve removed every friction point. Just great products, effortlessly.'
                            }
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{
                                    delay: index * 0.2,
                                    duration: 0.7,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                whileHover={{ y: -8 }}
                                className="relative group"
                            >
                                <motion.div
                                    initial={{ opacity: 0.3 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: index * 0.2 + 0.2, duration: 0.5 }}
                                    className="text-6xl font-bold text-stone-200 dark:text-slate-800 mb-6 group-hover:text-stone-300 dark:group-hover:text-slate-700 transition-colors duration-300"
                                >
                                    {value.number}
                                </motion.div>
                                <h3 className="text-2xl font-bold text-stone-900 dark:text-zinc-100 mb-4 transition-colors duration-300">
                                    {value.title}
                                </h3>
                                <p className="text-stone-600 dark:text-stone-400 leading-relaxed transition-colors duration-300">
                                    {value.statement}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA - Dramatic */}
            <section className="relative py-32 md:py-40 bg-gradient-to-br from-stone-900 via-stone-950 to-black overflow-hidden">
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '40px 40px',
                }} />
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[100px]"
                />

                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="space-y-10"
                    >
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight"
                        >
                            Ready to upgrade
                            <motion.span
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 0.4 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="block text-white/40"
                            >
                                your everyday?
                            </motion.span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-xl text-white/60 max-w-2xl mx-auto"
                        >
                            Discover electronics that don't just work—they inspire.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link
                                    to="/discover"
                                    className="group px-12 py-4 bg-white text-stone-900 font-semibold rounded-full hover:bg-stone-100 transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 flex items-center gap-3 w-full sm:w-auto justify-center text-base"
                                >
                                    Explore Collection
                                    <motion.svg
                                        animate={{ x: [0, 4, 0] }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            repeatDelay: 1,
                                            ease: "easeInOut"
                                        }}
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </motion.svg>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default Home
