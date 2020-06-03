import React, {
  forwardRef,
  cloneElement,
  Children,
  useContext,
  useState,
} from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';

import { StyledTabPanel, StyledTabs, StyledTabsHeader } from './StyledTabs';

const Tabs = forwardRef(
  (
    {
      children,
      flex,
      justify = 'center',
      messages = { tabContents: 'Tab Contents' },
      responsive = true,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const { activeIndex: propsActiveIndex, onActive } = rest;
    const [activeIndex, setActiveIndex] = useState(rest.activeIndex || 0);

    if (activeIndex !== propsActiveIndex && propsActiveIndex !== undefined) {
      setActiveIndex(propsActiveIndex);
    }

    const activateTab = index => {
      if (propsActiveIndex === undefined) {
        setActiveIndex(index);
      }
      if (onActive) {
        onActive(index);
      }
    };

    /* eslint-disable no-param-reassign */
    delete rest.activeIndex;
    delete rest.onActive;
    /* eslint-enable no-param-reassign */

    let activeContent;
    let activeTitle;
    const tabs = Children.map(
      children,
      (tab, index) => {
        if (!tab) return undefined;

        const tabProps = tab.props || {};

        const isTabActive = index === activeIndex;

        if (isTabActive) {
          activeContent = tabProps.children;
          if (typeof tabProps.title === 'string') {
            activeTitle = tabProps.title;
          } else {
            activeTitle = index + 1;
          }
        }

        return cloneElement(tab, {
          active: isTabActive,
          onActivate: () => activateTab(index),
        });
      },
      this,
    );

    const tabContentTitle = `${activeTitle || ''} ${messages.tabContents}`;

    return (
      <StyledTabs
        ref={ref}
        as={Box}
        role="tablist"
        flex={flex}
        responsive={responsive}
        {...rest}
        background={theme.tabs.background}
      >
        <StyledTabsHeader
          as={Box}
          direction="row"
          justify={justify}
          flex={false}
          wrap
          background={theme.tabs.header.background}
          gap={theme.tabs.gap}
        >
          {tabs}
        </StyledTabsHeader>
        <StyledTabPanel
          flex={flex}
          aria-label={tabContentTitle}
          role="tabpanel"
        >
          {activeContent}
        </StyledTabPanel>
      </StyledTabs>
    );
  },
);

Tabs.displayName = 'Tabs';

let TabsDoc;
if (process.env.NODE_ENV !== 'production') {
  TabsDoc = require('./doc').doc(Tabs); // eslint-disable-line global-require
}
const TabsWrapper = TabsDoc || Tabs;

export { TabsWrapper as Tabs };
