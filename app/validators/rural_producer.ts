import vine from '@vinejs/vine'

export const createRuralProducerValidator = vine.compile(
  vine.object({
    document: vine.string().trim().minLength(11),
    producer_name: vine.string().trim().minLength(1),
    farm_name: vine.string().trim().minLength(1),
    city: vine.string().trim().minLength(1),
    state: vine.string().trim().minLength(2),
    total_area: vine.number().min(1),
    arable_area: vine.number().min(1),
    vegetation_area: vine.number().min(1),
  })
)

export const updateRuralProducerValidator = vine.compile(
  vine.object({
    document: vine.string().trim().minLength(11),
  })
)
