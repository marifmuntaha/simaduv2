import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const storeTeacherValidation = vine.compile(
  vine.object({
    userId: vine.number(),
    fullName: vine.string(),
    nik: vine.string().unique(async (db, value) => {
      const teacher = await db.from('teachers').where('nik', value).first()
      return !teacher
    }),
    birthPlace: vine.string(),
    birthDate: vine
      .date({
        formats: 'YYYY-MM-MM',
      })
      .transform((date) => DateTime.fromJSDate(date)),
    gender: vine.string(),
  })
)

export const updateTeacherValidation = vine.compile(
  vine.object({
    userId: vine.number(),
    nik: vine.string().unique(async (db, value, field) => {
      const teacher = await db
        .from('teachers')
        .where('nik', value)
        .whereNot('id', field.meta.id)
        .first()
      return !teacher
    }),
    birthPlace: vine.string(),
    birthDate: vine
      .date({
        formats: 'YYYY-MM-MM',
      })
      .transform((date) => DateTime.fromJSDate(date)),
    gender: vine.string(),
  })
)
