import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';
import { TableCell } from '../TableCell';
import { Text } from '../Text';

import { Resizer } from './Resizer';
import { Searcher } from './Searcher';
import { ExpanderCell } from './ExpanderCell';
import { StyledDataTableHeader, StyledDataTableRow } from './StyledDataTable';

const Header = ({
  background,
  border,
  columns,
  filtering,
  filters,
  groups,
  groupState,
  onFilter,
  onFiltering,
  onResize,
  onSort,
  onToggle,
  pad,
  sort,
  widths,
  ...rest
}) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  return (
    <StyledDataTableHeader {...rest}>
      <StyledDataTableRow>
        {groups && (
          <ExpanderCell
            context="header"
            expanded={
              Object.keys(groupState).filter(k => !groupState[k].expanded)
                .length === 0
            }
            onToggle={onToggle}
          />
        )}

        {columns.map(
          ({
            property,
            header,
            align,
            search,
            sortable,
            verticalAlign,
            size,
          }) => {
            let content =
              typeof header === 'string' ? <Text>{header}</Text> : header;

            if (onSort && sortable !== false) {
              const Icon =
                onSort &&
                sortable !== false &&
                sort &&
                sort.property === property &&
                theme.dataTable.icons[
                  sort.direction !== 'asc' ? 'ascending' : 'descending'
                ];
              content = (
                <Button plain fill="vertical" onClick={onSort(property)}>
                  <Box direction="row" align="center" gap="xsmall">
                    {content}
                    {Icon && <Icon />}
                  </Box>
                </Button>
              );
            }

            if (search || onResize) {
              const resizer = onResize ? (
                <Resizer property={property} onResize={onResize} />
              ) : null;
              const searcher =
                search && filters ? (
                  <Searcher
                    filtering={filtering}
                    filters={filters}
                    property={property}
                    onFilter={onFilter}
                    onFiltering={onFiltering}
                  />
                ) : null;
              content = (
                <Box
                  direction="row"
                  align="center"
                  justify={!align || align === 'start' ? 'between' : align}
                  gap="small"
                  fill="vertical"
                  style={onResize ? { position: 'relative' } : undefined}
                >
                  {content}
                  {searcher && resizer ? (
                    <Box
                      flex="shrink"
                      direction="row"
                      align="center"
                      gap="small"
                    >
                      {searcher}
                      {resizer}
                    </Box>
                  ) : (
                    searcher || resizer
                  )}
                </Box>
              );
            }

            return (
              <TableCell
                key={property}
                align={align}
                verticalAlign={verticalAlign}
                background={background}
                border={border}
                pad={pad}
                plain
                scope="col"
                size={widths && widths[property] ? undefined : size}
                style={
                  widths && widths[property]
                    ? { width: widths[property] }
                    : undefined
                }
              >
                {content}
              </TableCell>
            );
          },
        )}
      </StyledDataTableRow>
    </StyledDataTableHeader>
  );
};

Header.displayName = 'Header';

Header.defaultProps = {};
Object.setPrototypeOf(Header.defaultProps, defaultProps);

export { Header };
