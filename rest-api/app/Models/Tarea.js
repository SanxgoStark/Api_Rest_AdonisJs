'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tarea extends Model {

    // Una tarea pertenece a un proyecto
    proyecto (){
        return this.belongsTo('App/Model/Proyecto') // ligue de tareas con proyectos
    }
}

module.exports = Tarea

