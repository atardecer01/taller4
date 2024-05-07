import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema({
    nombre: String,
    password: String,
    alert: [],
    email: String,
    token:String

});


const Usuario = mongoose.model("Usuarios", usuarioSchema);
export default Usuario;