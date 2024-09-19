import { BaseSeeder } from '@adonisjs/lucid/seeders'
import CropType from '#models/crop_type'

export default class extends BaseSeeder {
  async run() {
    await CropType.createMany([
      {
        name: 'Soja',
      },
      {
        name: 'Milho',
      },
      {
        name: 'Algodão',
      },
      {
        name: 'Café',
      },
      {
        name: 'Cana de Açucar',
      },
    ])
  }
}
