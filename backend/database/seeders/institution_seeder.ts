import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Institution from '#models/institution'

export default class extends BaseSeeder {
  async run() {
    const institutions = [
      {
        ladderId: 1,
        name: 'Darul Hikmah',
        alias: 'RADH',
        npsn: '12345678',
        nsm: '1234567890',
        logo: 'logo.jpg',
      },
      {
        ladderId: 2,
        name: 'PTQ Darul Hikmah',
        alias: 'MIDH',
        npsn: '12345678',
        nsm: '1234567890',
        logo: 'logo.jpg',
      },
      {
        ladderId: 3,
        name: 'Darul Hikmah',
        alias: 'MTsDH',
        npsn: '12345678',
        nsm: '1234567890',
        logo: 'logo.jpg',
      },
      {
        ladderId: 4,
        name: 'Darul Hikmah',
        alias: 'MADH',
        npsn: '12345678',
        nsm: '1234567890',
        logo: 'logo.jpg',
      },
    ]

    await Institution.createMany(institutions)
  }
}
