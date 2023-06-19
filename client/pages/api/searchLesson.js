import config from "@/config/config";

export default async function handler(req, res) {
    if (req.method != 'GET') return res.status(405).send({ message: 'Método no permitido' });

    const { search } = req.query;

    await fetch(`${config.backend_url}/api/lessons/all/search/${search}`, {
        method: req.method,
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response =>
        response.json()
        .then(data => ({response, data}))
    )
    .then(({ response, data }) => {
        if (!response.ok) {
            if (response.status === 404) return res.status(200).send(data)
        };

        return res.status(200).send(data);
    })
    .catch(err => {
        console.error(err);
        return res.status(500).send({ message: `Ha ocurrido un error con el inicio de sesión. Inténtalo más tarde.` })
    });
}