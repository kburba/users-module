import { TableColumn } from './Table';

export enum ValueTypes {
  timestamp,
  currency,
}

interface Column {
  [key: string]: TableColumn;
}

export const clientColumns: Column = {
  sumOfOrders: {
    isSortable: true,
    key: 'sumOfOrders',
    title: 'Sum of orders',
    valueType: ValueTypes.currency,
  },
  name: {
    key: 'name',
    title: 'Name',
    linkTo: '/clients',
  },
};

export const orderColumns: Column = {
  services: {
    cellType: 'services',
    key: 'services',
    title: 'Services',
  },
  id: {
    title: 'ID',
    subKey: 'orderId',
    key: 'details',
  },
  details: {
    isSortable: true,
    key: 'details',
    linkTo: '/orders',
    subKey: 'name',
    title: 'Name',
  },
  name: {
    isSortable: true,
    key: 'details',
    linkTo: '/orders',
    subKey: 'name',
    title: 'Name',
  },
  client: {
    isSortable: true,
    key: 'client',
    linkKey: '_id',
    linkTo: '/clients',
    subKey: 'name',
    title: 'Client',
  },
  total: {
    isSortable: true,
    key: 'total',
    title: 'Total',
    totalsType: 'sum',
    valueType: ValueTypes.currency,
  },
};

export const serviceColumns: Column = {
  type: {
    key: 'type',
    title: 'Type',
  },
  from: {
    key: 'from',
    subKey: 'name',
    title: 'From',
  },
  to: {
    key: 'to',
    subKey: 'name',
    title: 'To',
  },
  price: {
    key: 'price',
    title: 'Price',
    valueType: ValueTypes.currency,
    isEditable: true,
  },
  pagesQty: {
    key: 'pagesQty',
    title: 'Pages',
  },
  totalPrice: {
    key: 'totalPrice',
    title: 'Total',
    valueType: ValueTypes.currency,
    totalsType: 'sum',
  },
};

export const columns: Column = {
  id: {
    key: '_id',
    title: 'ID',
  },
  createdAt: {
    key: 'createdAt',
    title: 'Created',
    valueType: ValueTypes.timestamp,
    isSortable: true,
  },
};
