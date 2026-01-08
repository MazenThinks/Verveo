import { createContext, useContext, useState, useEffect } from 'react'
import { useToast } from './ToastContext'

const CartContext = createContext()

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within CartProvider')
    }
    return context
}

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('verveo-cart')
        return savedCart ? JSON.parse(savedCart) : []
    })
    const { addToast } = useToast()

    useEffect(() => {
        localStorage.setItem('verveo-cart', JSON.stringify(cart))
    }, [cart])

    const addToCart = (product, quantity = 1) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id)

            if (existingItem) {
                const newQuantity = existingItem.quantity + quantity
                if (newQuantity > product.stock) {
                    addToast('Cannot add more items - stock limit reached', 'error')
                    return prevCart
                }
                addToast(`Updated ${product.name} in cart (${newQuantity})`, 'success')
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            } else {
                addToast(`${product.name} added to cart`, 'success')
                return [...prevCart, { ...product, quantity }]
            }
        })
    }

    const removeFromCart = (productId) => {
        const product = cart.find(item => item.id === productId)
        setCart(prevCart => prevCart.filter(item => item.id !== productId))
        if (product) {
            addToast(`${product.name} removed from cart`, 'info')
        }
    }

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId)
            return
        }

        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        )
    }

    const clearCart = () => {
        setCart([])
    }

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    }

    const getCartCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0)
    }

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartTotal,
            getCartCount
        }}>
            {children}
        </CartContext.Provider>
    )
}
