import {selectSchema, createSchema, editSchema}from './devices.model'
import {z} from 'zod'

export type Device = z.infer<typeof selectSchema>

export type DeviceMutationRequest = z.infer<typeof createSchema>

export type DeviceMutationPatchRequest = z.infer<typeof editSchema>
