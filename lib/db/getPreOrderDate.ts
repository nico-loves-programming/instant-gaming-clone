export function getPreOrderDate() {
    const today = new Date()
    const randomDays = Math.floor(Math.random() * 30) + 1

    const releaseDate = new Date(today)
    releaseDate.setDate(today.getDate() + randomDays)

    const diffTime = releaseDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 7) {
        return `In ${diffDays} ${diffDays === 1 ? "Tag" : "Tagen"}`
    }

    return releaseDate.toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    })
}