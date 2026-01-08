// ===============================
// Verveo – Premium Electronics Data
// ===============================

export const products = [
    {
        id: 1,
        name: "MacBook Pro 16” M3 Pro",
        brand: "Apple",
        category: "Laptops",
        price: 2499,
        stock: 12,
        featured: true,
        description: "Professional-grade performance for creators and developers.",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&q=80",
        images: [
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&q=80",
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&q=80"
        ],
        specs: {
            cpu: "Apple M3 Pro",
            ram: "18GB",
            storage: "512GB SSD",
            display: "16.2” Liquid Retina XDR"
        }
    },

    {
        id: 2,
        name: "ASUS ROG Zephyrus G14",
        brand: "ASUS",
        category: "Laptops",
        price: 1649,
        stock: 10,
        featured: false,
        description: "Compact gaming power with creator-level performance.",
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=900&q=80",
        images: [
            "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=900&q=80",
            "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=900&q=80"
        ]
    },

    {
        id: 3,
        name: "iPhone 15 Pro",
        brand: "Apple",
        category: "Smartphones",
        price: 999,
        stock: 25,
        featured: true,
        description: "Titanium design with A17 Pro performance.",
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=900&q=80",
        images: [
            "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=900&q=80",
            "https://images.unsplash.com/photo-1592286927505-b0d6e4a2c4e7?w=900&q=80"
        ]
    },

    {
        id: 4,
        name: "Google Pixel 8",
        brand: "Google",
        category: "Smartphones",
        price: 699,
        stock: 30,
        featured: false,
        description: "Pure Android with AI-powered photography.",
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=900&q=80"
    },

    {
        id: 5,
        name: "Sony WH-1000XM5",
        brand: "Sony",
        category: "Headphones",
        price: 399,
        stock: 18,
        featured: true,
        description: "Industry-leading noise cancellation and premium sound.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=80"
    },

    {
        id: 6,
        name: "Apple AirPods Max",
        brand: "Apple",
        category: "Headphones",
        price: 549,
        stock: 14,
        featured: false,
        description: "High-fidelity audio with spatial sound.",
        image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=900&q=80"
    },

    {
        id: 7,
        name: "iPad Pro 12.9” M2",
        brand: "Apple",
        category: "Tablets",
        price: 1099,
        stock: 16,
        featured: true,
        description: "Laptop-level power in a tablet form.",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=900&q=80"
    },

    {
        id: 8,
        name: "Samsung Galaxy Tab S9",
        brand: "Samsung",
        category: "Tablets",
        price: 799,
        stock: 19,
        featured: false,
        description: "AMOLED display with S-Pen support.",
        image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=900&q=80"
    },

    {
        id: 9,
        name: "Logitech MX Master 3S",
        brand: "Logitech",
        category: "Accessories",
        price: 99,
        stock: 45,
        featured: false,
        description: "Precision mouse built for professionals.",
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=900&q=80"
    },

    {
        id: 10,
        name: "Logitech MX Keys S",
        brand: "Logitech",
        category: "Accessories",
        price: 119,
        stock: 28,
        featured: true,
        description: "Premium wireless keyboard with smart backlight.",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&q=80"
    },

    {
        id: 11,
        name: "Anker PowerCore 20000mAh",
        brand: "Anker",
        category: "Accessories",
        price: 49,
        stock: 60,
        featured: false,
        description: "High-capacity fast charging power bank.",
        image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=900&q=80"
    },

    {
        id: 12,
        name: "Samsung T7 Portable SSD 1TB",
        brand: "Samsung",
        category: "Accessories",
        price: 129,
        stock: 22,
        featured: false,
        description: "Ultra-fast portable storage.",
        image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=900&q=80"
    }
]

// ===============================
// Categories
// ===============================
export const categories = [
    { id: "all", name: "All Products" },
    { id: "laptops", name: "Laptops" },
    { id: "smartphones", name: "Smartphones" },
    { id: "tablets", name: "Tablets" },
    { id: "headphones", name: "Headphones" },
    { id: "accessories", name: "Accessories" }
]

// ===============================
// Collections
// ===============================
export const collections = [
    {
        id: 1,
        name: "Pro Workspace",
        description: "Everything you need for a premium desk setup.",
        image: "https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=900&q=80",
        productIds: [1, 7, 9, 10]
    },
    {
        id: 2,
        name: "Premium Audio",
        description: "Immersive sound without compromise.",
        image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=900&q=80",
        productIds: [5, 6]
    },
    {
        id: 3,
        name: "Mobile Essentials",
        description: "Power and performance on the go.",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900&q=80",
        productIds: [3, 4, 11]
    }
]
