import config from "@/config/config.js";

export default async function handler(req, res) {
    if (req.method != 'POST') return res.status(405).send({ message: 'Método no permitido' });

    await fetch(`${config.backend_url}/api/users/login`, {
        method: req.method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    })
    .then(response =>
        response.json()
        .then(loginData => ({response, loginData}))
    )
    .then(({ response, loginData }) => {
        if (!response.ok) return res.status(response.status).send({ message: loginData.message });

        return res.status(200).send(loginData);
    })
    .catch(err => {
        console.error(err);
        return res.status(500).send({ message: `Ha ocurrido un error con el inicio de sesión. Inténtalo más tarde.` })
    });   
}
