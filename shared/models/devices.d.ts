import {selectSchema}from './devices.model'
import {z} from 'zod'

export type Device = z.infer<typeof selectSchema>
