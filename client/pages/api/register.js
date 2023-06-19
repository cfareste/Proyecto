import config from "@/config/config.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).fields([{ name: 'data' }, { name: 'photo' }])

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send({ message: 'Método no permitido' });

    console.log(req.body['data'])

    upload (req, res, async function(err) {
        const {data, photo} = req.files;
        console.log(data, photo)
        if (err) return res.status(500).send({ message: `Error en el manejo de la imagen: ${err}` });

    })






    // await fetch(`${config.backend_url}/api/users/register`, {
    //     method: req.method,
    //     body: req.body
    // })
    // .then(response =>
    //     response.json()
    //     .then(registerData => ({response, registerData}))
    // )
    // .then(({ response, registerData }) => {
    //     if (!response.ok) return res.status(response.status).send({ message: registerData.message });

    //     return res.status(200).send(registerData);
    // })
    // .catch(err => {
    //     console.error(err);
    //     return res.status(500).send({ message: `Ha ocurrido un error con el inicio de sesión. Inténtalo más tarde.` })
    // });
}
