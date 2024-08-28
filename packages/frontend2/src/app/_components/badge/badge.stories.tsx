import { type Meta, type StoryObj } from '@storybook/react'

import { Badge } from './badge'

const meta = {
  component: Badge,
  args: {
    children: 'Badge',
  },
} satisfies Meta<typeof Badge>
export default meta
type Story = StoryObj<typeof meta>

export const Error: Story = {
  args: {
    type: 'error',
  },
}

export const Warning: Story = {
  args: {
    type: 'warning',
  },
}

export const BrightYellow: Story = {
  args: {
    type: 'brightYellow',
  },
}

export const Purple: Story = {
  args: {
    type: 'purple',
  },
}

export const Gray: Story = {
  args: {
    type: 'gray',
  },
}
