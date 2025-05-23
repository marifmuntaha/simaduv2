import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    const users = [
      {
        fullName: 'Muhammad Arif Muntaha',
        username: 'marifmuntaha',
        password: 'password',
        role: '1',
        image: 'avatar.jpg',
      },
    ]

    await User.createMany(users)
  }
}
