import RuralProducer from "#models/rural_producer";

export default class DashboardService {
  async data() {
    const allRuralProducers = await RuralProducer.all()

    const farmsArea = allRuralProducers.reduce((acc, obj) => acc + obj.total_area, 0)

    return {
      totalFarms: allRuralProducers.length,
      farmsArea,
      states: await this.byState(allRuralProducers)
    }
  }

  async byState(ruralProducers: RuralProducer[]) {
    const totals: { [key: string]: number } = {};
    const percentages: { [key: string]: number } = {};
    let grandTotal = 0;

    for (const ruralProducer of ruralProducers) {
      if (!totals[ruralProducer.state]) totals[ruralProducer.state] = 0;
      totals[ruralProducer.state] += 1;
    }

    for (const key of Object.keys(totals)) {
      grandTotal += totals[key];
    }

    for (const key of Object.keys(totals)) {
      const percentage = Number(((totals[key] / grandTotal) * 100).toFixed(0));

      percentages[key] = percentage || 0;
    }

    return {
      totals: {
        ...totals,
        ALL_STATES: grandTotal,
      },
      percentages,
    }
  }
}
