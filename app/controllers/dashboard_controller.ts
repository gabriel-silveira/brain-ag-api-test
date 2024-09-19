import type { HttpContext } from '@adonisjs/core/http'
import DashboardService from '#services/dashboard_service'

export default class DashboardController {
  /**
   * @data
   * @description Data to be shown on dashboard
   */
  async data({}: HttpContext) {
    return await new DashboardService().data()
  }
}
