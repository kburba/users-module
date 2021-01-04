import moment from 'moment'
import { TableColumn } from '../components/table/Table'
import { ValueTypes } from '../components/table/columns'

export function onlyUnique(value, index, self): boolean {
  return self.indexOf(value) === index
}

export function calcTotals<T>(data: T[], columns: TableColumn[]): any {
  const totals = {}
  for (let ii = 0; ii < columns.length; ii++) {
    const column = columns[ii]

    if (column.totalsType === 'sum') {
      for (let yy = 0; yy < data.length; yy++) {
        const item = data[yy]
        if (typeof totals[column.key] === 'undefined') {
          totals[column.key] = 0
        }
        totals[column.key] += item[column.key]
      }
    }
  }

  return totals
}

export function formatValue(
  value: number | string,
  valueType: ValueTypes
): string {
  if (typeof value === 'undefined') {
    return ''
  }
  switch (valueType) {
    case ValueTypes.timestamp:
      return moment(value).format('ll LT')
    case ValueTypes.currency: {
      if (typeof value === 'number') {
        return new Intl.NumberFormat('en-GB', {
          style: 'currency',
          currency: 'EUR',
        }).format(value)
      }
      return value
    }
    default:
      return value.toString()
  }
}
