import config from "@/config/config"

export default async function updateLessonRelation(lessonID, userID, token, newProgress) {
    const body = {
        "progress": newProgress
    }

    await fetch (`${config.backend_url}/api/lessons/update/${lessonID}/${userID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .catch(err => console.error(err));
}