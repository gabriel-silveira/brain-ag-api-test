import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'rural_producers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('document')
      table.string('producer_name')
      table.string('farm_name')
      table.string('city')
      table.string('state')
      table.integer('total_area')
      table.integer('arable_area')
      table.integer('vegetation_area')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
