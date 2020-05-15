import { storiesOf } from '@storybook/react';
import { Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import React from 'react';
import { HpeThemePieChart } from '../HpeThemePieChart';
import { formatters } from '../utils';

const customTheme = {
  global: {
    colors: {
      'accent-1': '#00E8CF',
      'accent-2': '#7630EA',
      'accent-3': '#C54E4B',
      'accent-4': '#00739D',
      'accent-5': '##FF8300',
      'graph-0': 'accent-1',
      'graph-1': 'accent-2',
      'graph-2': 'accent-3',
      'graph-3': 'accent-4',
      'graph-4': 'accent-5',
    },
  },
};

const data = [
  {
    "id": 'Compute',
    "label": 'Compute',
    "value": 623,
  },
  {
    "id": 'Storage',
    "label": 'Storage',
    "value": 522,
  },
  {
    "id": 'Database',
    "label": 'Database',
    "value": 120,
  },
  {
    "id": 'Operations',
    "label": 'Operations',
    "value": 350,
  },
];

const MonthlyCharges = () => (
  <Grommet theme={deepMerge(grommet, customTheme)}>
    <HpeThemePieChart
      data={data}
      margin='small'
      formatter={formatters.currency()}
    />
  </Grommet>
);

storiesOf('Nivo', module).add('Total Cost per Service Category', () => <MonthlyCharges />);
