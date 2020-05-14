import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, DataChart, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import { data } from '../data';

const AxesDataChart = () => (
  <Grommet theme={grommet}>
    <Box align="center" justify="start" pad="large">
      <DataChart
        data={data}
        thickness='small'
        steps={[1, 6]}
        chart={{ key: 'percent' }}
        xAxis={{ key: 'date', guide: true }}
        yAxis={{ guide: true }}
      />
    </Box>
  </Grommet>
);

storiesOf('DataChart', module).add('Axes', () => <AxesDataChart />);
