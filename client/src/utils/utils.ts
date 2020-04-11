import { TableColumn } from "../components/table/Table";
import moment from 'moment';

export function calcTotals<T>(data: T[], columns: TableColumn[]) {
    let totals = {};
    for (let ii = 0; ii < columns.length; ii++) {
        const column = columns[ii];

        if (column.totalsType === 'sum') {
            for (let yy = 0; yy < data.length; yy++) {
                const item = data[yy];
                if (typeof totals[column.key] === 'undefined') {
                    totals[column.key] = 0;
                }
                totals[column.key] = totals[column.key] + item[column.key];
            }
        }
    }

    return totals;
}

export function formatValue(value: number, valueType?: TableColumn['valueType']) {
    if (typeof value === "undefined") {
        return '';
   }
    switch (valueType) {
        case "timestamp":
            return moment(value).fromNow();
        case 'currency':
            return new Intl.NumberFormat('en-GB', {
                style: 'currency', currency: 'EUR'
            }).format(value)
        default:
            return value;
    }
}