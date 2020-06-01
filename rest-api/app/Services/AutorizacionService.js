
// importamos la excepcion que creamos para el acceso prohibido
const AccesoProhibidoException = use('App/Exceptions/AccesoProhibidoException');

// importamos la excepcion creada para el recurso no encontrado
const RecursoNoEncontradoException = use('App/Exceptions/RecursoNoEncontradoException');

class AutorizacionService{

    // Creacion de verificador de permisos
    /**
     * Recurso a utilizar 
     */

    verificarPermiso(recurso,user){

        // si el recurso no existe (!recurso - si no hay recurso)
        if(!recurso){
            throw new RecursoNoEncontradoException(); // arroje (throw) la excepcion creada
        }

        // validar que el recurso de un usuario pertenece a el (!== diferente de)
        if(recurso.user_id !== user.id){
            throw new AccesoProhibidoException(); // arroje (throw) la excepcion creada
        };
    }
}

// Exportacion para hacer uso de la funcion requerida
module.exports = new AutorizacionService;

/**
 * Para crear una excepcion: adonis make:exception nombre
 */