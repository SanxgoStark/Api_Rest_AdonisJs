'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//agrupacion de rutas
/**
 * Todas las rutas que se encuentre dentro de la agrupacion comenzaran con el prefijo (prefix)
 * indicado, tambien la agrupacio sinve para hacer una version 2 con la misma ruta pero con prejifo
 * api/v2, multiples versiones en el mismo proyecto de adonis
 */
Route.group(() => {
  // Creacion de ruta para crear un usuario
  Route.post('usuarios/registros', 'UserController.store');

  // ruta para login POST por que se esta enviando informacion
  Route.post('usuarios/login', 'UserController.login');

}).prefix('api/v1/');