import type { HttpContext } from '@adonisjs/core/http'
import RuralProducer from "#models/rural_producer"
import CropsPlanted from "#models/crops_planted"
import db from '@adonisjs/lucid/services/db'

export default class RuralProducersController {
  async index({}: HttpContext) {
    const ruralProducersUpdated = []
    const ruralProducers = await RuralProducer.all()

    for (const ruralProducer of ruralProducers) {
      ruralProducersUpdated.push({
        ...ruralProducer.$original,
        crops_planted: [...await this.getCropsPlanted(ruralProducer.id)]
      })
    }

    return ruralProducersUpdated
  }

  async getCropsPlanted(ruralProducerId: number) {
    return db.from('crops_planted')
      .select('crop_types.id', 'crop_types.name')
      .leftJoin('crop_types', (query) => {
        query.on('crops_planted.crop_type_id', '=', 'crop_types.id')
      })
      .where('rural_producer_id', '=', ruralProducerId)
  }

  async show({ params }: HttpContext) {
    const ruralProducer = await RuralProducer.findOrFail(params.id)

    const cropsPlanted = await this.getCropsPlanted(ruralProducer.id)

    return {
      ...ruralProducer.$original,
      crops_planted: [...cropsPlanted]
    }
  }

  async store({ request }: HttpContext) {
    const ruralProducer = await RuralProducer.create({
      document: request.input('document'),
      producer_name: request.input('producer_name'),
      farm_name: request.input('farm_name'),
      city: request.input('city'),
      state: request.input('state'),
      total_area: request.input('total_area'),
      arable_area: request.input('arable_area'),
      vegetation_area: request.input('vegetation_area'),
    })

    const cropsPlanted = request.input('crops_planted') as number[]

    if (cropsPlanted.length)  {
      for (const cropTypeId of cropsPlanted) {
        await CropsPlanted.create({
          rural_producer_id: ruralProducer.id,
          crop_type_id: cropTypeId,
        })
      }
    }

    return ruralProducer
  }

  async update({ request, params }: HttpContext) {
    const ruralProducer: RuralProducer = await RuralProducer.findOrFail(params.id)

    ruralProducer.document = request.input('document')
    ruralProducer.producer_name = request.input('producer_name')
    ruralProducer.farm_name = request.input('farm_name')
    ruralProducer.city = request.input('city')
    ruralProducer.state = request.input('state')
    ruralProducer.total_area = request.input('total_area')
    ruralProducer.arable_area = request.input('arable_area')
    ruralProducer.vegetation_area = request.input('vegetation_area')

    return await ruralProducer.save()
  }

  async destroy({ params }: HttpContext) {
    const ruralProducer: RuralProducer = await RuralProducer.findOrFail(params.id)

    return ruralProducer.delete()
  }
}
