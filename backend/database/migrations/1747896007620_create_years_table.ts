import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'years'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('institution_id')
      table.string('name')
      table.string('description').nullable()
      table.enum('active', ['1', '2']).defaultTo('2').comment('1. Aktif, 2. Tidak Aktif')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
