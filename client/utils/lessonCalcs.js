export function calculateIndex (progress, lessonParts) {
    return Math.round(progress * lessonParts / 100) + 1;
}

export function calculateProgress (index, lessonParts) {
    return Math.floor(index * 100 / lessonParts);
}