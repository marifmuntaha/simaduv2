import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Major from '#models/major'

export default class extends BaseSeeder {
  async run() {
    const majors = [
      {
        ladderId: 3,
        yearId: 5,
        institutionId: 3,
        name: 'Tahfidz',
        alias: 'TFZ',
        description: 'Unggulan Tahfidz',
      },
      {
        ladderId: 3,
        yearId: 5,
        institutionId: 3,
        name: 'Kitab',
        alias: 'KTB',
        description: 'Unggulan Kitab',
      },
      {
        ladderId: 3,
        yearId: 5,
        institutionId: 3,
        name: 'Sains',
        alias: 'SNS',
        description: 'Unggulan Sains',
      },
      {
        ladderId: 3,
        yearId: 5,
        institutionId: 3,
        name: 'Reguler',
        alias: 'RGL',
        description: 'Program Reguler',
      },
    ]

    await Major.createMany(majors)
  }
}
