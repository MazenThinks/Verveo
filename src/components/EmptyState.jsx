import { Link } from 'react-router-dom'

export default function EmptyState({ icon: Icon, title, description, actionLabel, actionLink }) {
    return (
        <div className="flex items-center justify-center py-16 px-4">
            <div className="text-center max-w-md">
                {Icon && (
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-stone-100 mb-6">
                        <Icon className="w-10 h-10 text-stone-400" />
                    </div>
                )}

                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {title}
                </h3>

                <p className="text-slate-600 leading-relaxed mb-6">
                    {description}
                </p>

                {actionLabel && actionLink && (
                    <Link
                        to={actionLink}
                        className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-soft hover:shadow-soft-lg"
                    >
                        {actionLabel}
                    </Link>
                )}
            </div>
        </div>
    )
}
