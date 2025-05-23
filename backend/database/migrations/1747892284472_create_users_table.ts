import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('full_name').nullable()
      table.string('username', 254).notNullable().unique()
      table.string('password').notNullable()
      table
        .enum('role', ['1', '2', '3', '4', '5', '6', '7', '8', '9'])
        .comment(
          '1. Administrator, 2. Kepala Madrasah, 3. Guru, 4. Operator, 5. Bendahara, 6. Teller, 7. Siswa, 8. Orang Tua'
        )

      table.string('image').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
