export enum ValueTypes {
    timestamp,
    currency,
}

export default {
    id: {
        key: '_id',
        title: 'ID',
    },
    createdAt: {
        key: 'createdAt',
        title: 'Created',
        valueType: ValueTypes.timestamp,
    },
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
    },
};
