import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'

const About = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white dark:from-zinc-950 dark:to-zinc-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Breadcrumbs items={[{ label: 'About', href: '/about' }]} />

                {/* Hero */}
                <section className="mt-8">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center space-y-6"
                        >
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                                We Only Sell What We'd Buy
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">
                                Life's too short for mediocre tech. We curate electronics that actually deliver.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Story */}
                <section className="py-16 md:py-24">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-8"
                        >
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                                    Our Story
                                </h2>
                                <div className="prose prose-lg max-w-none space-y-4 text-gray-600 dark:text-gray-400 transition-colors duration-300">
                                    <p className="leading-relaxed">
                                        Verveo started because we were tired of wading through endless product reviews,
                                        specs, and marketing hype. We just wanted to know: is this thing actually good?
                                    </p>
                                    <p className="leading-relaxed">
                                        So we built what we wanted to exist—a shop where every product has earned its place.
                                        No filler. No "okay" options. Just electronics that genuinely make your life better,
                                        whether you're creating, working, or just trying to enjoy some damn good audio.
                                    </p>
                                    <p className="leading-relaxed">
                                        We test everything. We argue about details. We obsess over build quality and user experience.
                                        If we wouldn't buy it ourselves, it doesn't make the cut.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Values */}
                <section className="py-16 md:py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                            Our Values
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 transition-colors duration-300">
                            The principles that guide everything we do
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                        {[
                            {
                                icon: '🎨',
                                title: 'Design Excellence',
                                description: 'We celebrate beautiful, thoughtful design in every product we feature.',
                            },
                            {
                                icon: '🌱',
                                title: 'Sustainability',
                                description: 'Environmental responsibility is at the core of our curation process.',
                            },
                            {
                                icon: '💎',
                                title: 'Quality First',
                                description: 'Only products that meet our rigorous standards make it to our platform.',
                            },
                            {
                                icon: '🤝',
                                title: 'Trust & Transparency',
                                description: 'We build lasting relationships through honesty and integrity.',
                            },
                            {
                                icon: '✨',
                                title: 'User Experience',
                                description: 'Your journey of discovery should be delightful from start to finish.',
                            },
                            {
                                icon: '🚀',
                                title: 'Innovation',
                                description: 'We continuously evolve to serve you better with cutting-edge features.',
                            },
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="text-center"
                            >
                                <div className="text-5xl mb-4">{value.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Team */}
                <section className="py-16 md:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                                Join Our Journey
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto transition-colors duration-300">
                                Interested in learning more about the creator behind Verveo?
                            </p>
                            <Link
                                to="/developer"
                                className="inline-block px-8 py-4 bg-stone-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-full hover:bg-stone-800 dark:hover:bg-stone-100 transition-all hover:shadow-lg duration-300"
                            >
                                Meet the Developer
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default About
