import multer from "multer"

const storage = multer.diskStorage({
    destination: function(req, file, next) {
        next(null, './public/users')
    },
    filename: function(req, file, next) {
        if (!file) return next(null, '');
        next(null, `${Date.now()}-${file.originalname}`);
    }
})
const upload = multer({ storage: storage });

const fileMiddleware = {
    upload
}

export default fileMiddleware