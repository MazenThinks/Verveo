import { createContext, useContext, useState, useEffect } from 'react'
import { useToast } from './ToastContext'

const WishlistContext = createContext()

export const useWishlist = () => {
    const context = useContext(WishlistContext)
    if (!context) {
        throw new Error('useWishlist must be used within WishlistProvider')
    }
    return context
}

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem('verveo-wishlist')
        return savedWishlist ? JSON.parse(savedWishlist) : []
    })
    const { addToast } = useToast()

    useEffect(() => {
        localStorage.setItem('verveo-wishlist', JSON.stringify(wishlist))
    }, [wishlist])

    const addToWishlist = (product) => {
        setWishlist(prevWishlist => {
            const existingItem = prevWishlist.find(item => item.id === product.id)

            if (existingItem) {
                // Remove if already in wishlist (toggle off)
                addToast(`${product.name} removed from wishlist`, 'info')
                return prevWishlist.filter(item => item.id !== product.id)
            }

            // Add to wishlist
            addToast(`${product.name} added to wishlist`, 'success')
            return [...prevWishlist, product]
        })
    }

    const removeFromWishlist = (productId) => {
        const product = wishlist.find(item => item.id === productId)
        setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId))
        if (product) {
            addToast(`${product.name} removed from wishlist`, 'info')
        }
    }

    const isInWishlist = (productId) => {
        return wishlist.some(item => item.id === productId)
    }

    return (
        <WishlistContext.Provider value={{
            wishlist,
            addToWishlist,
            removeFromWishlist,
            isInWishlist
        }}>
            {children}
        </WishlistContext.Provider>
    )
}
