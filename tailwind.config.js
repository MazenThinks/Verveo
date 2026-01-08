/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Premium Electronics Color Palette
                // Neutral base - warm stone for sophistication
                stone: {
                    50: '#fafaf9',
                    100: '#f5f5f4',
                    150: '#eeeeec',
                    200: '#e7e5e4',
                    300: '#d6d3d1',
                    400: '#a8a29e',
                    500: '#78716c',
                    600: '#57534e',
                    700: '#44403c',
                    800: '#292524',
                    900: '#1c1917',
                },
                // Strong accent - electric indigo (tech-forward, trustworthy)
                electric: {
                    50: '#eef2ff',
                    100: '#e0e7ff',
                    200: '#c7d2fe',
                    300: '#a5b4fc',
                    400: '#818cf8',
                    500: '#6366f1',
                    600: '#4f46e5',
                    700: '#4338ca',
                    800: '#3730a3',
                    900: '#312e81',
                },
                // Soft secondary - serene teal (calm, modern)
                serene: {
                    50: '#f0fdfa',
                    100: '#ccfbf1',
                    200: '#99f6e4',
                    300: '#5eead4',
                    400: '#2dd4bf',
                    500: '#14b8a6',
                    600: '#0d9488',
                    700: '#0f766e',
                    800: '#115e59',
                    900: '#134e4a',
                },
                // Premium dark tones (keep slate for flexibility)
                slate: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    850: '#172032',
                    900: '#0f172a',
                },
            },
            fontFamily: {
                sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
                display: ['Tomorrow', 'system-ui', 'sans-serif'],
                caveat: ['Caveat', 'cursive'],
            },
            fontSize: {
                'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
                'sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0.005em' }],
                'base': ['1rem', { lineHeight: '1.65', letterSpacing: '0' }],
                'lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '-0.01em' }],
                'xl': ['1.25rem', { lineHeight: '1.6', letterSpacing: '-0.015em' }],
                '2xl': ['1.5rem', { lineHeight: '1.5', letterSpacing: '-0.02em' }],
                '3xl': ['1.875rem', { lineHeight: '1.4', letterSpacing: '-0.025em' }],
                '4xl': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.03em' }],
                '5xl': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.035em' }],
                '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.04em' }],
                '7xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.045em' }],
                '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '128': '32rem',
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
            },
            boxShadow: {
                'soft': '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
                'soft-lg': '0 8px 24px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.04)',
                'soft-xl': '0 16px 48px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.04)',
                'inner-soft': 'inset 0 2px 4px rgba(0, 0, 0, 0.04)',
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out',
                'slide-up': 'slideUp 0.6s ease-out',
                'scale-in': 'scaleIn 0.4s ease-out',
                'fade-in-up': 'fadeInUp 1s ease-out forwards',
                'grid-reveal': 'gridReveal 1.5s ease-out 0.3s forwards',
                'grid-fade-out': 'gridFadeOut 3s ease-in-out forwards',
                'hero-entrance': 'heroEntrance 1.2s ease-out forwards',
                'delay-200': 'fadeInUp 1s ease-out 0.2s forwards',
                'delay-300': 'fadeInUp 1s ease-out 0.3s forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(16px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                fadeInUp: {
                    'from': {
                        opacity: '0',
                        transform: 'translateY(30px)',
                    },
                    'to': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
                gridReveal: {
                    'from': {
                        opacity: '0',
                    },
                    'to': {
                        opacity: '1',
                    },
                },
                gridFadeOut: {
                    '0%': {
                        opacity: '1',
                    },
                    '50%': {
                        opacity: '0.3',
                    },
                    '100%': {
                        opacity: '0',
                    },
                },
                heroEntrance: {
                    'from': {
                        opacity: '0',
                        transform: 'translateY(40px)',
                    },
                    'to': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
}
