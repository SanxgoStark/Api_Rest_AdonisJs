'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Proyecto extends Model {


    // Con esto estamos diciendo que cada proyecto pertenece a un usuario
    user (){
        return this.belongsTo('App/Models/User')
    }

    // relacion entre proyectos y tareas
    tareas (){
        return this.hasMany('App/Models/Tarea') // hasMany tiene muchas tareas
    }

}

module.exports = Proyecto
