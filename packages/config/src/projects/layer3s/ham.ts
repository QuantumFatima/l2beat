import { ProjectId, UnixTime } from '@l2beat/shared-pure'
import { ProjectDiscovery } from '../../discovery/ProjectDiscovery'
import { Badge } from '../badges'
import { opStackL3 } from '../layer2s/templates/opStack'
import { Layer3 } from './types'

const discovery = new ProjectDiscovery('ham', 'base')

export const ham: Layer3 = opStackL3({
  discovery,
  hostChain: ProjectId('base'),
  badges: [Badge.L3ParentChain.Base],
  additionalPurposes: ['Social'],
  display: {
    name: 'Ham',
    slug: 'ham',
    description:
      'Ham Chain is an OP stack Optimium L3 on Base enabling Tips and SocialFi on the Farcaster social network.',
    links: {
      websites: ['https://ham.fun/'],
      apps: [
        'https://ham.bridge.caldera.xyz/',
        'https://ham.fun/bridge',
        'https://relay.link/ham',
      ],
      documentation: [
        'https://docs.ham.fun/',
        'https://stack.optimism.io/',
        'https://ham.fun/developers',
      ],
      explorers: ['https://explorer.ham.fun/'],
      repositories: [],
      socialMedia: [
        'https://x.com/HamOnWarpcast',
        'https://warpcast.com/~/channel/lp',
        'https://t.me/+B93fbhulpb5iYWYx',
      ],
    },
    activityDataSource: 'Blockchain RPC',
  },
  genesisTimestamp: new UnixTime(1716590734),
  isNodeAvailable: true,
  rpcUrl: 'https://rpc.ham.fun', // chainId: 5112
  discoveryDrivenData: true,
})
