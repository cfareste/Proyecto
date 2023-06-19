import config from "@/config/config"

export default async function updateUser(userID, token, newInfo) {
    return fetch (`${config.backend_url}/api/users/updateProfile/${userID}`, {
        method: 'PUT',
        headers: {
            enctype: 'multipart/form-data',
            'Authorization': token
        },
        body: newInfo
    })
    .then(response => {
        if (response.status === 403) return { ok: false, redirect: true }
        return response.json();
    })
    .catch(err => console.error(err));
}