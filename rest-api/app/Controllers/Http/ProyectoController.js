'use strict'

class ProyectoController {

    // metodo index para recibir todos los registros de la base de datos (los proyectos que pertenescan a dicho usuario)
    /**
     * provedor de autentificacion de adonis (auth) 
     * 
     * async = asincronos
     * 
     * fetch() = que tome todo lo que encuentre
     */
    async index ({auth}) {
        
        const user = await auth.getUser();

        //console.log(user);
        //return {message: 'esto es el index'} 

        // que del usuario nos muestre todos los proyectos
        return await user.proyectos().fetch();
    }
}

module.exports = ProyectoController
