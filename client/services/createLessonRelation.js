import config from "@/config/config"

export default async function createLessonRelation(lessonID, userID, token) {
    await fetch (`${config.backend_url}/api/lessons/create/${lessonID}/${userID}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    .then(response => response.json())
    .catch(err => console.error(err));
}