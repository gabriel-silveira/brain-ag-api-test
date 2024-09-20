import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'
import router from '@adonisjs/core/services/router'

const DashboardController = () => import('#controllers/dashboard_controller')
const RuralProducersController = () => import('#controllers/rural_producers_controller')
const CropsPlantedController = () => import('#controllers/crops_planted_controller')

// returns swagger in YAML
router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

// Renders Swagger-UI and passes YAML-output of /swagger
router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
  // return AutoSwagger.default.scalar("/swagger"); to use Scalar instead
  // return AutoSwagger.default.rapidoc("/swagger", "view"); to use RapiDoc instead (pass "view" default, or "read" to change the render-style)
})

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
