import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('verveo_user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
        setLoading(false)
    }, [])

    // Mock login function
    const login = async (email, password) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800))

        // Mock validation
        if (!email || !password) {
            throw new Error('Email and password are required')
        }

        // Create mock user
        const mockUser = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name: email.split('@')[0],
            joinedAt: new Date().toISOString()
        }

        setUser(mockUser)
        localStorage.setItem('verveo_user', JSON.stringify(mockUser))
        return mockUser
    }

    // Mock signup function
    const signup = async (name, email, password) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800))

        // Mock validation
        if (!name || !email || !password) {
            throw new Error('All fields are required')
        }

        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters')
        }

        // Create mock user
        const mockUser = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name,
            joinedAt: new Date().toISOString()
        }

        setUser(mockUser)
        localStorage.setItem('verveo_user', JSON.stringify(mockUser))
        return mockUser
    }

    // Logout function
    const logout = () => {
        setUser(null)
        localStorage.removeItem('verveo_user')
    }

    const value = {
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
