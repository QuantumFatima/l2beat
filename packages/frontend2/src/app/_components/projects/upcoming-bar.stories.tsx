import { type Meta, type StoryObj } from '@storybook/react'
import { UpcomingBar } from './upcoming-bar'

const meta = {
  component: UpcomingBar,
} satisfies Meta<typeof UpcomingBar>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
