import { upcomingL2 } from './templates/upcoming'
import { Layer2 } from './types'

export const debank: Layer2 = upcomingL2({
  id: 'debank',
  createdAt: '2023-09-28T12:40:49',
  display: {
    name: 'Debank Chain',
    slug: 'debank',
    description:
      'Debank Chain is an upcoming scaling solution by Debank team. It is powered by the OP Stack.',
    purposes: ['Universal', 'Social'],
    category: 'Optimistic Rollup',
    provider: 'OP Stack',
    links: {
      websites: ['https://debank.com/account'],
      apps: [],
      documentation: [],
      explorers: ['https://explorer.testnet.debank.com/'],
      repositories: ['https://github.com/DeBankDeFi/DeBankChain'],
      socialMedia: [
        'https://twitter.com/DebankDeFi',
        'https://medium.com/debank',
        'https://debank.com/official/DeBank',
      ],
    },
  },
})
