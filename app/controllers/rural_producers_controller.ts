import type { HttpContext } from '@adonisjs/core/http'
import RuralProducer from "#models/rural_producer"

export default class RuralProducersController {
  async index({}: HttpContext) {
    return await RuralProducer.all()
  }

  async store({ request }: HttpContext) {
    const ruralProducer: RuralProducer = await RuralProducer.create({
      document: request.input('document'),
      producer_name: request.input('producer_name'),
      farm_name: request.input('farm_name'),
      city: request.input('city'),
      state: request.input('state'),
      total_area: request.input('total_area'),
      arable_area: request.input('arable_area'),
      vegetation_area: request.input('vegetation_area'),
    })

    return ruralProducer.id
  }
}
