import { motion } from 'framer-motion'

// Product Card Skeleton
export const ProductCardSkeleton = () => {
    return (
        <div className="space-y-6">
            {/* Image Skeleton */}
            <div className="aspect-[3/4] bg-stone-100 rounded-3xl overflow-hidden animate-pulse" />

            {/* Info Skeleton */}
            <div className="space-y-3 px-2">
                <div className="h-3 w-16 bg-stone-200 rounded-full animate-pulse" />
                <div className="h-5 w-3/4 bg-stone-200 rounded-lg animate-pulse" />
                <div className="h-6 w-20 bg-stone-200 rounded-lg animate-pulse" />
            </div>
        </div>
    )
}

// Product Detail Image Skeleton
export const ProductDetailImageSkeleton = () => {
    return (
        <div className="space-y-6">
            <div className="aspect-[4/5] bg-stone-100 rounded-2xl animate-pulse" />
            <div className="flex gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex-1 aspect-square bg-stone-100 rounded-xl animate-pulse" />
                ))}
            </div>
        </div>
    )
}

// Text Block Skeleton
export const TextBlockSkeleton = () => {
    return (
        <div className="space-y-3">
            <div className="h-4 w-full bg-stone-200 rounded-lg animate-pulse" />
            <div className="h-4 w-5/6 bg-stone-200 rounded-lg animate-pulse" />
            <div className="h-4 w-4/6 bg-stone-200 rounded-lg animate-pulse" />
        </div>
    )
}

// Grid Skeleton for Product Listings
export const ProductGridSkeleton = ({ count = 6 }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
        >
            {Array.from({ length: count }).map((_, index) => (
                <ProductCardSkeleton key={index} />
            ))}
        </motion.div>
    )
}
