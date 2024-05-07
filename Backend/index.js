import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from "./config/db.js";
import { autenticar, registrar, 
         olvidePassword,nuevoPassword, 
         cambiarDatos, alertas} from "./controller/userControl.js";
import { buscar } from './controller/webScaping.js'

const app = express();

app.use(express.json());

dotenv.config();

conectarDB();


// Habilitar CORS
app.use(cors());


app.post('/api/login', autenticar);
app.post('/api/resetDatos', cambiarDatos);
app.post('/api/register', registrar);
app.post('/api/resetPasword', olvidePassword);
app.post('/api/newPassword',nuevoPassword);
app.post('/api/webScaping', buscar);
app.post('/api/alert', alertas);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});