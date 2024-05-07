import Usuario from "../model/user.js";
import nodemailer from 'nodemailer';
import { nanoid } from 'nanoid';

//Falta la opcion para quitar y anadir alertas
const registrar = async (req, res) => {
    const {email} = req.body
    console.log(email)
    //prevenir usuarios duplicados
    const existeUsuario = await Usuario.findOne({email})

    if (existeUsuario) {
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({msg: error.message});
    }

    try {
        //Guardar un nuevo Usuario
        const usuario = new Usuario(req.body);
        const usuarioGuardado = await usuario.save();

        res.json(usuarioGuardado);
    } catch (error) {
        console.log(error)
    }
};

const perfil = (req, res) => {

    const {usuario} = req;

    res.json({perfil: usuario}); 
}

const confirmar = async (req, res) => {
    const {token} = req.params

    const usuarioConfirmar = await Usuario.findOne({token});

    if (!usuarioConfirmar) {
        const error = new Error('Token no válido');
        return res.status(404).json({msg: error.message});
    }

    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();

        res.json({msg: 'Usuario Confirmado Correctamente'});
    } catch (error) {
        console.log(error);
    }

};


 import jwt from'jsonwebtoken';

 const autenticar = async (req, res, next) => {
    const { email, password } = req.body;
  
    try {
      // Comprobar si el usuario existe
      const usuario = await Usuario.findOne({ email });
  
      if (!usuario) {
        return res.status(401).json('Credenciales inválidas');
      }//hola
  
      // Revisar Password
      if (usuario.password === password) {
          
        // Generar el token JWT   
        const privateKey = process.env.JWT_SECRET; 
        const token = jwt.sign({ userId: usuario._id, email ,nameU: usuario.nombre}, privateKey, { expiresIn: '1h' });
        req.usuario = usuario; // Agregar el objeto de usuario a la solicitud
        req.token = token; // Agregar el token a la solicitud
        
        // Enviar respuesta con el token
        res.status(200).json({ respuesta: 'ok', t: token });
        
        next(); // Llamar al siguiente middleware
      } else {
        return res.status(400).json('Contraseña incorrecta');
      }
    } catch (error) {
      console.log(error);
      res.status(500).json('Error interno del servidor');
    }
  };

  const alertas = async (req, res, next) => {
    const { alerta, email } = req.body;
  
    try {
      // Comprobar si el usuario existe
      const usuario = await Usuario.findOne({ email });
  
      if (!usuario) {
        return res.status(401).json('Credenciales inválidas');
      }//hola
      usuario.alert = (usuario.alert).push(alerta)
      res.status(200).json({ respuesta: 'ok', t: token });
    } catch (error) {
      console.log(error);
      res.status(500).json('Error interno del servidor');
    }
  };

  const olvidePassword = async (req, res) => {
    const { email } = req.body;
    console.log(email)
    const token = nanoid();
    const existeUsuario = await Promise.resolve(Usuario.findOne({ email }));
    if (!existeUsuario) {
      
      const error = new Error('El usuario no existe');
      return res.status(400).json({ msg: error.message });
      
    }
  
    try {
      existeUsuario.token = token;
      await existeUsuario.save();
      await sendPasswordResetEmail(email, token);
      
      res.json({ msg: 'Hemos enviado un email con las instrucciones' });
    } catch (error) {
      console.log(error);
    }
  };

  // Función para enviar el correo electrónico de restablecimiento de contraseña
async function sendPasswordResetEmail(email, token) {
  // Configurar el transporte de correo electrónico
  const transporter = nodemailer.createTransport({
    // Configura el transporte de correo electrónico según tus necesidades
    // Consulta la documentación de Nodemailer para obtener más detalles
    host:"smtp.elasticemail.com",
    port: 2525,
    secure: false,
    auth: {
      user: process.env.CORREO,
      pass: process.env.CONTRASENA,
    },
  });

  // Configurar el contenido del correo electrónico
  const mailOptions = {
    from: process.env.CORREO,
    to: email,
    subject: 'Recuperación de contraseña',
    text: `Recibimos una solicitud para restablecer tu contraseña. A continuación, encontrarás un código de verificación que deberás ingresar 
    en el formulario de restablecimiento de contraseña:

    Código de verificación: ${token}
    Si no realizaste esta solicitud, puedes ignorar este mensaje y tu contraseña actual permanecerá sin cambios.
    Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.

    ¡Atentamente,
    El equipo de Desarrollo
    `,
  };

  // Enviar el correo electrónico
  return transporter.sendMail(mailOptions);
}

const nuevoPassword = async (req, res) => {
  const { code, newPassword } = req.body;
  console.log(code, newPassword)
  const token = code;
  if(code == undefined)
  {
    const error = new Error('Hubo un error');
    return res.status(400).json({ msg: error.message });
  }
  try {
      const usuario = await Promise.resolve(Usuario.findOne({ token }));
      console.log(usuario)
      if (!usuario) {
          const error = new Error('Hubo un error');
          return res.status(400).json({ msg: error.message });
      }

      usuario.token = null;
      usuario.password = newPassword;
      await usuario.save();
      res.json({ msg: 'Password modificado correctamente' });
      console.log(usuario);
  } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Hubo un error al modificar la contraseña' });
  }
};

const cambiarDatos = async (req, res) =>
{
  const {_id, name, email, username, profileImage} = req.body
  console.log(_id)
  try {
    const usuario = await Promise.resolve(Usuario.findOne({ _id }));
    console.log(usuario)
    if (!usuario) {
        const error = new Error('Hubo un error');
        return res.status(400).json({ msg: error.message });
    }

    
    
    usuario.nombre = name;
    usuario.email = email;
    usuario.user = username;

    await usuario.save();
    res.json({ msg: 'Datos modificados correctamente' });
    console.log(usuario);
} catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Hubo un error al modificar los datos' });
}
}
export {
  nuevoPassword,
  olvidePassword,
    registrar,
    perfil,
    confirmar,
    autenticar,
    cambiarDatos,
    alertas
}