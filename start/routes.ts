import router from '@adonisjs/core/services/router'

const DashboardController = () => import('#controllers/dashboard_controller')
const RuralProducersController = () => import('#controllers/rural_producers_controller')
const CropsPlantedController = () => import('#controllers/crops_planted_controller')

router
  .group(() => {
    router.get('/', [RuralProducersController, 'index'])
    router.post('/', [RuralProducersController, 'store'])
    router.get('/:id', [RuralProducersController, 'show'])
    router.put('/:id', [RuralProducersController, 'update'])
    router.delete('/:id', [RuralProducersController, 'destroy'])
    router.get('/:id/crops-planted/', [CropsPlantedController, 'index'])
  })
  .prefix('/rural-producers')

router
  .group(() => {
    router.get('/data', [DashboardController, 'data'])
  })
  .prefix('/dashboard')

router.get('/', () => {
  return { health_check: 'It works!'}
})
