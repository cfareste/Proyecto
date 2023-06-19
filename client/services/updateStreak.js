import config from "@/config/config";

export default async function updateStreak (userID, token, streakInfo) {
    return fetch (`${config.backend_url}/api/streaks/update/${userID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(streakInfo)
    })
    .then(response => {
        if (response.status === 403) return { ok: false, redirect: true }
        return response.json();
    })
    .catch(err => console.error(err));
}