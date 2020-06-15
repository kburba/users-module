import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Table, { TableColumn, TableAction } from '../../components/table/Table';
import { OrderActions, Order } from '../../store/types/orderTypes';
import {
  deleteOrderAction,
  setOrdersModal,
} from '../../store/actions/orderActions';
import { RootState } from '../../store/reducers';
import { setLoadingCell } from '../../store/actions/variousActions';
import { VariousState } from '../../store/reducers/variousReducer';
import { VariousActions } from '../../store/types/variousTypes';
import { ValueTypes } from '../../components/table/columns';
import { columns, orderColumns } from './../../components/table/columns';

const tableColumns = [
  columns.createdAt,
  orderColumns.id,
  orderColumns.client,
  orderColumns.services,
  orderColumns.total,
];
export const ordersColumns: TableColumn[] = [
  {
    valueType: ValueTypes.timestamp,
    title: 'Created',
    key: 'createdAt',
    isSortable: true,
  },
  {
    title: 'ID',
    subKey: 'orderId',
    key: 'details',
  },
  {
    isSortable: true,
    key: 'client',
    linkKey: '_id',
    linkTo: '/clients',
    subKey: 'name',
    title: 'Client',
  },
  {
    isSortable: true,
    key: 'details',
    linkTo: '/orders',
    subKey: 'name',
    title: 'Name',
  },
  {
    cellType: 'services',
    key: 'services',
    title: 'Services',
  },
  {
    isSortable: true,
    key: 'total',
    title: 'Total',
    totalsType: 'sum',
    valueType: ValueTypes.currency,
  },
];

function OrdersTable({
  orders,
  deleteOrder,
  isDeleting,
  isLoading,
}: OrderTableProps) {
  const tableActions: TableAction[] = [
    {
      type: 'delete',
      action: (order: Order) => {
        setLoadingCell({ column: 'actions', row: order._id });
        deleteOrder(order._id);
      },
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
      {orders.length > 0 && (
        <Table<Order>
          actions={tableActions}
          columns={tableColumns}
          data={orders}
          isLoading={isLoading || isDeleting}
          uniqueKey="_id"
          sortBy="createdAt"
        />
      )}
    </div>
  );
}

const mapStateToProps = ({ ordersReducer }: RootState) => ({
  orders: ordersReducer.orders,
  isLoading: ordersReducer.isLoading,
  isDeleting: ordersReducer.isDeleting,
});

const mapDispatchToProps = (
  dispatch: Dispatch<OrderActions | VariousActions>
) => ({
  deleteOrder: (id: string) => dispatch(deleteOrderAction(id)),
  setModal: (status: boolean) => dispatch(setOrdersModal(status)),
  setLoadingCell: (cell: VariousState['isLoadingCell']) =>
    dispatch(setLoadingCell(cell)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTable);

type OrderTableProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
