'use strict'

// importacion de Proyecto por que todas las tareas estan ligadas a un proyecto
const Proyecto = use('App/Models/Proyecto');

// importacion del modelo Tarea
const Tarea = use('App/Models/Tarea');

// importacion de servicio autorizacion
const AutorizacionService = use('App/Services/AutorizacionService');

class TareaController {

    // Metodo index para ver o culsultar todas las tareas de un proyecto especifico
    async index({auth,request,params}){
        // Usuario
        const user = await auth.getUser();
        // id de los parametros
        const {id} = params;
        // Proyecto
        const proyecto = await Proyecto.find(id);
        // Confirmacion
        AutorizacionService.verificarPermiso(proyecto,user);
        // retornar todas las tareas que pertnescan a un proyecto
        return await proyecto.tareas().fetch(); // tomamos todas las tareas que pertenescan al proyecto

    }

    // Metodo create 
    /**
     * request para recuperar informacion enviada 
     */
    async create({auth,request,params}){
        // Usuario
        const user = await auth.getUser();
        // Descripcion que se toma del request.all()
        const {descripcion} = request.all();
        // id que se toma de los parametros
        const {id} = params;
        // Encontrar el proyecto y ver que exista
        const proyecto = await Proyecto.find(id);
        // Saber si el usuario es duño de ese proyecto
        AutorizacionService.verificarPermiso(proyecto,user);
        // Instaciando una nueva Tarea
        const tarea = new Tarea();
        // la tarea se llenara cpn la descripcion
        tarea.fill({
            descripcion
        });
        await proyecto.tareas().save(tarea); // guarda la tarea
        return tarea; // se devuelve la tarea
    }

    // Metodo de actualizacion de tareas
    async update({auth,params,request}){

        // Necesitamos que solo el usuario dueño de su proyecto pueda eliminarlos
        const user = await auth.getUser(); // nos devuelve el usuario

        // id que se tomara de los parametros
        const {id} = params; // = cosnt {id} = params - id tarea

        // Tarea
        const tarea = await Tarea.find(id); // buscamos la tarea

        // Traemos el proyecto al que pertenece nuestra tarea, para utlizarlo en el servicio de autorizacion
        const proyecto = await tarea.proyecto().fetch(); 

        // Servicio para autorizacion de usuario, verifica permiso haciendo uso de la funcion
        
        /**
         * Arroja error si el usuario no esta logeado correctamente
         */

        AutorizacionService.verificarPermiso(proyecto,user); // comprobamos que seamos dueños del proyecto

        tarea.merge(request.only([ // Campos a actualizar
            'descripcion',
            'completada'
        ]))

        await tarea.save(); // guardamos los cambios
        return tarea; // devolvemos la tarea
    }
    

    async destroy({auth,params}){

        // Necesitamos que solo el usuario dueño de su proyecto pueda eliminarlos
        const user = await auth.getUser(); // nos devuelve el usuario

        // id que se tomara de los parametros
        const {id} = params; // = cosnt {id} = params

        // Tarea
        const tarea = await Tarea.find(id);

        // Traemos el proyecto al que pertenece nuestra tarea, para utlizarlo en el servicio de autorizacion
        const proyecto = await tarea.proyecto().fetch();

        // Servicio para autorizacion de usuario, verifica permiso haciendo uso de la funcion
        
        /**
         * Arroja error si el usuario no esta logeado correctamente
         */

        AutorizacionService.verificarPermiso(proyecto,user);

        // solo el usuario que sea dueño del proyecto lo puede eliminar
        await tarea.delete(); // esto ya elimina el proyecto

        return tarea; // respuesta de proyecto eliminado
    }
}

module.exports = TareaController

// adonis migration:rollback para borrar en este caso todos los registros de Tareas
// adonis migration:run