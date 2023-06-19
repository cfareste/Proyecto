import config from "@/config/config"

export default async function restartLessonRelation(lessonID, userID, token) {
    await fetch (`${config.backend_url}/api/lessons/restart/${lessonID}/${userID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    .then(response => response.json())
    .catch(err => console.error(err));
}