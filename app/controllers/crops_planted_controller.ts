import type { HttpContext } from '@adonisjs/core/http'
import CropsPlanted from '#models/crops_planted'

export default class CropsPlantedController {
  public async index({ params }: HttpContext) {
    return CropsPlanted.query().where('rural_producer_id', params.id)
  }
}
