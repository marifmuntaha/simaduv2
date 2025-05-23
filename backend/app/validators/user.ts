import vine from '@vinejs/vine'

export const storeUserValidation = vine.compile(
  vine.object({
    institutionId: vine.number(),
    fullName: vine.string(),
    username: vine.string().unique(async (db, value) => {
      const user = await db.from('users').where('username', value).first()
      return !user
    }),
    password: vine.string().confirmed(),
    role: vine.string(),
    image: vine.string().optional(),
  })
)

export const updateUserValidation = vine.compile(
  vine.object({
    institutionId: vine.number(),
    fullName: vine.string(),
    username: vine.string().unique(async (db, value, field) => {
      const user = await db
        .from('users')
        .where('username', value)
        .whereNot('id', field.meta.id)
        .first()
      return !user
    }),
    password: vine.string().confirmed().optional(),
    role: vine.string(),
    image: vine.string().optional(),
  })
)
