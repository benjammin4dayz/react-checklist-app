import { Meta, StoryObj } from '@storybook/react';
import { TaskStatusIcon } from '../../components/TaskCard/TaskStatusIcon';

const meta = {
  title: 'TaskCard/TaskStatusIcon',
  component: TaskStatusIcon,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof TaskStatusIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Inactive: Story = {
  args: {
    checked: false,
  },
};

export const Active: Story = {
  args: {
    checked: true,
  },
};
