import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Level from '#models/level'

export default class extends BaseSeeder {
  async run() {
    const levels = [
      { ladderId: 3, name: '7', alias: 'VII', description: '' },
      { ladderId: 3, name: '8', alias: 'VIII', description: '' },
      { ladderId: 3, name: '9', alias: 'IX', description: '' },
    ]

    await Level.createMany(levels)
  }
}
