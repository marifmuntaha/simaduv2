import type { HttpContext } from '@adonisjs/core/http'
import Teacher from '#models/teacher'
import { storeTeacherValidation, updateTeacherValidation } from '#validators/teacher'

export default class TeachersController {
  async index({ response }: HttpContext) {
    try {
      const teachers = await Teacher.all()
      return response.status(200).json({
        result: teachers,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.body()
      const payload = await storeTeacherValidation.validate(data)
      const teacher = await Teacher.create(payload)
      return response.status(201).json({
        message: 'Teacher created successfully.',
        result: teacher,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  async show({ params: { id }, response }: HttpContext) {
    try {
      const teacher = await Teacher.findOrFail(id)
      return response.status(200).json({
        result: teacher,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  async update({ params: { id }, request, response }: HttpContext) {
    try {
      const data = request.body()
      const teacher = await Teacher.findOrFail(id)
      const payload = await request.validateUsing(updateTeacherValidation, {
        meta: {
          id: id,
        },
        data: data,
      })
      const update = await teacher.merge(payload).save()
      return response.status(200).json({
        message: 'Teacher updated successfully.',
        result: update,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  async destroy({ params: { id }, response }: HttpContext) {
    try {
      const teacher = await Teacher.findOrFail(id)
      await teacher.delete()
      return response.status(200).json({
        message: 'Teacher destroyed successfully.',
        result: teacher,
      })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }
}
