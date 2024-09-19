import vine from '@vinejs/vine'

export const createRuralProducerValidator = vine.compile(
  vine.object({
    document: vine.string().trim().minLength(11),
  })
)

export const updateRuralProducerValidator = vine.compile(
  vine.object({
    document: vine.string().trim().minLength(11),
  })
)
