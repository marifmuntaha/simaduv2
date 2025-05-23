import vine from '@vinejs/vine'

export const storeInstitutionValidation = vine.compile(
  vine.object({
    ladderId: vine.number(),
    name: vine.string(),
    alias: vine.string(),
    npsn: vine.string(),
    nsm: vine.string(),
    logo: vine.string(),
  })
)

export const updateInstitutionValidation = vine.compile(
  vine.object({
    ladderId: vine.number(),
    name: vine.string(),
    alias: vine.string(),
    npsn: vine.string(),
    nsm: vine.string(),
    logo: vine.string(),
  })
)
