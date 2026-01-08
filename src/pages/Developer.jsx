import React from 'react';
import { Linkedin, Github, Mail, ArrowUpRight } from 'lucide-react';

const Developer = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-[600ms] relative overflow-hidden">
            {/* Grid Background Pattern */}
            <div
                className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-600 animate-grid-fade-out"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
                    backgroundSize: '100px 100px'
                }}
            />
            <div
                className="absolute inset-0 pointer-events-none opacity-100 dark:opacity-0 transition-opacity duration-600 animate-grid-fade-out"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.18) 1px, transparent 1px)',
                    backgroundSize: '100px 100px'
                }}
            />

            <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4">
                <div className="container-custom max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="text-center space-y-16 sm:space-y-20 animate-hero-entrance">
                        {/* Name - Portfolio Style */}
                        <div className="space-y-6 relative">
                            {/* Subtle Grid Around Name (Portfolio style) */}
                            <div
                                className="absolute -inset-x-4 -inset-y-20 opacity-0 animate-grid-reveal pointer-events-none hidden sm:block"
                                style={{
                                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.15) 1px, transparent 1px)',
                                    backgroundSize: '100px 100px',
                                    backgroundPosition: '50% 50%',
                                    maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent), linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
                                    maskComposite: 'intersect',
                                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent), linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
                                    WebkitMaskComposite: 'source-in'
                                }}
                            />
                            <div
                                className="absolute -inset-x-4 -inset-y-20 opacity-0 animate-grid-reveal pointer-events-none dark:block hidden sm:block"
                                style={{
                                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px)',
                                    backgroundSize: '100px 100px',
                                    backgroundPosition: '50% 50%',
                                    maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent), linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
                                    maskComposite: 'intersect',
                                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent), linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
                                    WebkitMaskComposite: 'source-in'
                                }}
                            />

                            <h1
                                className="font-display font-black text-[clamp(3rem,10vw,8rem)] text-neutral-950 dark:text-white tracking-[-0.02em] leading-[0.9] select-none transition-colors duration-600 relative"
                                style={{
                                    textAlign: 'center',
                                    position: 'relative'
                                }}
                            >
                                MAZEN<br />MAGDY
                            </h1>

                            {/* Portfolio Link */}
                            <div className="pt-4">
                                <a
                                    href="https://mazenmagdy.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2 text-neutral-400 dark:text-neutral-600 hover:text-neutral-950 dark:hover:text-white transition-all duration-[400ms] ease-out">
                                    <span className="text-xs uppercase tracking-[0.25em] font-medium border-b border-neutral-200 dark:border-neutral-800 group-hover:border-neutral-950 dark:group-hover:border-white transition-all duration-[400ms] ease-out">
                                        View Full Portfolio
                                    </span>
                                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-[400ms] ease-out" />
                                </a>
                            </div>
                        </div>

                        {/* Social Links - Portfolio Style */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up animate-delay-200">
                            <a
                                href="https://github.com/MazenThinks"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-all duration-[400ms] ease-out"
                                aria-label="GitHub"
                            >
                                <div className="w-10 h-10 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center group-hover:border-neutral-950 dark:group-hover:border-white transition-all duration-[400ms] ease-out group-hover:scale-105">
                                    <Github className="w-5 h-5" />
                                </div>
                                <span className="text-xs uppercase tracking-[0.2em] font-medium">GitHub</span>
                            </a>

                            <a
                                href="https://www.linkedin.com/in/mazenmagdyy/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-all duration-[400ms] ease-out"
                                aria-label="LinkedIn"
                            >
                                <div className="w-10 h-10 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center group-hover:border-neutral-950 dark:group-hover:border-white transition-all duration-[400ms] ease-out group-hover:scale-105">
                                    <Linkedin className="w-5 h-5" />
                                </div>
                                <span className="text-xs uppercase tracking-[0.2em] font-medium">LinkedIn</span>
                            </a>

                            <a
                                href="mailto:mazenmagdy190.mm@gmail.com"
                                className="group flex items-center gap-3 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-all duration-[400ms] ease-out"
                                aria-label="Email"
                            >
                                <div className="w-10 h-10 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center group-hover:border-neutral-950 dark:group-hover:border-white transition-all duration-[400ms] ease-out group-hover:scale-105">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <span className="text-xs uppercase tracking-[0.2em] font-medium">Email</span>
                            </a>
                        </div>

                        {/* Tech Stack */}
                        <div className="pt-12 space-y-6 animate-fade-in-up animate-delay-300">
                            <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-600 font-medium transition-colors duration-600">
                                Current Stack
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-4">
                                {['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion', 'Context API'].map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-500 font-medium px-4 py-2 border border-neutral-200 dark:border-neutral-800 rounded-full hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-[400ms] ease-out cursor-default"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default Developer;
