'use strict'

// importacion de Proyecto por que todas las tareas estan ligadas a un proyecto
const Proyecto = use('App/Models/Proyecto');

// importacion del modelo Tarea
const Tarea = use('App/Models/Tarea');

// importacion de servicio autorizacion
const AutorizacionService = use('App/Services/AutorizacionService');

class TareaController {

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
}

module.exports = TareaController
