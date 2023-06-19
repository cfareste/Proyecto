import config from "@/config/config";

export default async function updateExercisesRelation(exerciseID, userID, token, completed, isCorrect) {
    const body = {
        "completed": completed,
        "isCorrect": isCorrect 
    }
    
    await fetch (`${config.backend_url}/api/exercises/update/${exerciseID}/${userID}`, {
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