import { upcomingL2 } from './templates/upcoming'
import { Layer2 } from './types'

export const canto: Layer2 = upcomingL2({
  id: 'canto',
  createdAt: '2023-07-31T14:54:22',
  display: {
    name: 'Canto',
    slug: 'canto',
    description:
      "Canto is the L1 which will migrate to a Ethereum L2 scaling solution powered by Polygon's CDK dedicated to Real World Assets.",
    purposes: ['Universal'],
    category: 'ZK Rollup',
    provider: 'Polygon',
    links: {
      websites: ['https://canto.io'],
      apps: [],
      documentation: ['https://docs.canto.io'],
      explorers: [],
      repositories: [],
      socialMedia: [
        'https://twitter.com/CantoPublic',
        'https://discord.gg/canto',
      ],
    },
  },
})
