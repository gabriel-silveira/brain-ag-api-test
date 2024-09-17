import router from '@adonisjs/core/services/router'
const RuralProducersController =  () => import('#controllers/rural_producers_controller')

router.get('/rural-producers', [RuralProducersController, 'index'])
router.post('/rural-producers', [RuralProducersController, 'store'])
router.put('/rural-producers/:id', [RuralProducersController, 'update'])
router.delete('/rural-producers/:id', [RuralProducersController, 'destroy'])
