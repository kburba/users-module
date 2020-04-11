import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import Table, { TableColumn, TableAction } from '../table/Table';
import { OrderActions, Order } from '../../store/types/orderTypes';
import { deleteOrderAction, setOrdersModal } from '../../store/actions/orderActions';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/reducers';

const ordersColumns: TableColumn[] = [
    {
        key: 'createdAt',
        title: 'Created',
        valueType: 'timestamp',
    },
    {
        key: 'details',
        subKey: 'orderId',
        title: 'ID',
    },
    {
        key: 'details',
        subKey: 'name',
        title: 'Name',
    },
    {
        key: 'total',
        title: 'Total',
        valueType: 'currency',
        totalsType: 'sum'
    }
];

function OrdersTable({ orders, deleteOrder, isDeleting, isLoading }: OrderTableProps) {
    const tableActions: TableAction[] = [
        {
            type: 'delete',
            action: (order: Order) => deleteOrder(order._id),

        },
    ];

    return (
        <div>
            <div className="text-right margin--bottom">
                <Link to="/orders/new">
                    <Button variant="contained" color="primary">
                        + Add Order
                    </Button>
                </Link>
            </div>
            {orders.length > 0 && 
            <Table<Order> data={orders} columns={ordersColumns} isLoading={isLoading || isDeleting} actions={tableActions} uniqueKey="_id" onRowClickRoute="/orders" />
            }
        </div>
    );
}

const mapStateToProps = ({ordersReducer}: RootState) => ({
    orders: ordersReducer.orders,
    isLoading: ordersReducer.isLoading,
    isDeleting: ordersReducer.isDeleting
});

const mapDispatchToProps = (dispatch: Dispatch<OrderActions>) => ({
    deleteOrder: (id: string) => dispatch(deleteOrderAction(id)),
    setModal: (status: boolean) => dispatch(setOrdersModal(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTable);

type OrderTableProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;