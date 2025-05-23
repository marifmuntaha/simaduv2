import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Year from '#models/year'

export default class extends BaseSeeder {
  async run() {
    const years = [
      { institutionId: 4, name: '2022/2023', description: '', active: '2' },
      { institutionId: 4, name: '2023/2024', description: '', active: '2' },
      { institutionId: 4, name: '2024/2025', description: '', active: '1' },
      { institutionId: 4, name: '2026/2027', description: '', active: '2' },
    ]

    await Year.createMany(years)
  }
}
