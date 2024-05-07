import express from 'express'
import {
    webScaping
} from '../controller/webScaping.js'
import cors from 'cors';


const router = express();
// Habilitar CORS
app.use(cors());

//area publica

router.post('/webScaping', webScaping);
//area privada
//router.get('/perfil', checkAuth, perfil);

export default router;