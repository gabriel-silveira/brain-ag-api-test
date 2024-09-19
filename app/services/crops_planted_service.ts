import CropsPlanted from '#models/crops_planted'
import db from '@adonisjs/lucid/services/db'

export default class CropsPlantedService {
  ruralProducerId: number

  constructor(ruralProducerId: number) {
    this.ruralProducerId = ruralProducerId
  }

  async getCropsPlanted() {
    return db
      .from('crops_planted')
      .select('crop_types.id', 'crop_types.name')
      .leftJoin('crop_types', (query) => {
        query.on('crops_planted.crop_type_id', '=', 'crop_types.id')
      })
      .where('rural_producer_id', '=', this.ruralProducerId)
  }

  async updateCropsPlanted(cropTypesId: number[]): Promise<void> {
    await CropsPlanted.query().where('rural_producer_id', '=', this.ruralProducerId).delete()

    if (cropTypesId.length) {
      for (const cropTypeId of cropTypesId) {
        await CropsPlanted.create({
          rural_producer_id: this.ruralProducerId,
          crop_type_id: cropTypeId,
        })
      }
    }
  }
}
