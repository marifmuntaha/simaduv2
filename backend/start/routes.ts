/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const InstitutionsController = () => import('#controllers/institutions_controller')
const LaddersController = () => import('#controllers/ladders_controller')
const LevelsController = () => import('#controllers/levels_controller')
const MajorsController = () => import('#controllers/majors_controller')
const UsersController = () => import('#controllers/users_controller')
const YearsController = () => import('#controllers/years_controller')

router.get('/', async () => {
  return 'API SIMADU V2 YAYASAN DARUL HIKMAH MENGANTI'
})

router
  .group(() => {
    router.resource('institution', InstitutionsController).apiOnly()
    router.resource('ladder', LaddersController).apiOnly()
    router.resource('level', LevelsController).apiOnly()
    router.resource('major', MajorsController).apiOnly()
    router.resource('user', UsersController).apiOnly()
    router.resource('year', YearsController).apiOnly()
  })
  .prefix('api')
