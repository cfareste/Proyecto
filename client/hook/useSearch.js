export default async function useSearch(search) {
    const lessonsBySearch = await fetch(`/api/searchLesson?search=${search}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then (response => response.json())

    if (!lessonsBySearch || !lessonsBySearch.ok || Object.keys(lessonsBySearch).length === 0) return { message: 'No hay resultados para tu búsqueda', ok: false }
    
    return lessonsBySearch;
}