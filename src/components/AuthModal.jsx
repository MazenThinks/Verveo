import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
    const [mode, setMode] = useState(initialMode)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const { login, signup } = useAuth()
    const { showToast } = useToast()
    const modalRef = useRef(null)
    const firstInputRef = useRef(null)

    // Reset form when modal opens/closes or mode changes
    useEffect(() => {
        if (isOpen) {
            setEmail('')
            setPassword('')
            setName('')
            setErrors({})
            setShowPassword(false)
            // Focus first input when modal opens
            setTimeout(() => {
                if (firstInputRef.current) {
                    firstInputRef.current.focus()
                }
            }, 100)
        }
    }, [isOpen, mode])

    // Focus trapping
    useEffect(() => {
        if (!isOpen || !modalRef.current) return

        const modal = modalRef.current
        const focusableElements = modal.querySelectorAll(
            'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        const handleTabKey = (e) => {
            if (e.key !== 'Tab') return

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault()
                    lastElement.focus()
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault()
                    firstElement.focus()
                }
            }
        }

        modal.addEventListener('keydown', handleTabKey)
        return () => modal.removeEventListener('keydown', handleTabKey)
    }, [isOpen, mode])

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }
        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [isOpen, onClose])

    // Inline validation
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }

    const validateField = (field, value) => {
        const newErrors = { ...errors }

        if (field === 'email') {
            if (!value) {
                newErrors.email = 'Email is required'
            } else if (!validateEmail(value)) {
                newErrors.email = 'Please enter a valid email'
            } else {
                delete newErrors.email
            }
        }

        if (field === 'password') {
            if (!value) {
                newErrors.password = 'Password is required'
            } else if (mode === 'signup' && value.length < 6) {
                newErrors.password = 'Password must be at least 6 characters'
            } else {
                delete newErrors.password
            }
        }

        if (field === 'name' && mode === 'signup') {
            if (!value) {
                newErrors.name = 'Name is required'
            } else {
                delete newErrors.name
            }
        }

        setErrors(newErrors)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validate all fields
        const newErrors = {}
        if (!email) newErrors.email = 'Email is required'
        else if (!validateEmail(email)) newErrors.email = 'Please enter a valid email'

        if (!password) newErrors.password = 'Password is required'
        else if (mode === 'signup' && password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }

        if (mode === 'signup' && !name) newErrors.name = 'Name is required'

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setIsLoading(true)

        try {
            if (mode === 'login') {
                await login(email, password)
                showToast('Welcome back!', 'success')
            } else {
                await signup(name, email, password)
                showToast('Account created successfully!', 'success')
            }
            onClose()
        } catch (error) {
            showToast(error.message || 'Something went wrong', 'error')
        } finally {
            setIsLoading(false)
        }
    }

    const switchMode = () => {
        setMode(mode === 'login' ? 'signup' : 'login')
        setErrors({})
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                        aria-hidden="true"
                    />

                    {/* Modal */}
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="auth-modal-title"
                        aria-describedby="auth-modal-description"
                    >
                        <motion.div
                            ref={modalRef}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full max-w-md bg-white rounded-3xl shadow-2xl pointer-events-auto overflow-hidden"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 transition-colors z-10"
                                aria-label="Close authentication dialog"
                            >
                                <X className="w-5 h-5 text-stone-500" />
                            </button>

                            <div className="p-8">
                                {/* Header */}
                                <div className="text-center mb-6">
                                    <motion.h2
                                        id="auth-modal-title"
                                        key={mode}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.4,
                                            ease: [0.4, 0, 0.2, 1],
                                        }}
                                        className="text-3xl font-bold text-slate-900 mb-2"
                                    >
                                        {mode === 'login' ? 'Welcome back' : 'Create account'}
                                    </motion.h2>
                                    <motion.p
                                        id="auth-modal-description"
                                        key={`${mode}-subtitle`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            duration: 0.4,
                                            delay: 0.05,
                                            ease: [0.4, 0, 0.2, 1],
                                        }}
                                        className="text-stone-600"
                                    >
                                        {mode === 'login'
                                            ? 'Sign in to continue shopping'
                                            : 'Start your journey with Verveo'}
                                    </motion.p>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Name Field (Signup only) */}
                                    <AnimatePresence initial={false} mode="wait">
                                        {mode === 'signup' && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                                animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                                                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                                transition={{
                                                    duration: 0.35,
                                                    ease: [0.4, 0, 0.2, 1],
                                                }}
                                                style={{ overflow: 'hidden' }}
                                            >
                                                <label htmlFor="name" className="block text-sm font-medium text-slate-900 mb-2">
                                                    Full Name
                                                </label>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" aria-hidden="true" />
                                                    <input
                                                        ref={mode === 'signup' ? firstInputRef : null}
                                                        id="name"
                                                        type="text"
                                                        value={name}
                                                        onChange={(e) => {
                                                            setName(e.target.value)
                                                            validateField('name', e.target.value)
                                                        }}
                                                        onBlur={(e) => validateField('name', e.target.value)}
                                                        placeholder="John Doe"
                                                        aria-required="true"
                                                        aria-invalid={!!errors.name}
                                                        aria-describedby={errors.name ? 'name-error' : undefined}
                                                        className={`w-full pl-11 pr-4 py-3 bg-stone-50 border rounded-xl text-sm text-slate-900 placeholder-stone-400 focus:outline-none focus:bg-white transition-all duration-200 ${errors.name ? 'border-red-300 focus:border-red-400' : 'border-stone-200 focus:border-stone-400'}
                                                    }`}
                                                    />
                                                </div>
                                                {errors.name && (
                                                    <motion.p
                                                        id="name-error"
                                                        role="alert"
                                                        initial={{ opacity: 0, y: -5 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="mt-1.5 text-xs text-red-500"
                                                    >
                                                        {errors.name}
                                                    </motion.p>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Email Field */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-2">
                                            Email
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" aria-hidden="true" />
                                            <input
                                                ref={mode === 'login' ? firstInputRef : null}
                                                id="email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value)
                                                    validateField('email', e.target.value)
                                                }}
                                                onBlur={(e) => validateField('email', e.target.value)}
                                                placeholder="you@example.com"
                                                aria-required="true"
                                                aria-invalid={!!errors.email}
                                                aria-describedby={errors.email ? 'email-error' : undefined}
                                                className={`w-full pl-11 pr-4 py-3 bg-stone-50 border rounded-xl text-sm text-slate-900 placeholder-stone-400 focus:outline-none focus:bg-white transition-all duration-200 ${errors.email ? 'border-red-300 focus:border-red-400' : 'border-stone-200 focus:border-stone-400'}
                                                    }`}
                                            />
                                        </div>
                                        {errors.email && (
                                            <motion.p
                                                id="email-error"
                                                role="alert"
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="mt-1.5 text-xs text-red-500"
                                            >
                                                {errors.email}
                                            </motion.p>
                                        )}
                                    </div>

                                    {/* Password Field */}
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-slate-900 mb-2">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" aria-hidden="true" />
                                            <input
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={password}
                                                onChange={(e) => {
                                                    setPassword(e.target.value)
                                                    validateField('password', e.target.value)
                                                }}
                                                onBlur={(e) => validateField('password', e.target.value)}
                                                placeholder="••••••••"
                                                aria-required="true"
                                                aria-invalid={!!errors.password}
                                                aria-describedby={errors.password ? 'password-error' : mode === 'signup' ? 'password-hint' : undefined}
                                                className={`w-full pl-11 pr-11 py-3 bg-stone-50 border rounded-xl text-sm text-slate-900 placeholder-stone-400 focus:outline-none focus:bg-white transition-all duration-200 ${errors.password ? 'border-red-300 focus:border-red-400' : 'border-stone-200 focus:border-stone-400'
                                                    }`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-stone-100 transition-colors"
                                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                aria-pressed={showPassword}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="w-5 h-5 text-stone-400" aria-hidden="true" />
                                                ) : (
                                                    <Eye className="w-5 h-5 text-stone-400" aria-hidden="true" />
                                                )}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <motion.p
                                                id="password-error"
                                                role="alert"
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="mt-1.5 text-xs text-red-500"
                                            >
                                                {errors.password}
                                            </motion.p>
                                        )}
                                        {mode === 'signup' && !errors.password && (
                                            <p id="password-hint" className="mt-1.5 text-xs text-stone-500">
                                                At least 6 characters
                                            </p>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                        whileHover={{ scale: isLoading ? 1 : 1.015 }}
                                        whileTap={{ scale: isLoading ? 1 : 0.985 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 500,
                                            damping: 30,
                                        }}
                                    >
                                        {isLoading ? (
                                            <span>{mode === 'login' ? 'Signing in...' : 'Creating account...'}</span>
                                        ) : (
                                            <span>{mode === 'login' ? 'Sign in' : 'Create account'}</span>
                                        )}
                                    </motion.button>
                                </form>

                                {/* Switch Mode */}
                                <div className="mt-6 text-center">
                                    <p className="text-sm text-stone-600">
                                        {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
                                        <button
                                            onClick={switchMode}
                                            className="text-slate-900 font-medium hover:underline underline-offset-2 transition-all"
                                        >
                                            {mode === 'login' ? 'Sign up' : 'Sign in'}
                                        </button>
                                    </p>
                                </div>

                                {/* Demo Note */}
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4, delay: 0.3 }}
                                    className="text-center text-xs text-stone-400 mt-4"
                                >
                                    Demo mode: Any credentials work
                                </motion.p>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}

export default AuthModal
