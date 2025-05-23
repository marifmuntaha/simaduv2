import type { HttpContext } from '@adonisjs/core/http'
import Major from '#models/major'
import { storeMajorValidation, updateMajorValidation } from '#validators/major'

export default class MajorsController {
  async index({ request, response }: HttpContext) {
    try {
      let major = Major.query()
      let data
      if (request.input('ladderId')) {
        await major.where('ladderId', request.input('ladderId'))
      }
      if (request.input('yearId')) {
        await major.where('yearId', request.input('yearId'))
      }
      if (request.input('institutionId')) {
        await major.where('institutionId', request.input('institutionId'))
      }
      const majors = await major
      if (request.input('type') === 'select') {
        data = majors.map((item) => {
          return { value: item.id, label: item.name }
        })
      } else {
        data = majors
      }
      return response.status(200).json({
        result: data,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.body()
      const payload = await storeMajorValidation.validate(data)
      const major = await Major.create(payload)
      return response.status(201).json({
        message: 'Major created',
        result: major,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  async show({ params: { id }, response }: HttpContext) {
    try {
      const major = await Major.findOrFail(id)
      return response.status(200).json({
        result: major,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  async update({ params: { id }, request, response }: HttpContext) {
    try {
      const data = request.body()
      const major = await Major.findOrFail(id)
      const payload = await updateMajorValidation.validate(data)
      const update = await major.merge(payload).save()
      return response.status(200).json({
        message: 'Major updated',
        result: update,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  async destroy({ params: { id }, response }: HttpContext) {
    try {
      const major = await Major.findOrFail(id)
      await major.delete()
      return response.status(200).json({
        message: 'Major deleted',
        result: major,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }
}
