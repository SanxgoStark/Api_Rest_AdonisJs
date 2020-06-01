'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class RecursoNoEncontradoException extends LogicalException {
  /**
   * Handle this exception by itself
   */

  // que tome el error y haga uso de response
  handle (erro,{response}) {
    return response.status(404).json({ // estado 404 (recurso no encontrado)
      error: 'El recurso al cual usted desea acceder no existe'
    })
  }
}

module.exports = RecursoNoEncontradoException
