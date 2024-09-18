import type { HttpContext } from "@adonisjs/core/http"
import RuralProducer from "#models/rural_producer"
import CropsPlantedService from "#services/crops_planted_service"
import {validDocument} from "#validators/validators";

export default class RuralProducersController {
  async index({}: HttpContext) {
    const ruralProducersUpdated = []
    const ruralProducers = await RuralProducer.all()

    for (const ruralProducer of ruralProducers) {
      ruralProducersUpdated.push({
        ...ruralProducer.$original,
        crops_planted: [...await new CropsPlantedService(ruralProducer.id).getCropsPlanted()]
      })
    }

    return ruralProducersUpdated
  }

  async show({ params }: HttpContext) {
    const ruralProducer = await RuralProducer.findOrFail(params.id)

    const cropsPlanted = await new CropsPlantedService(ruralProducer.id).getCropsPlanted()

    return {
      ...ruralProducer.$original,
      crops_planted: [...cropsPlanted]
    }
  }

  async store({ request, response }: HttpContext) {
    const document = request.input('document')

    if (!validDocument(document)) {
      return response.status(400).send({ erro: 'Documento inválido' })
    }

    const total_area = request.input('total_area')
    const arable_area = request.input('arable_area')
    const vegetation_area = request.input('vegetation_area')

    if ((arable_area + vegetation_area) > total_area) {
      return response.status(400).send({ erro: 'A soma de área agrícultável e vegetação não deverá ser maior que a área total da fazenda' })
    }

    const ruralProducer = await RuralProducer.create({
      document,
      producer_name: request.input('producer_name'),
      farm_name: request.input('farm_name'),
      city: request.input('city'),
      state: request.input('state'),
      total_area: request.input('total_area'),
      arable_area: request.input('arable_area'),
      vegetation_area: request.input('vegetation_area'),
    })

    const cropsPlanted = request.input('crops_planted') as number[]

    await new CropsPlantedService(ruralProducer.id).updateCropsPlanted(cropsPlanted || [])

    return {
      ...ruralProducer.$original,
      crops_planted: [...await new CropsPlantedService(ruralProducer.id).getCropsPlanted()]
    }
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

    await ruralProducer.save()

    const cropsPlanted = request.input('crops_planted') as number[]

    await new CropsPlantedService(ruralProducer.id).updateCropsPlanted(cropsPlanted || [])

    return {
      ...ruralProducer.$original,
      crops_planted: [...await new CropsPlantedService(ruralProducer.id).getCropsPlanted()]
    }
  }

  async destroy({ params }: HttpContext) {
    const ruralProducer: RuralProducer = await RuralProducer.findOrFail(params.id)

    return ruralProducer.delete()
  }
}
