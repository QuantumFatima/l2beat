import { Database } from '@l2beat/database'
import { NetworkConfig, WithExplorer } from './getNetworksConfig.js'

type Dependencies = {
  db: Database
  networkConfig: WithExplorer<NetworkConfig>
}

type Options = {
  /**
   * If true, the source will fetch the data for all tokens from scratch.
   */
  flush: boolean
}

export function getTokensForChain(
  { db, networkConfig }: Dependencies,
  { flush }: Options = { flush: false },
) {
  return flush
    ? db.token.getByChainId(networkConfig.chainId)
    : db.token.getByChainIdWithoutDeployment(networkConfig.chainId)
}
