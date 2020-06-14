import React from 'react';
import classnames from 'classnames';
import { TableColumn, TableSort } from './Table';
import { ValueTypes } from './columns';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwarnIcon from '@material-ui/icons/ArrowUpward';

export default function TableHeader({
  columns,
  withActions,
  sort,
  setSort,
}: {
  columns: TableColumn[];
  withActions?: boolean;
  sort: TableSort;
  setSort: (newSort: TableSort) => void;
}) {
  function handleSortClick(column: TableColumn) {
    setSort({
      key: column.key,
      ...(column.subKey && { subKey: column.subKey }),
      asc: !(
        (sort.subKey
          ? column.subKey === sort.subKey
          : column.key === sort.key) && sort.asc
      ),
    });
  }
  return (
    <thead>
      <tr>
        {columns.map((column, index) => {
          const active = sort.subKey
            ? column.key === sort.key && column.subKey === sort.subKey
            : column.key === sort.key;
          return (
            <th
              key={index + column.key}
              onClick={
                column.isSortable ? () => handleSortClick(column) : undefined
              }
              className={classnames({
                'text-right': column.valueType === ValueTypes.currency,
                active,
                sortable: column.isSortable,
              })}
            >
              {column.title}
              {active && sort.asc && (
                <ArrowDownwardIcon style={{ fontSize: '1rem' }} />
              )}
              {active && !sort.asc && (
                <ArrowUpwarnIcon style={{ fontSize: '1rem' }} />
              )}
            </th>
          );
        })}
        {withActions && <th>Action</th>}
      </tr>
    </thead>
  );
}
