import {DateTime} from 'luxon'
import {BaseModel, column, hasMany} from '@adonisjs/lucid/orm'
import type {HasMany} from "@adonisjs/lucid/types/relations";
import CropType from "#models/crop_type";

export default class RuralProducer extends BaseModel {
  @column({isPrimary: true})
  declare id: number

  @column()
  declare document: string

  @column()
  declare producer_name: string

  @column()
  declare farm_name: string

  @column()
  declare city: string

  @column()
  declare state: string

  @column()
  declare total_area: number

  @column()
  declare arable_area: number

  @column()
  declare vegetation_area: number

  @hasMany(() => CropType)
  declare crops_planted: HasMany<typeof CropType>

  @column.dateTime({autoCreate: true})
  declare createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  declare updatedAt: DateTime
}
