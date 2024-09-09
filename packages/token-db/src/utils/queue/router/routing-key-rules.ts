import { Database } from '@l2beat/database'

export function byTokenChainId({ db }: { db: Database }) {
  return async (event: { tokenId: string }) => {
    const token = await db.token.findById(event.tokenId)
    if (!token) throw new Error('Token not found')
    const network = await db.networks.findById(token.networkId)
    if (!network) throw new Error('Network not found')
    return network.chainId
  }
}
