import fs from 'fs';
export default function eliminate (path) {
    fs.unlink(path, (err) => {
        if (err) return console.error(err);
        console.log('Imágen no introducida')
    })
}