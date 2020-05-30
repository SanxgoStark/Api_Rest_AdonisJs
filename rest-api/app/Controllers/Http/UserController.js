'use strict'

// llamando al modelo usuario (importacion del modelo suario)
const User = use('App/Models/User')

class UserController {
    // Metodos para los usuarios

    // Metodo para el login asincrono

    async login({ request,auth }){

        // return {message: 'Hola soy el login' } mensaje para prueba de estado 

        const {email,password} = request.all(); // se obtiene request el email y password

        // si lo anterior es correcto ..generar un token
        const token = await auth.attempt(email,password); // intenta encontrar un usuario en la base de datos con el email que ya le pasamos
        
        return token; // Si encuentra el email...adonis nos devuelve el token

    }

    // store guarda en base de datos un registro
    // la informacion esta en request, request lo que esta llegando
    async store({ request}) {
        const {email,password} = request.all() // de todo lo que reciba tiene que encontrar username,email y password
        
        // Creacion de nuevo usuario con los datos que se extrajeron
        // await que es pere a la creacion para terminar
        const user = await User.create({ 
            email,
            password,
            username: email // username = email
        });

        // una ves que me el registro que me devuelva el token, retornar los argumentos qeu se utlizan en el metooo login  
        return this.login(...arguments);  
    };
    
}

// Expoertacion del controlador para poderlo usar en otros archivos
module.exports = UserController

/**
 * Para correr las migraciones y se puedan crear tablas en sqllite 3
 * utilizar migration:run, al correr las migraciones adonis detectara que 
 * se quiere usar sqllite 3
 */