import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { cloneElement } from 'react'

const PageTransition = ({ children }) => {
    const location = useLocation()

    return (
        <AnimatePresence mode="wait" initial={false}>
            {cloneElement(children, { key: location.pathname })}
        </AnimatePresence>
    )
}

export default PageTransition
