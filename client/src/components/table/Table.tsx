import React, { useState } from 'react';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import classnames from 'classnames';
import { IconButton, TextField } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { formatValue, calcTotals } from '../../utils/utils';
import { useForm } from 'react-hook-form';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

export type TableColumn = {
    key: string;
    title: string;
    subKey?: string;
    valueType?: 'timestamp' | 'currency';
    totalsType?: 'avg' | 'sum';
    isEditable?: boolean;
    editType?: 'input';
};

export type TableAction = {
    type: 'edit' | 'delete';
    action: Function;
};

type TableProps<T> = {
    data: T[];
    columns: TableColumn[];
    uniqueKey: string;
    actions?: TableAction[];
    isLoading?: boolean;
    onRowClickRoute?: string;
    editingRow?: string;
    onSubmit?(item: T, values): void;
    onCancel?(): void;
    customRow?: {
        show: boolean;
        rowElement: JSX.Element;
    };
};

export default function Table<T>({
    data,
    columns,
    uniqueKey,
    isLoading,
    actions,
    onRowClickRoute,
    editingRow,
    onSubmit,
    onCancel,
    customRow,
}: TableProps<T>) {
    const [newRoute, setNewRoute] = useState<string | null>(null);
    const { register, errors, handleSubmit } = useForm();

    function handleActionClick(type: 'edit' | 'delete', item: T) {
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

    function handleRowClick(item: T) {
        setNewRoute(`${onRowClickRoute}/${item[uniqueKey]}`);
    }

    const totals = calcTotals<T>(data, columns);

    if (newRoute) {
        return <Redirect to={newRoute} />;
    }

    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index + column.key}>{column.title}</th>
                        ))}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {customRow && customRow.show && customRow.rowElement}
                    {data.map((item) => {
                        const isEditingRow = editingRow === item[uniqueKey];
                        function handleEdit(values) {
                            handleEditSubmit(item, values);
                        }
                        return (
                            <tr key={item[uniqueKey]} className={classnames({ editing: isEditingRow })}>
                                {columns.map((column, index) => {
                                    const value = column.subKey ? item[column.key][column.subKey] : item[column.key];
                                    const formattedValue = formatValue(value, column.valueType);
                                    const title =
                                        column.valueType === 'timestamp'
                                            ? moment(item[column.key]).format('LLL')
                                            : item[column.key];
                                    const handleClick = () => (onRowClickRoute ? handleRowClick(item) : null);
                                    if (isEditingRow && column.isEditable) {
                                        return (
                                            <td
                                                key={index + column.key}
                                                className={classnames({ clickable: onRowClickRoute })}
                                                title={title}
                                            >
                                                <TextField
                                                    inputRef={register({ required: true })}
                                                    defaultValue={item[column.key]}
                                                    name={column.key}
                                                    error={typeof errors[column.key] !== 'undefined'}
                                                    helperText={typeof errors[column.key] !== 'undefined' && 'Error'}
                                                />
                                            </td>
                                        );
                                    }
                                    return (
                                        <td
                                            key={index + column.key}
                                            className={classnames({ clickable: onRowClickRoute })}
                                            title={title}
                                            onClick={handleClick}
                                        >
                                            {formattedValue}
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
                                    <td>
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
                                <td key={index + column.key}>{formatValue(totals[column.key], column.valueType)}</td>
                            );
                        })}
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
