import config from "@/config/config"

export default async function restartExercisesRelation(lessonID, userID, token) {
    await fetch (`${config.backend_url}/api/exercises/restartAll/${lessonID}/${userID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    .then(response => response.json())
    .catch(err => console.error(err));
}