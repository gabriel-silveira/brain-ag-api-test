import router from '@adonisjs/core/services/router'
const RuralProducersController =  () => import('#controllers/rural_producers_controller')
const CropsPlantedController =  () => import('#controllers/crops_planted_controller')

router.get('/rural-producers', [RuralProducersController, 'index'])
router.post('/rural-producers', [RuralProducersController, 'store'])
router.get('/rural-producers/:id', [RuralProducersController, 'show'])
router.put('/rural-producers/:id', [RuralProducersController, 'update'])
router.delete('/rural-producers/:id', [RuralProducersController, 'destroy'])

router.get('/crops-planted/:id', [CropsPlantedController, 'index'])
