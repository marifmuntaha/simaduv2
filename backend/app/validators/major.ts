import vine from '@vinejs/vine'

export const storeMajorValidation = vine.compile(
  vine.object({
    ladderId: vine.number(),
    yearId: vine.number(),
    institutionId: vine.number(),
    name: vine.string(),
    alias: vine.string(),
    description: vine.string().optional(),
  })
)

export const updateMajorValidation = vine.compile(
  vine.object({
    ladderId: vine.number(),
    yearId: vine.number(),
    institutionId: vine.number(),
    name: vine.string(),
    alias: vine.string(),
    description: vine.string().optional(),
  })
)
