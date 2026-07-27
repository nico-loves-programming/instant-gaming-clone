export function getReleaseText(date: string) {
    const release = new Date(date)
    const now = new Date()

    const diff =
        release.getTime() - now.getTime()

    const days = Math.ceil(
        diff / (1000 * 60 * 60 * 24)
    )


    if(days <= 0) {
        return "Bereits erschienen"
    }

    if(days === 1) {
        return "In 1 Tag"
    }

    if(days <= 7) {
        return `In ${days} Tagen`
    }

    return release.toLocaleDateString("de-DE")
}