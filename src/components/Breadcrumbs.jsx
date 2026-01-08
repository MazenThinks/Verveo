import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumbs({ items }) {
    return (
        <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
            <Link
                to="/"
                className="text-slate-500 hover:text-slate-900 transition-colors"
            >
                Home
            </Link>
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                    {item.href ? (
                        <Link
                            to={item.href}
                            className="text-slate-500 hover:text-slate-900 transition-colors"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-slate-900 font-medium">
                            {item.label}
                        </span>
                    )}
                </div>
            ))}
        </nav>
    )
}
