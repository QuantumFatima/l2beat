import { TokenBridgeRecord } from './entity'

export const selectTokenBridge = [
  'id',
  'targetTokenId',
  'sourceTokenId',
  'targetTokenId',
  'externalBridgeId',
  'updatedAt',
  'createdAt',
] as const satisfies (keyof TokenBridgeRecord)[]
