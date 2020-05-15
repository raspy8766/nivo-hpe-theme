import { storiesOf } from '@storybook/react';
import { Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import React from 'react';
import { data } from '../../components/DataChart/data';
import { HpeThemeBarChart } from '../HpeThemeBar';
import { formatters } from '../utils';

const customTheme = {
  global: {
    colors: {
      'accent-1': '#00E8CF',
      'accent-2': '#7630EA',
      'graph-0': 'accent-1',
      'graph-1': 'accent-2',
    },
  },
};

// TODO: move container to HpeThemeBarChart
const HpeThemeChart = () => (
  <Grommet theme={deepMerge(grommet, customTheme)}>
    <HpeThemeBarChart
      data={data}
      margin='medium'
      keys={['percent']}
      indexBy='date'
      locale='en-US'
      formatters={{
        left: formatters.number(),
        bottom: formatters.date({ size: 'month-day' }),
      }}
      barPadding='small'
    />
  </Grommet>
);

storiesOf('Nivo', module).add('HPE Themed Bar Chart', () => <HpeThemeChart />);
