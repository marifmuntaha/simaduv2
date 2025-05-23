import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { cuid } from '@adonisjs/core/helpers'
import { storeUserValidation, updateUserValidation } from '#validators/user'

export default class UsersController {
  async index({ request, response }: HttpContext) {
    try {
      let user = await User.query()
      let users
      if (request.input('institutionId')) {
        users = await User.query().preload('institutions', (institutionQuery) => {
          return institutionQuery.where('institution_id', request.input('institutionId'))
        })
      } else {
        users = user
      }
      if (request.input('type') === 'select') {
        users = user.map((item) => {
          return { value: item.id, label: item.fullName }
        })
      }
      return response.status(200).json({
        result: users,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.body()
      const image = request.file('image', {
        size: '1mb',
        extnames: ['jpg', 'jpeg', 'png'],
      })
      if (image) {
        const key = `images/users/${cuid()}.${image.extname}`
        await image.moveToDisk(key)
        data.image = image.meta.url
      }
      const payload = await storeUserValidation.validate(data)
      const user = new User()
      user.fullName = payload.fullName
      user.username = payload.username
      user.password = payload.password
      user.role = payload.role
      user.image = payload.image
      await user.save()
      user.related('institutions').attach([payload.institutionId])
      return response.status(200).json({
        message: 'User created',
        result: user,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const user = await User.query().preload('institutions').where('id', params.id)
      return response.status(200).json({
        result: user,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const data = request.body()
      const user = await User.findOrFail(params.id)
      const image = request.file('image', {
        size: '1mb',
        extnames: ['jpg', 'jpeg', 'png'],
      })
      if (image) {
        const key = `images/users/${cuid()}.${image.extname}`
        await image.moveToDisk(key)
        data.image = image.meta.url
      } else {
        data.image = user.image
      }
      const payload = await request.validateUsing(updateUserValidation, {
        meta: {
          id: params.id,
        },
        data: data,
      })
      user.fullName = payload.fullName
      user.username = payload.username
      user.password = payload.password ? payload.password : user.password
      user.role = payload.role
      user.image = payload.image
      await user.save()
      user.related('institutions').attach([payload.institutionId])
      return response.status(200).json({
        message: 'User updated',
        result: user,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      await user.related('institutions').detach()
      await user.delete()
      return response.status(200).json({
        message: 'User deleted',
        result: user,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }
}
