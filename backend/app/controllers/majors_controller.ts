import type { HttpContext } from '@adonisjs/core/http'
import Major from '#models/major'

export default class MajorsController {
  async index({ request, response }: HttpContext) {
    let major = Major.query()
    let majors
    if (request.input('ladderId')) {
      await major.where('ladderId', request.input('ladderId'))
    }
    if (request.input('yearId')) {
      await major.where('yearId', request.input('yearId'))
    }
    if (request.input('institutionId')) {
      await major.where('institutionId', request.input('institutionId'))
    }
    console.log(major.model)
  }
}
