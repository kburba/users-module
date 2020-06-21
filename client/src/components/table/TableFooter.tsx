import React from 'react';
import classnames from 'classnames';
import { TableColumn } from './Table';
import { ValueTypes } from './columns';
import { formatValue, calcTotals } from '../../utils/utils';

export default function TableFooter({
  columns,
  data,
}: {
  data: any[];
  columns: TableColumn[];
}) {
  const totals = calcTotals(data, columns);

  return (
    <tfoot>
      <tr>
        {columns.map((column, index) => {
          const value = column.valueType
            ? formatValue(totals[column.key], column.valueType)
            : totals[column.key];
          return (
            <td
              key={index + column.key}
              className={classnames({
                'text-right': column.valueType === ValueTypes.currency,
              })}
            >
              {value}
            </td>
          );
        })}
        <td />
      </tr>
    </tfoot>
  );
}
