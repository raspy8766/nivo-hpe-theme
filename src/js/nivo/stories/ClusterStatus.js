import { storiesOf } from '@storybook/react';
import { Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import React from 'react';
import { HpeThemePieChart } from '../HpeThemePieChart';

const data = [
  {
    "id": 'Healthy',
    "value": 7,
    "status": 'status-ok',
  },
  {
    "id": 'Warning',
    "value": 1,
    "status": 'status-warning',
  },
  {
    "id": 'Critical',
    "value": 2,
    "status": 'status-critical',
  },
].map(datum => ({...datum, id: `${datum.value} ${datum.id}`}));

const MonthlyCharges = () => (
  <Grommet theme={grommet}>
    <HpeThemePieChart
      data={data}
      margin='small'
      chartType='donut'
      colorMode='status'
      legendType='label'
    />
  </Grommet>
);

storiesOf('Nivo', module).add('Cluster Status', () => <MonthlyCharges />);
