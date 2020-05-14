import { storiesOf } from '@storybook/react';
import { Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import React from 'react';
import { deepMerge } from 'grommet/utils';
import { data } from '../../components/DataChart/data';
import { HpeThemeBarChart } from '../HpeThemeBar';


const dateFormatter = (date) => (
  new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
);

const customFormFieldTheme = {
  global: {},
};

const HpeThemeChart = () => (
  <Grommet theme={deepMerge(grommet, customFormFieldTheme)}>
    <Box style={{ width: 500, height: 300, border: '1px solid red' }}>
      <HpeThemeBarChart
        data={
          data.map(item => ({ ...item, date: dateFormatter(item.date) }))
        }
        margin='medium'
        keys={['percent']}
        indexBy='date'
        barPadding='small'
      />
    </Box>
  </Grommet>
);

storiesOf('Nivo', module).add('HPE Themed Bar Chart', () => <HpeThemeChart />);
