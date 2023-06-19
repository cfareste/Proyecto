export default function calculateTotalLessons(lessonsByUnit) {
    if (!lessonsByUnit) return 0;

    let total = Object.keys(lessonsByUnit).reduce((total, key) => {
        return total + Object.keys(lessonsByUnit[key]).length;
    }, 0)

    return total;
}