import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Ladder from '#models/ladder'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class Institution extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare ladderId: number

  @column()
  declare name: string

  @column()
  declare alias: string

  @column()
  declare npsn: string

  @column()
  declare nsm: string

  @column()
  declare logo: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => Ladder, {
    foreignKey: 'id',
    localKey: 'ladderId',
  })
  declare ladder: HasOne<typeof Ladder>
}
