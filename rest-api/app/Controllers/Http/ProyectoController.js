'use strict'

// importacion del modelo proyecto
const Proyecto = use('App/Models/Proyecto');

// importacion de servicio autorizacion
const AutorizacionService = use('App/Services/AutorizacionService');

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

    // Metodo create (Creacion de proyectos)

    /**
     * request por que se enviaran datos al servidor
     * auth metodo de autentificacion
     */

    async create ({auth,request}) {

        // return{ message: 'Estoy dentro del metodo create'}

        // Tomar el usuario (usuario tomado desde el token)
        const user = await auth.getUser();

        // Tomams del reques los datos que queremos llenar en la base de datos
        const {nombre} = request.all();

        // llamando al modelo proyecto
        const proyecto = new Proyecto();

        // llenando el proyecto con los datos que se estan recibiendo por parte del usuario
        proyecto.fill({
            nombre
        });

        // se guarda el proyecto en la base de datos

        /**
         * proyectos() metodo que utlizamos para unir los proyectos
         * con los usuarios
         */

        await user.proyectos().save(proyecto);

        // retorno para que el usuario pueda verlo
        return proyecto;

    }

    // Metodo para eliminacion de proyectos

    /**
     * params para solicitar parametros 
     */

    async destroy({auth,params}){

        // Necesitamos que solo el usuario dueño de su proyecto pueda eliminarlos
        const user = auth.getUser(); // nos devuelve el usuario

        // id que se tomara de los parametros
        const id = params.id; // = cosnt {id} = params

        // Para encontrar el proyecto que vamos a eliminar

        /**
         * find() metodo de adonis para encontrar un proyecto por id
         */

        const proyecto = await Proyecto.find(id);

        // Servicio para autorizacion de usuario, verifica permiso haciendo uso de la funcion
        
        /**
         * Arroja error si el usuario no esta logeado correctamente
         */

        AutorizacionService.verificarPermiso(proyecto,user);

        // solo el usuario que sea dueño del proyecto lo puede eliminar
        await proyecto.delete(); // esto ya elimina el proyecto

        return proyecto; // respuesta de proyecto eliminado
    }

    // Metodo para actualizacion de proyectos

    async update({auth,params,request}){
        // Usuario
        const user = await auth.getUser();
        // id que se toma de los parametros
        const {id} = params;
        // Proyecto
        const proyecto = await Proyecto.find(id);
        // Autorizacion
        AutorizacionService.verificarPermiso(proyecto,user);
        // metodo merch que toma el titulo
        proyecto.merge(request.only('nombre')); // de todo lo que se envia solo se toma el nombre
        //await por que es un metodo asincrono y tenemos que esperar la respuesta
        await proyecto.save(); // guarda en base de datos
        return proyecto; // una ves que tenemos el proyecto guardado lo devolvemos
    }
}

module.exports = ProyectoController

// adonis serve --dev para que el servidor tome los cambios 