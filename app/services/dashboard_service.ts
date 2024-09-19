import RuralProducer from '#models/rural_producer'
import CropsPlantedService from '#services/crops_planted_service'

export default class DashboardService {
  private ruralProducers: RuralProducer[] = []

  async data() {
    this.ruralProducers = await RuralProducer.all()

    const farmsArea = this.ruralProducers.reduce((acc, obj) => acc + obj.total_area, 0)

    return {
      totalFarms: this.ruralProducers.length,
      farmsArea,
      states: await this.byState(),
      cropsPlanted: await this.byCropPlanted(),
      arableArea: await this.byArea(),
    }
  }

  async byState() {
    const totals: { [key: string]: number } = {}
    const percentages: { [key: string]: number } = {}
    let grandTotal = 0

    for (const ruralProducer of this.ruralProducers) {
      if (!totals[ruralProducer.state]) totals[ruralProducer.state] = 0
      totals[ruralProducer.state] += 1
    }

    for (const key of Object.keys(totals)) {
      grandTotal += totals[key]
    }

    for (const key of Object.keys(totals)) {
      const percentage = Number(((totals[key] / grandTotal) * 100).toFixed(0))

      percentages[key] = percentage || 0
    }

    return {
      totals: {
        ...totals,
        ALL_STATES: grandTotal,
      },
      percentages,
    }
  }

  async byCropPlanted() {
    const totals: { [key: string]: number } = {}
    const percentages: { [key: string]: number } = {}
    let grandTotal = 0

    for (const ruralProducer of this.ruralProducers) {
      const cropsPlanted = await new CropsPlantedService(ruralProducer.id).getCropsPlanted()

      for (const crop_planted of cropsPlanted) {
        if (!totals[crop_planted['name']]) totals[crop_planted['name']] = 1
        else totals[crop_planted['name']] += 1
      }
    }

    for (const key of Object.keys(totals)) grandTotal += totals[key]

    for (const key of Object.keys(totals)) {
      const percentage = Number(((totals[key] / grandTotal) * 100).toFixed(0))

      percentages[key] = percentage || 0
    }

    return {
      totals,
      percentages,
    }
  }

  async byArea() {
    let totalArable = 0
    let totalVegetation = 0

    for (const ruralProducer of this.ruralProducers) {
      totalArable += Number(ruralProducer.arable_area)
      totalVegetation += Number(ruralProducer.vegetation_area)
    }

    return {
      totalArable,
      totalVegetation,
    }
  }
}
