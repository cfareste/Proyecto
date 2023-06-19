import config from "@/config/config"

export default async function createStreak(userID, token) {
    await fetch (`${config.backend_url}/api/streaks/new/${userID}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    .then(response => response.json())
    .catch(err => console.error(err));
}