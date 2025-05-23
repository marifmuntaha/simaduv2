import type { HttpContext } from '@adonisjs/core/http'
import Ladder from '#models/ladder'
import { storeLadderValidation, updateLadderValidation } from '#validators/ladder'

export default class LaddersController {
  async index({ request, response }: HttpContext) {
    try {
      const ladder = await Ladder.query()
      let ladders
      if (request.input('type') === 'select') {
        ladders = ladder.map((item) => {
          return { value: item.id, label: item.name }
        })
      } else {
        ladders = ladder
      }
      return response.status(200).json({
        result: ladders,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.body()
      const payload = await storeLadderValidation.validate(data)
      const ladder = await Ladder.create(payload)
      return response.status(200).json({
        message: 'Ladder created',
        result: ladder,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const ladder = await Ladder.findOrFail(params.id)
      return response.status(200).json({
        result: ladder,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const data = request.body()
      const payload = await updateLadderValidation.validate(data)
      const ladder = await Ladder.findOrFail(params.id)
      const update = await ladder.merge(payload).save()
      return response.status(200).json({
        message: 'Ladder updated',
        result: update,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const ladder = await Ladder.findOrFail(params.id)
      await ladder.delete()
      return response.status(200).json({
        message: 'Ladder destroyed',
        result: ladder,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }
}
