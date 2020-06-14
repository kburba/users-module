import React, { useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { IconButton, TextField } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { useForm } from 'react-hook-form';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import { formatValue } from '../../utils/utils';
import { VariousState } from '../../store/reducers/variousReducer';
import { ValueTypes } from './columns';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';

export type TableSort = {
  key: string;
  subKey?: string;
  asc: boolean;
};

export type TableColumn = {
  key: string;
  title: string;
  subKey?: string;
  valueType?: ValueTypes;
  totalsType?: 'avg' | 'sum';
  isEditable?: boolean;
  isSortable?: boolean;
  linkTo?: string;
  linkKey?: string;
  cellType?: string;
};

export type TableAction = {
  type: 'addToList' | 'edit' | 'delete';
  action: Function;
};

type TableProps<T> = {
  actions?: TableAction[];
  columns: TableColumn[];
  data: T[];
  editingRow?: string;
  isLoading?: boolean;
  isLoadingCell?: VariousState['isLoadingCell'];
  onCancel?(): void;
  onRowClickRoute?: string;
  onSubmit?(item: T, values): void;
  sortBy?: string;
  uniqueKey: string;
};

export default function Table<T>({
  actions,
  data,
  editingRow,
  isLoading,
  isLoadingCell,
  onCancel,
  onRowClickRoute,
  onSubmit,
  sortBy,
  uniqueKey,
  columns,
}: TableProps<T>) {
  const [sort, setSort] = useState<TableSort>({
    key: sortBy || '',
    asc: true,
  });
  const { register, errors, handleSubmit } = useForm();

  function handleActionClick(type: TableAction['type'], item: T) {
    if (actions) {
      const clickAction = actions.find((x) => x.type === type);
      if (clickAction) {
        clickAction.action(item);
      }
    }
  }

  function handleEditSubmit(item, values) {
    if (typeof onSubmit !== 'undefined') {
      onSubmit(item, values);
    }
    if (typeof onCancel !== 'undefined') {
      onCancel();
    }
  }

  function compare(a, b) {
    const valueA = sort.subKey ? a[sort.key][sort.subKey] : a[sort.key];
    const valueB = sort.subKey ? b[sort.key][sort.subKey] : b[sort.key];
    if (typeof valueA === 'string') valueA.toLowerCase();
    if (typeof valueB === 'string') valueB.toLowerCase();
    if (valueA < valueB) return 1;
    if (valueA > valueB) return -1;
    return 0;
  }

  const sortedData = data.sort(compare);

  if (sort.asc) sortedData.reverse();

  return (
    <div className="table">
      <table cellPadding="0" cellSpacing="0">
        <TableHeader
          columns={columns}
          withActions={!!actions}
          sort={sort}
          setSort={setSort}
        />
        <tbody>
          {sortedData.map((item) => {
            const isEditingRow = editingRow === item[uniqueKey];
            function handleEdit(values) {
              handleEditSubmit(item, values);
            }
            return (
              <tr
                key={item[uniqueKey]}
                className={classnames({ editing: isEditingRow })}
              >
                {columns.map((column, index) => {
                  const cellIsLoading =
                    isLoadingCell?.column === column.key &&
                    isLoadingCell?.row === item[uniqueKey];
                  const value = column.subKey
                    ? item[column.key][column.subKey]
                    : item[column.key];
                  const formattedValue = formatValue(value, column.valueType);
                  let columnValue:
                    | string
                    | number
                    | JSX.Element = formattedValue;
                  if (column.linkTo) {
                    const key = column.linkKey
                      ? item[column.key][column.linkKey]
                      : item[uniqueKey];
                    const link = `${column.linkTo}/${key}`;
                    columnValue = <Link to={link}>{formattedValue}</Link>;
                  }
                  const title: string =
                    column.valueType === ValueTypes.timestamp
                      ? moment(item[column.key]).format('LLL')
                      : value;
                  if (isEditingRow && column.isEditable) {
                    return (
                      <td
                        key={index + column.key}
                        className={classnames({
                          clickable: onRowClickRoute,
                        })}
                        title={title}
                      >
                        <TextField
                          inputRef={register({ required: true })}
                          defaultValue={value}
                          name={column.key}
                          error={typeof errors[column.key] !== 'undefined'}
                          helperText={
                            typeof errors[column.key] !== 'undefined' && 'Error'
                          }
                        />
                      </td>
                    );
                  }
                  if (column.cellType === 'services') {
                    return (
                      <td key={index + column.key}>
                        {item[column.key].map((service) => (
                          <div key={service._id}>
                            {service.service.type}: {service.service.from.name}{' '}
                            - {service.service.to.name}
                          </div>
                        ))}
                      </td>
                    );
                  }
                  return (
                    <td
                      key={index + column.key}
                      className={classnames({
                        loading: cellIsLoading,
                        clickable: onRowClickRoute,
                        'text-right': column.valueType === ValueTypes.currency,
                      })}
                      title={title}
                    >
                      {columnValue}
                    </td>
                  );
                })}
                {typeof editingRow === 'string' && isEditingRow ? (
                  <td>
                    <IconButton
                      type="button"
                      onClick={handleSubmit(handleEdit)}
                    >
                      <DoneIcon />
                    </IconButton>
                    <IconButton type="button" onClick={onCancel}>
                      <ClearIcon />
                    </IconButton>
                  </td>
                ) : (
                  <td
                    className={classnames({
                      loading:
                        isLoadingCell?.column === 'actions' &&
                        isLoadingCell?.row === item[uniqueKey],
                    })}
                  >
                    {actions &&
                      actions.map((action) => {
                        if (action.type === 'edit') {
                          return (
                            <IconButton
                              key={action.type}
                              type="button"
                              onClick={() => handleActionClick('edit', item)}
                              disabled={isLoading}
                            >
                              <CreateIcon />
                            </IconButton>
                          );
                        }
                        if (action.type === 'delete') {
                          return (
                            <IconButton
                              key={action.type}
                              type="button"
                              onClick={() => handleActionClick('delete', item)}
                              disabled={isLoading}
                            >
                              <DeleteIcon />
                            </IconButton>
                          );
                        }
                        if (action.type === 'addToList') {
                          return (
                            <button
                              key={action.type}
                              type="button"
                              onClick={() =>
                                handleActionClick('addToList', item)
                              }
                            >
                              Add
                            </button>
                          );
                        }
                        return null;
                      })}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
        <TableFooter data={data} columns={columns} />
      </table>
    </div>
  );
}
