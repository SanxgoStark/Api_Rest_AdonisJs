'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

// Craecion de la tabla Tareas
class TareaSchema extends Schema {
  up () {
    this.create('tareas', (table) => {
      table.increments()

      // datos necesarios para el modelo de Tarea

      // id del proyecto que hace referencia al id en la tabla proyectos
      table.integer('proyecto_id').unsigned().references('id').inTable('proyectos')

      /**
       * esto dice que dentro de la tabla tendremos un campo
       * del tipo cadena de texto que puede contener caracteres alfanumericos,
       * que se va a llamar nombre y puede tener hasta 80 caracteres
       * 
       */
      table.string('descripcion',255).notNullable()

      table.timestamps()
    })
  }

  down () {
    this.drop('tareas')
  }
}

module.exports = TareaSchema

/**
 * Cuando se activa la migracion automaticamente se crea la tabla de
 * dicha migracion en la base de datos, en este caso se creo la tabla
 * Tarea
 */