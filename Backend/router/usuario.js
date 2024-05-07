import express from 'express'
import {
    registrar,
    confirmar,
    autenticar
} from '../controller/userControl.js'
import cors from 'cors';


const router = express();
// Habilitar CORS
app.use(cors());

//area publica
router.post('/', registrar);
router.post('/login', autenticar);
//area privada
//router.get('/perfil', checkAuth, perfil);

export default router;