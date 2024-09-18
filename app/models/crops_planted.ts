import {BaseModel, column} from "@adonisjs/lucid/orm";

export default class CropsPlanted extends BaseModel {
  public static table = 'crops_planted'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare rural_producer_id: number

  @column()
  declare crop_type_id: number
}
