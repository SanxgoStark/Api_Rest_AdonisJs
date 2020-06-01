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

  // Ruta para index de los proyectos (get recibiendo del servidor) - (ver todos los proyectos de un usuario)
  Route.get('proyectos', 'ProyectoController.index').middleware('auth');
  // Ruta protegida por el metodo de autentificacion auth

  // Ruta para creacion de proyectos (POST por que se estan enviando datos)
  Route.post('proyectos', 'ProyectoController.create').middleware('auth');

  // Ruta para eliminar proyecto /:id del proyecto
  Route.delete('proyectos/:id','ProyectoController.destroy').middleware('auth');


}).prefix('api/v1/');