import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Level extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare ladderId: number

  @column()
  declare name: string

  @column()
  declare alias: string

  @column()
  declare description: string | undefined

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
