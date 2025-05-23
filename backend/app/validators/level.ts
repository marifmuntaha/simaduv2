import vine from '@vinejs/vine'

export const storeLevelValidation = vine.compile(
  vine.object({
    ladderId: vine.number(),
    name: vine.string(),
    alias: vine.string(),
    description: vine.string().optional(),
  })
)

export const updateLevelValidation = vine.compile(
  vine.object({
    ladderId: vine.number(),
    name: vine.string(),
    alias: vine.string(),
    description: vine.string().optional(),
  })
)
