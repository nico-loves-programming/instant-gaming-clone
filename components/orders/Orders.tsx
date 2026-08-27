export async function Orders() {
    // später: const orders = await getOrders()
    const orders: unknown[] = []

    return (
        <div>
            {orders.length === 0 ? (
                <p className="text-zinc-400">
                    Du hast noch keine Käufe getätigt.
                </p>
            ) : (
                <div className="space-y-4">
                    {/* orders.map(...) */}
                </div>
            )}
        </div>
    )
}