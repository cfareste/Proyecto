export default function getSessionToken(cookies) { 
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        
        if (cookie.startsWith('sessionToken=')) {
            const sessionToken = cookie.substring('sessionToken='.length);
            return sessionToken;
        }
    }

    return null;
}