import {BaseModel, column} from "@adonisjs/lucid/orm";

export default class CropType extends BaseModel {
  @column({isPrimary: true})
  declare id: number

  @column()
  declare name: string
}
