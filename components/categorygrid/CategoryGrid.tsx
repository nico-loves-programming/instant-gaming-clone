import Link from "next/link"

interface CategoryGridProps {
    categories: { id: string; name: string; slug: string; image: string | null }[]
}

export function CategoryGrid({ categories }: CategoryGridProps) {
    return (
        <div className="bg-neutral-900 px-12 py-10">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-white text-2xl font-bold">Kategorien</h2>
                <Link
                    href="/categories"
                    className="text-white text-sm border border-neutral-600 rounded-full px-4 py-2 hover:bg-neutral-800 transition"
                >
                    Alle anzeigen
                </Link>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/category/${category.slug}`}
                        className="relative h-52 rounded-xl overflow-hidden group"
                    >
                        {category.image && (
                            <img
                                src={category.image}
                                alt={category.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <span className="absolute bottom-4 left-4 text-white text-xl font-semibold">
                            {category.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    )
}