import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'

export default class Year extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare institutionId: number

  @column()
  declare name: string

  @column()
  declare description: string | undefined

  @column()
  declare active: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  static async updateBeforeSave(year: Year) {
    if (year.active === '1') {
      const years = await this.query().where('institutionId', year.institutionId)
      years.map(async (item) => {
        item.active = '2'
        await item.save()
      })
    }
  }
}
