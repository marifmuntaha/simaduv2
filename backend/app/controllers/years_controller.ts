import type { HttpContext } from '@adonisjs/core/http'
import Year from '#models/year'
import { storeYearValidation, updateYearValidation } from '#validators/year'

export default class YearsController {
  async index({ request, response }: HttpContext) {
    try {
      let year = await Year.query()
      let years
      if (request.input('institutionId')) {
        year = await Year.query().where('institutionId', request.input('institutionId'))
      }
      if (request.input('type') === 'select') {
        years = year.map((item) => {
          return { value: item.id, label: item.name, active: item.active === '1' }
        })
      } else {
        years = year
      }
      return response.status(200).json({
        result: years,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.body()
      const payload = await storeYearValidation.validate(data)
      const year = await Year.create(payload)
      return response.status(200).json({
        message: 'Year updated',
        result: year,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const year = await Year.findOrFail(params.id)
      return response.status(200).json({
        message: 'Year updated',
        result: year,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const data = request.body()
      const year = await Year.findOrFail(params.id)
      const payload = await updateYearValidation.validate(data)
      const update = await year.merge(payload).save()
      return response.status(200).json({
        message: 'Year updated',
        result: update,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const year = await Year.findOrFail(params.id)
      await year.delete()
      return response.status(200).json({
        message: 'Year deleted',
        result: year,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }
}
