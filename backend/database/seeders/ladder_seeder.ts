import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Ladder from '#models/ladder'

export default class extends BaseSeeder {
  async run() {
    const ladders = [
      { name: 'Raudhatul Atfal', alias: 'RA', description: 'Raudhatul Atfal' },
      { name: 'Madrasah Ibtidaiyah', alias: 'MI', description: 'Madrasah Ibtidaiyah' },
      { name: 'Madrasah Tsanawiyah', alias: 'MTs', description: 'Madrasah Tsanawiyah' },
      { name: 'Madrasah Aliyah', alias: 'MA', description: 'Madrasah Aliyah' },
    ]

    await Ladder.createMany(ladders)
  }
}
