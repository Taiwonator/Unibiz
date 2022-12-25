import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from '.';

export default {
  title: 'Primitive/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
export const Secondary = Template.bind({});
export const Positive = Template.bind({});
export const Negative = Template.bind({});

Primary.args = {
  children: 'Primary Button',
  type: 'primary',
};

Secondary.args = {
  children: 'Secondary Button',
  type: 'secondary',
};

Positive.args = {
  children: 'Positive Button',
  type: 'positive',
};

Negative.args = {
  children: 'Negative Button',
  type: 'negative',
};
