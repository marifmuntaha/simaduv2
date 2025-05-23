import vine from '@vinejs/vine'

export const storeYearValidation = vine.compile(
  vine.object({
    institutionId: vine.number(),
    name: vine.string(),
    description: vine.string().optional(),
    active: vine.string(),
  })
)

export const updateYearValidation = vine.compile(
  vine.object({
    institutionId: vine.number(),
    name: vine.string(),
    description: vine.string().optional(),
    active: vine.string(),
  })
)
