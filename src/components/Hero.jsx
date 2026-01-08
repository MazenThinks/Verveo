import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'

const Hero = () => {
    return (
        <>
            <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-gradient-to-b from-white via-stone-50/50 to-white dark:from-zinc-950 dark:via-zinc-950/95 dark:to-zinc-950 transition-colors duration-300">
                {/* Subtle Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Fine Grid */}
                    <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]" style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.05) 1px, transparent 1px)`,
                        backgroundSize: '120px 120px',
                    }} />

                    {/* Ambient Gradient Orbs */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.03, 0.05, 0.03]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-64 -right-64 w-[800px] h-[800px] bg-electric-400 rounded-full blur-[140px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.02, 0.04, 0.02]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        className="absolute -bottom-64 -left-64 w-[600px] h-[600px] bg-serene-400 rounded-full blur-[130px]"
                    />
                </div>

                {/* Main Content */}
                <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40 w-full z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900/5 dark:bg-white/5 border border-stone-900/10 dark:border-white/10 backdrop-blur-sm mb-8 transition-colors duration-300"
                        >
                            <Sparkles className="w-3.5 h-3.5 text-electric-600 dark:text-electric-400" />
                            <span className="text-stone-700 dark:text-stone-300 text-xs font-semibold tracking-wide uppercase transition-colors duration-300">Premium Tech, Elevated</span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                            className="text-[clamp(3rem,10vw,7.5rem)] font-black text-stone-900 dark:text-zinc-100 tracking-[-0.02em] leading-[0.95] mb-6 transition-colors duration-300"
                        >
                            Tech that
                            <span className="block bg-gradient-to-br from-stone-900 via-stone-700 to-stone-600 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-400 bg-clip-text text-transparent">
                                inspires
                            </span>
                        </motion.h1>

                        {/* Supporting Line */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                            className="text-lg md:text-xl text-stone-600 dark:text-stone-400 font-medium max-w-2xl mx-auto mb-12 transition-colors duration-300"
                        >
                            Curated electronics that blend innovation with elegance
                        </motion.p>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.65 }}
                        >
                            <Link
                                to="/discover"
                                className="group inline-flex items-center gap-3 px-10 py-5 bg-stone-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold rounded-full hover:bg-stone-800 dark:hover:bg-zinc-200 hover:shadow-2xl hover:shadow-stone-900/25 dark:hover:shadow-zinc-100/10 hover:scale-[1.02] transition-all duration-300 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-zinc-100 focus:ring-offset-4 text-base"
                            >
                                Explore Products
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                            </Link>
                        </motion.div>

                        {/* Stats or Trust Indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.9 }}
                            className="flex items-center justify-center gap-8 mt-16 text-sm text-stone-500 dark:text-stone-400 transition-colors duration-300"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-electric-500 dark:bg-electric-400 rounded-full" />
                                <span>Premium Brands</span>
                            </div>
                            <div className="w-px h-4 bg-stone-300 dark:bg-zinc-800" />
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-serene-500 dark:bg-serene-400 rounded-full" />
                                <span>Curated Selection</span>
                            </div>
                            <div className="w-px h-4 bg-stone-300 dark:bg-zinc-800" />
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-stone-900 dark:bg-zinc-100 rounded-full" />
                                <span>Fast Delivery</span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <svg className="w-5 h-8 text-stone-400 dark:text-zinc-700 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </motion.div>
                </motion.div>
            </section>

            {/* Brand Promise Section - Modern Cards */}
            <section className="relative bg-white dark:bg-zinc-950 overflow-hidden transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32 md:py-40">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center mb-24"
                    >
                        <h2 className="text-xs font-bold text-stone-400 dark:text-zinc-600 tracking-[0.3em] uppercase mb-8 transition-colors duration-300">
                            OUR PROMISE
                        </h2>
                        <p className="text-4xl md:text-6xl font-black text-stone-900 dark:text-zinc-100 tracking-tight leading-[1.1] max-w-4xl mx-auto transition-colors duration-300">
                            Quality isn't an option.
                            <span className="block text-stone-400 dark:text-stone-500 mt-3 transition-colors duration-300">It's the only way.</span>
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {[
                            {
                                title: 'Curated',
                                description: 'Every product tested, vetted, and chosen for you',
                                gradient: 'from-electric-50 to-electric-100/50'
                            },
                            {
                                title: 'Authentic',
                                description: 'Real brands. Real quality. Real value.',
                                gradient: 'from-serene-50 to-serene-100/50'
                            },
                            {
                                title: 'Effortless',
                                description: 'From click to doorstep, completely seamless',
                                gradient: 'from-stone-50 to-stone-100/50'
                            }
                        ].map((promise, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{
                                    duration: 0.7,
                                    delay: index * 0.15 + 0.2,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                className="group relative"
                            >
                                <div className={`relative p-8 lg:p-10 rounded-3xl bg-gradient-to-br ${promise.gradient} dark:from-zinc-900 dark:to-zinc-900/80 border border-stone-200/50 dark:border-zinc-800/50 hover:border-stone-300/50 dark:hover:border-zinc-700/50 transition-all duration-500 hover:shadow-xl hover:shadow-stone-900/5 dark:hover:shadow-black/30 h-full`}>
                                    {/* Number Badge */}
                                    <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm flex items-center justify-center border border-stone-200/50 dark:border-zinc-700/50 transition-colors duration-300">
                                        <span className="text-sm font-bold text-stone-400 dark:text-stone-500 transition-colors duration-300">{index + 1}</span>
                                    </div>

                                    <div className="relative z-10">
                                        <h3 className="text-2xl lg:text-3xl font-black text-stone-900 dark:text-zinc-100 mb-4 tracking-tight transition-colors duration-300">
                                            {promise.title}
                                        </h3>
                                        <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-base transition-colors duration-300">
                                            {promise.description}
                                        </p>
                                    </div>

                                    {/* Decorative Element */}
                                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/30 rounded-tl-full -mr-16 -mb-16 group-hover:scale-110 transition-transform duration-500" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero
