'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProyectoSchema extends Schema {

  /**
   * Cuando ejecutemos esta migracion es crear una tabla proyectos
   * que va a incluir el id auto incrementable y las fechas de creado y actualizado
   */ 
  up () {
    this.create('proyectos', (table) => {
      table.increments() // id auto incrementable

      // datos necesarios para el modelo de proyectos

      /**
       * Relacion entre tablas para que un proyecto pertenesca a un suario,
       * dentro de la tabla proyecto que nos cree un campo user_id del tipo
       * integer y que haga referencia al id en la tabla usuario
       */
      table.integer('user_id').unsigned().references('id').inTable('users')

      /**
       * esto dice que dentro de la tabla tendremos un campo
       * del tipo cadena de texto que puede contener caracteres alfanumericos,
       * que se va a llamar nombre y puede tener hasta 80 caracteres
       * 
       */
      table.string('nombre',80).notNullable()

      table.timestamps() // fechas de creado y actualizado
    })
  }

  down () {
    this.drop('proyectos')
  }
}

module.exports = ProyectoSchema

/**
 * Para hacer que la migracion se guarde en la base de datos
 * 
 *      adonis migration:estatus // para ver las migraciones activas o inactivas
 *      adonis migration:run // correr migraciones pendientes
 */