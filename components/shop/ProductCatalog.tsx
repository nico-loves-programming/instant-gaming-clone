"use client"

import {useMemo, useState} from "react";
import {Product} from "@/types/product";
import {Category} from "@/types/category";
import {ProductGrid} from "@/components/shop/ProductGrid";

interface ProductCatalogProps {
    products: Product[]
    categories: Category[]
}

export function ProductCatalog({products, categories} : ProductCatalogProps) {
    const [search, setSearch] = useState("")
    const [categoryId, setCategoryId] = useState("")

    const filtered = useMemo(() => {
        if (!search && !categoryId) {
            return products
        }

        return products.filter((product) => {
            const matchesSearch =
                search === "" ||
                product.name.toLowerCase().includes(search.toLowerCase())

            const matchesCategory =
                categoryId === "" ||
                product.categories.some((c) => c.id === categoryId)

            return matchesSearch && matchesCategory
        })
    }, [search, categoryId, products])
    
    return (
        <div>
            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Spiel suchen..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded px-3 py-2 flex-1"
                />
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="border rounded px-3 py-2"
                >
                    <option value="">Alle Kategorien</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            {filtered.length > 0 ? (
                <ProductGrid products={filtered} />
            ) : (
                <p className="text-gray-500">Suche nach einem Spiel oder wähle eine Kategorie.</p>
            )}
        </div>
    )
}