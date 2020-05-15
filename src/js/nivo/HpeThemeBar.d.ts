import * as React from 'react';
import { A11yTitleType, MarginType } from '../utils';

type Data = { [prop: string]: number | string }
export interface ChartProps {
  a11yTitle?: A11yTitleType;
  margin?: MarginType;
  round?: boolean;
  key: string;
  indexBy: string;
  size?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'full' | {height?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'full' | string,width?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'full' | string} | string;
  barPadding?: 'hair' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string;
  colorScheme?: 'theme' | 'status'
  thickness?: 'hair' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'none' | string;
  data: Data[];
}

declare const HpeThemeBarChart: React.ComponentClass<ChartProps>;

export { HpeThemeBarChart };

