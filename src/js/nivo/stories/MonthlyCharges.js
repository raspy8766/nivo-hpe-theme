import { storiesOf } from '@storybook/react';
import { Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import React from 'react';
import { HpeThemeBarChart } from '../HpeThemeBar';
import { formatters } from '../utils';

const customFormFieldTheme = {
  chart: {
    color: 'graph-0',
  },
};

const data = [
  {
    "Date": "2020-01-01",
    "Top Off Charges": 45000,
    "Usage Charges": 11000,
  },
  {
    "Date": "2020-02-02",
    "Top Off Charges": 19000,
    "Usage Charges": 8000,
  },
  {
    "Date": "2020-03-03",
    "Top Off Charges": 8000,
    "Usage Charges": 2000,
  },
  {
    "Date": "2020-04-05",
    "Top Off Charges": 5000,
    "Usage Charges": 1000,
  },
  {
    "Date": "2020-05-06",
    "Top Off Charges": 30000,
    "Usage Charges": 10000,
  },
  {
    "Date": "2020-06-08",
    "Top Off Charges": 25000,
    "Usage Charges": 10000,
  },
];

const MonthlyCharges = () => (
  <Grommet theme={deepMerge(grommet, customFormFieldTheme)}>
    <HpeThemeBarChart
      data={data}
      margin='medium'
      keys={['Usage Charges', 'Top Off Charges']}
      indexBy='Date'
      locale='en-US'
      formatters={{
        left: formatters.currency(),
        bottom: formatters.date({size: 'month'}),
      }}
      barPadding='small'
    />
  </Grommet>
);

storiesOf('Nivo', module).add('Monthly Charges', () => <MonthlyCharges />);
