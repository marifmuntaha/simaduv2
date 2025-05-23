import type { HttpContext } from '@adonisjs/core/http'
import Level from '#models/level'
import { storeLevelValidation, updateLevelValidation } from '#validators/level'

export default class LevelsController {
  async index({ request, response }: HttpContext) {
    try {
      let level
      let levels
      if (request.input('ladderId')) {
        level = await Level.query().where('ladderId', request.input('ladderId'))
      } else {
        level = await Level.all()
      }
      if (request.input('type') === 'select') {
        levels = level.map((item) => {
          return { value: item.id, label: item.name }
        })
      } else {
        levels = level
      }
      return response.status(200).json({
        result: levels,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.body()
      const payload = await storeLevelValidation.validate(data)
      const level = await Level.create(payload)
      return response.status(201).json({
        message: 'store level',
        result: level,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const level = await Level.findOrFail(params.id)
      return response.status(200).json({
        result: level,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const data = request.body()
      const level = await Level.findOrFail(params.id)
      const payload = await updateLevelValidation.validate(data)
      const update = await level.merge(payload).save()
      return response.status(200).json({
        message: 'update level',
        result: update,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const level = await Level.findOrFail(params.id)
      await level.delete()
      return response.status(200).json({
        message: 'delete level',
        result: level,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }
}
