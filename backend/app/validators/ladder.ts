import vine from '@vinejs/vine'

export const storeLadderValidation = vine.compile(
  vine.object({
    name: vine.string(),
    alias: vine.string(),
    description: vine.string().optional(),
  })
)

export const updateLadderValidation = vine.compile(
  vine.object({
    name: vine.string(),
    alias: vine.string(),
    description: vine.string().optional(),
  })
)
