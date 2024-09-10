import { ExternalBridgeRecord } from './entity'

export const selectExternalBridge = [
  'id',
  'name',
  'type',
  'updatedAt',
  'createdAt',
] as const satisfies (keyof ExternalBridgeRecord)[]
