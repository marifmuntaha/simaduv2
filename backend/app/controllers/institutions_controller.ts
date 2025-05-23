import type { HttpContext } from '@adonisjs/core/http'
import Institution from '#models/institution'
import { storeInstitutionValidation, updateInstitutionValidation } from '#validators/institution'
import { cuid } from '@adonisjs/core/helpers'

export default class InstitutionsController {
  async index({ request, response }: HttpContext) {
    try {
      const institution = await Institution.query().preload('ladder')
      let institutions
      if (request.input('type') === 'select') {
        institutions = institution.map((item) => {
          return { value: item.id, label: item.ladder.alias + ' ' + item.name }
        })
      } else {
        institutions = institution
      }
      return response.status(200).json({
        result: institutions,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.body()
      const logo = request.file('logo', {
        size: '1mb',
        extnames: ['jpeg', 'jpg', 'png'],
      })
      if (logo) {
        const key = `images/institution/${cuid()}.${logo.extname}`
        await logo.moveToDisk(key)
        data.logo = logo.meta.url
      }
      const payload = await storeInstitutionValidation.validate(data)
      const institution = await Institution.create(payload)
      return response.status(200).json({
        message: 'Institution created',
        result: institution,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const institution = await Institution.query().preload('ladder').where('id', params.id)
      return response.status(200).json({
        result: institution,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const data = request.body()
      const institution = await Institution.findOrFail(params.id)
      const logo = request.file('logo', {
        size: '1mb',
        extnames: ['jpeg', 'jpg', 'png'],
      })
      if (logo) {
        const key = `images/institution/${cuid()}.${logo.extname}`
        await logo.moveToDisk(key)
        data.logo = logo.meta.url
      } else {
        data.logo = institution.logo
      }
      const payload = await updateInstitutionValidation.validate(data)
      const update = await institution.merge(payload).save()
      return response.status(200).json({
        message: 'Institution updated',
        result: update,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const institution = await Institution.findOrFail(params.id)
      await institution.delete()
      return response.status(200).json({
        message: 'Institution destroyed',
        result: institution,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }
}
