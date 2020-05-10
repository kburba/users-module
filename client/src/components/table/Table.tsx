import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { IconButton, TextField } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { formatValue, calcTotals } from '../../utils/utils';
import { useForm } from 'react-hook-form';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import { VariousState } from '../../store/reducers/variousReducer';
import { ValueTypes } from './columns';

export type TableColumn = {
    key: string;
    title: string;
    subKey?: string;
    valueType?: ValueTypes;
    totalsType?: 'avg' | 'sum';
    isEditable?: boolean;
    linkTo?: string;
    cellType?: string;
};

export type TableAction = {
    type: 'addToList' | 'edit' | 'delete';
    action: Function;
};

type TableProps<T> = {
    data: T[];
    columns: TableColumn[];
    uniqueKey: string;
    actions?: TableAction[];
    isLoading?: boolean;
    isLoadingCell?: VariousState['isLoadingCell'];
    onRowClickRoute?: string;
    editingRow?: string;
    onSubmit?(item: T, values): void;
    onCancel?(): void;
};

export default function Table<T>({
    actions,
    isLoadingCell,
    columns,
    data,
    editingRow,
    isLoading,
    onCancel,
    onRowClickRoute,
    onSubmit,
    uniqueKey,
}: TableProps<T>) {
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

    const totals = calcTotals<T>(data, columns);

    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={index + column.key}
                                className={classnames({ 'text-right': column.valueType === ValueTypes.currency })}
                            >
                                {column.title}
                            </th>
                        ))}
                        {actions && <th>Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => {
                        const isEditingRow = editingRow === item[uniqueKey];
                        function handleEdit(values) {
                            handleEditSubmit(item, values);
                        }
                        return (
                            <tr key={item[uniqueKey]} className={classnames({ editing: isEditingRow })}>
                                {columns.map((column, index) => {
                                    const cellIsLoading =
                                        isLoadingCell?.column === column.key && isLoadingCell?.row === item[uniqueKey];
                                    const value = column.subKey ? item[column.key][column.subKey] : item[column.key];
                                    const formattedValue = formatValue(value, column.valueType);
                                    let columnValue: string | number | JSX.Element = formattedValue;
                                    if (column.linkTo) {
                                        const link = `${column.linkTo}/${item[uniqueKey]}`;
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
                                                    helperText={typeof errors[column.key] !== 'undefined' && 'Error'}
                                                />
                                            </td>
                                        );
                                    }
                                    if (column.cellType === 'services') {
                                        return (
                                            <td key={index + column.key}>
                                                {item[column.key].map((service) => (
                                                    <div key={service._id}>
                                                        {service.service.type}: {service.service.from.name} -{' '}
                                                        {service.service.to.name}
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
                                        <IconButton type="button" onClick={handleSubmit(handleEdit)}>
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
                                                } else if (action.type === 'delete') {
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
                                                } else if (action.type === 'addToList') {
                                                    return (
                                                        <button
                                                            key={action.type}
                                                            type="button"
                                                            onClick={() => handleActionClick('addToList', item)}
                                                        >
                                                            Add
                                                        </button>
                                                    );
                                                } else {
                                                    return null;
                                                }
                                            })}
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        {columns.map((column, index) => {
                            return (
                                <td
                                    key={index + column.key}
                                    className={classnames({ 'text-right': column.valueType === ValueTypes.currency })}
                                >
                                    {formatValue(totals[column.key], column.valueType)}
                                </td>
                            );
                        })}
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
